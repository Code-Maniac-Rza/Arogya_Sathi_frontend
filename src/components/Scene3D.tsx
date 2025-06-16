import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MedicalModel } from './MedicalAnimation';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

export function Scene3D() {
    const { isDarkMode } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className={`w-full h-full absolute inset-0 -z-10 bg-gradient-to-b ${isDarkMode
            ? 'from-slate-950/90 via-slate-950/95 to-background'
            : 'from-cyan-50/40 via-slate-100/60 to-background/80'
            }`}>
            <Canvas
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    outputColorSpace: THREE.SRGBColorSpace
                }}
                camera={{
                    fov: isMobile ? 50 : 45,
                    near: 0.1,
                    far: 200,
                    position: isMobile ? [0, 0, 12] : [0, 0, 15]
                }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={isDarkMode ? 0.6 : 0.8} />
                    <pointLight
                        position={[10, 10, 10]}
                        intensity={isDarkMode ? 1.2 : 1.4}
                        color={isDarkMode ? '#60a5fa' : '#3b82f6'}
                    />
                    <pointLight
                        position={[-10, -10, -10]}
                        intensity={isDarkMode ? 0.4 : 0.5}
                        color={isDarkMode ? '#818cf8' : '#4f46e5'}
                    />
                    <MedicalModel />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 2}
                        maxPolarAngle={Math.PI / 2}
                        rotateSpeed={isMobile ? 0.3 : 0.4}
                        autoRotate={!isMobile}
                        autoRotateSpeed={0.5}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
} 