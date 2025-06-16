import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Send, Bot, User, Loader2, Mic, MicOff, ArrowLeft, Pill, Dumbbell, Brain, Plus, FileText, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Add TypeScript declarations for Web Speech API
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
    start: () => void;
    stop: () => void;
}

interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    transcript: string;
}

interface SpeechRecognitionErrorEvent {
    error: string;
}

declare global {
    interface Window {
        SpeechRecognition: new () => SpeechRecognition;
        webkitSpeechRecognition: new () => SpeechRecognition;
    }
}

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface AIService {
    name: string;
    description: string;
    icon: React.ReactNode;
}

const aiServices: AIService[] = [
    {
        name: "Medication Tracking",
        description: "Track your medications and get reminders to take them on time.",
        icon: <Pill className="w-6 h-6" />
    },
    {
        name: "Fitness Guidance",
        description: "Get personalized fitness guidance and workout plans.",
        icon: <Dumbbell className="w-6 h-6" />
    },
    {
        name: "Health Knowledge",
        description: "Access health-related information and AI-driven suggestions.",
        icon: <Brain className="w-6 h-6" />
    }
];

export default function AIIntegration() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hello! I'm your AI medical assistant. How can I help you today?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [showWelcomeDialog, setShowWelcomeDialog] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        // Initialize speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            toast({
                title: "Not Supported",
                description: "Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.",
                variant: "destructive",
            });
            return;
        }

        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = async (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            setIsListening(false);

            // Add user message
            const userMessage: Message = {
                role: "user",
                content: transcript,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, userMessage]);
            setIsLoading(true);

            try {
                // Get AI response
                const response = await simulateAIResponse(transcript, selectedService);

                const aiMessage: Message = {
                    role: "assistant",
                    content: response,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, aiMessage]);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to get AI response. Please try again.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        recognitionRef.current.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);

            let errorMessage = "Could not recognize speech. Please try again.";
            if (event.error === 'not-allowed') {
                errorMessage = "Microphone access was denied. Please allow microphone access and try again.";
            } else if (event.error === 'no-speech') {
                errorMessage = "No speech was detected. Please try speaking again.";
            } else if (event.error === 'audio-capture') {
                errorMessage = "No microphone was found. Please ensure your microphone is properly connected.";
            } else if (event.error === 'network') {
                errorMessage = "Network error occurred. Please check your internet connection.";
            }

            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        };

        recognitionRef.current.onend = () => {
            setIsListening(false);
        };

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [toast]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const toggleListening = async () => {
        if (!recognitionRef.current) {
            toast({
                title: "Not Supported",
                description: "Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.",
                variant: "destructive",
            });
            return;
        }

        try {
            if (isListening) {
                recognitionRef.current.stop();
                setIsListening(false);
                return;
            }

            // Check if we have any audio input devices
            const devices = await navigator.mediaDevices.enumerateDevices();
            const audioInputs = devices.filter(device => device.kind === 'audioinput');

            if (audioInputs.length === 0) {
                toast({
                    title: "No Microphone Found",
                    description: "No microphone device was detected. Please connect a microphone and try again.",
                    variant: "destructive",
                });
                return;
            }

            // Try to get microphone access
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true
                    }
                });

                // Stop the stream immediately as we just needed to verify access
                stream.getTracks().forEach(track => track.stop());

                // Now start the speech recognition
                recognitionRef.current.start();
                setIsListening(true);

                toast({
                    title: "Listening",
                    description: "Speak now...",
                    variant: "default",
                });
            } catch (err) {
                console.error('Microphone access error:', err);
                let errorMessage = "Could not access microphone. ";

                if (err instanceof Error) {
                    if (err.name === 'NotAllowedError') {
                        errorMessage += "Please allow microphone access in your browser settings.";
                    } else if (err.name === 'NotFoundError') {
                        errorMessage += "No microphone found. Please connect a microphone and try again.";
                    } else if (err.name === 'NotReadableError') {
                        errorMessage += "Your microphone is busy or not working properly.";
                    }
                }

                toast({
                    title: "Microphone Error",
                    description: errorMessage,
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error('Speech recognition error:', error);
            toast({
                title: "Error",
                description: "Could not start voice recognition. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const userMessage: Message = {
            role: "user",
            content: input,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // Here you would make the actual API call to your AI backend
            // For now, we'll simulate a response
            const response = await simulateAIResponse(input, selectedService);

            const aiMessage: Message = {
                role: "assistant",
                content: response,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to get AI response. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Check file type
        if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
            toast({
                title: "Invalid File",
                description: "Please upload an image or PDF file.",
                variant: "destructive",
            });
            return;
        }

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: "File Too Large",
                description: "Please upload a file smaller than 5MB.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            // Here you would typically upload the file to your server
            // For now, we'll just simulate a response
            const response = await simulateAIResponse(`I've uploaded a ${file.type.startsWith('image/') ? 'prescription image' : 'PDF prescription'}: ${file.name}. Please analyze it.`, selectedService);

            const aiMessage: Message = {
                role: "assistant",
                content: response,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to process the file. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
            // Reset the file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const simulateAIResponse = async (input: string, service: string | null): Promise<string> => {
        try {
            let prompt = "";

            if (service === "Medication Tracking") {
                prompt = `Create a reminder for taking ${input}. Include dosage timing, reminders, and best practices. Format the response in markdown with proper headings, bullet points, and sections.`;
            } else if (service === "Fitness Guidance") {
                prompt = `Create a personalized fitness plan for someone who wants to ${input}. Include workout routines, diet suggestions, and progress tracking methods. Format the response in markdown with proper headings, bullet points, and sections.`;
            } else if (service === "Health Knowledge") {
                prompt = `Provide an answer to the following health-related question: ${input}. Format the response in markdown with proper headings, bullet points, and sections.`;
            } else {
                prompt = `As a medical AI assistant, please help with: ${input}. Format the response in markdown with proper headings, bullet points, and sections.`;
            }

            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCYbgQTZBYe6ik7asMpL9HswLcpZI-NIBM', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
            }

            const data = await response.json();
            console.log('API Response:', data);

            if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
                throw new Error('Invalid response format from API');
            }

            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('AI Response Error:', error);
            if (error instanceof Error) {
                return `Error: ${error.message}`;
            }
            return "I apologize, but I'm having trouble generating a response right now. Please try again later.";
        }
    };

    const formatMarkdown = (text: string) => {
        // Convert markdown to HTML
        return text
            // Headers
            .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
            .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
            .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Lists
            .replace(/^\* (.*$)/gm, '<li class="ml-4">$1</li>')
            // Paragraphs
            .replace(/\n\n/g, '</p><p class="my-2">')
            // Line breaks
            .replace(/\n/g, '<br />');
    };

    return (
        <div className="min-h-screen bg-background">
            <DashboardHeader toggleSidebar={() => { }} />

            <Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-medical-primary">Welcome to ArogyaAI</DialogTitle>
                        <DialogDescription className="text-base">
                            Your intelligent healthcare companion. I'm here to help you with:
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-3">
                            <Pill className="w-6 h-6 text-medical-primary" />
                            <p>Medication tracking and reminders</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Dumbbell className="w-6 h-6 text-medical-primary" />
                            <p>Personalized fitness guidance</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Brain className="w-6 h-6 text-medical-primary" />
                            <p>Health knowledge and insights</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => setShowWelcomeDialog(false)}
                        className="w-full bg-medical-primary hover:bg-medical-primary/90"
                    >
                        Get Started
                    </Button>
                </DialogContent>
            </Dialog>

            <div className="flex flex-col h-[calc(100vh-4rem)]">
                {/* AI Services Selection */}
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold mb-4">AI Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {aiServices.map((service) => (
                            <Card
                                key={service.name}
                                className={cn(
                                    "p-4 cursor-pointer transition-all",
                                    selectedService === service.name
                                        ? "border-medical-primary bg-medical-primary/10"
                                        : "hover:border-medical-primary/50"
                                )}
                                onClick={() => setSelectedService(service.name)}
                            >
                                <div className="flex items-center gap-3">
                                    {service.icon}
                                    <div>
                                        <h3 className="font-semibold">{service.name}</h3>
                                        <p className="text-sm text-muted-foreground">{service.description}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={cn(
                                "flex items-start gap-3 max-w-3xl mx-auto",
                                message.role === "user" ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center",
                                    message.role === "user"
                                        ? "bg-medical-primary text-white"
                                        : "bg-muted"
                                )}
                            >
                                {message.role === "user" ? (
                                    <User className="w-5 h-5" />
                                ) : (
                                    <Bot className="w-5 h-5" />
                                )}
                            </div>
                            <Card
                                className={cn(
                                    "p-4 max-w-[80%]",
                                    message.role === "user"
                                        ? "bg-medical-primary text-white"
                                        : "bg-muted"
                                )}
                            >
                                {message.role === "assistant" ? (
                                    <div
                                        className="prose prose-sm dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{ __html: formatMarkdown(message.content) }}
                                    />
                                ) : (
                                    <p className="text-sm">{message.content}</p>
                                )}
                                <span className="text-xs opacity-70 mt-2 block">
                                    {message.timestamp.toLocaleTimeString()}
                                </span>
                            </Card>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-center gap-3 max-w-3xl mx-auto">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                <Bot className="w-5 h-5" />
                            </div>
                            <Card className="p-4 bg-muted">
                                <Loader2 className="w-5 h-5 animate-spin" />
                            </Card>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Form */}
                <div className="border-t p-4 bg-background">
                    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="image/*,.pdf"
                            className="hidden"
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="outline"
                                    disabled={isLoading}
                                >
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                                    <Camera className="w-4 h-4 mr-2" />
                                    Add Photo Prescription
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                                    <FileText className="w-4 h-4 mr-2" />
                                    Add PDF Prescription
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={selectedService ? `Ask about ${selectedService}...` : "Type your message..."}
                            className="flex-1"
                            disabled={isLoading}
                        />
                        <Button
                            type="button"
                            size="icon"
                            variant={isListening ? "destructive" : "outline"}
                            onClick={toggleListening}
                            disabled={isLoading}
                            className={cn(
                                "transition-colors",
                                isListening && "animate-pulse"
                            )}
                        >
                            {isListening ? (
                                <MicOff className="w-4 h-4" />
                            ) : (
                                <Mic className="w-4 h-4" />
                            )}
                        </Button>
                        <Button
                            type="submit"
                            size="icon"
                            className="bg-medical-primary hover:bg-medical-primary/90"
                            disabled={isLoading || !input.trim()}
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    className="gap-2"
                    asChild
                >
                    <Link to="/patient/dashboard">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Link>
                </Button>
                <ThemeToggle />
            </div>
        </div>
    );
} 