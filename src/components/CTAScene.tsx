import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CTADoctor } from './CTADoctor';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

export function CTAScene() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Theme-based colors
    const primaryColor = isDark ? '#ffffff' : '#2563eb';
    const secondaryColor = isDark ? '#60a5fa' : '#1e40af';

    return (
        <div className="w-full h-full absolute inset-0">
            <Canvas
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    outputColorSpace: THREE.SRGBColorSpace
                }}
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [0, 0, 6]
                }}
            >
                <color attach="background" args={['transparent']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={0.8} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <CTADoctor
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                    rotateSpeed={0.4}
                />
            </Canvas>
        </div>
    );
} 