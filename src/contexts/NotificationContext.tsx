import { createContext, useContext, useState, ReactNode } from "react";

interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    addNotification: (notification: Omit<Notification, 'id' | 'read'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "1",
            title: "New appointment confirmed",
            message: "Your appointment with Dr. Smith has been confirmed for tomorrow at 2:00 PM.",
            timestamp: "2 minutes ago",
            read: false,
        },
        {
            id: "2",
            title: "Medicine order shipped",
            message: "Your medicine order #12345 has been shipped and will arrive in 2-3 business days.",
            timestamp: "1 hour ago",
            read: false,
        },
        {
            id: "3",
            title: "New diet plan available",
            message: "Your personalized diet plan has been updated. Check it out in the Diet Plan section.",
            timestamp: "3 hours ago",
            read: false,
        },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, read: true }))
        );
    };

    const addNotification = (notification: Omit<Notification, 'id' | 'read'>) => {
        const newNotification: Notification = {
            ...notification,
            id: Math.random().toString(36).substring(2, 9),
            read: false,
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                markAsRead,
                markAllAsRead,
                addNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error("useNotifications must be used within a NotificationProvider");
    }
    return context;
} 