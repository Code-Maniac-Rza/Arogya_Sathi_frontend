import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface CTADoctorProps {
    primaryColor?: string;
    secondaryColor?: string;
}

export function CTADoctor({ primaryColor = '#2563eb', secondaryColor = '#60a5fa' }: CTADoctorProps) {
    const groupRef = useRef<THREE.Group>(null);

    // Doctor's body parts
    const bodyGeometry = new THREE.BoxGeometry(1.5, 2, 0.5);
    const headGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const armGeometry = new THREE.BoxGeometry(0.4, 1.2, 0.4);
    const legGeometry = new THREE.BoxGeometry(0.4, 1.2, 0.4);

    // Materials with theme-based colors
    const primaryMaterial = new THREE.MeshStandardMaterial({
        color: primaryColor,
        roughness: 0.3,
        metalness: 0.2
    });
    const secondaryMaterial = new THREE.MeshStandardMaterial({
        color: secondaryColor,
        roughness: 0.3,
        metalness: 0.2
    });

    useFrame((state) => {
        if (groupRef.current) {
            // Subtle breathing animation
            groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
        }
    });

    return (
        <Float
            speed={2}
            rotationIntensity={0.2}
            floatIntensity={0.5}
        >
            <group ref={groupRef} position={[0, 0, 0]}>
                {/* Body - primary color coat */}
                <mesh geometry={bodyGeometry} material={primaryMaterial} position={[0, 0, 0]}>
                    {/* Head */}
                    <mesh geometry={headGeometry} material={primaryMaterial} position={[0, 1.4, 0]} />

                    {/* Left Arm */}
                    <mesh geometry={armGeometry} material={primaryMaterial} position={[-0.95, 0.2, 0]} rotation={[0, 0, -0.2]} />

                    {/* Right Arm */}
                    <mesh geometry={armGeometry} material={primaryMaterial} position={[0.95, 0.2, 0]} rotation={[0, 0, 0.2]} />

                    {/* Left Leg */}
                    <mesh geometry={legGeometry} material={secondaryMaterial} position={[-0.4, -1.6, 0]} />

                    {/* Right Leg */}
                    <mesh geometry={legGeometry} material={secondaryMaterial} position={[0.4, -1.6, 0]} />

                    {/* Stethoscope */}
                    <mesh position={[0.4, 0.5, 0.3]}>
                        <torusGeometry args={[0.2, 0.02, 16, 32]} />
                        <meshStandardMaterial color={secondaryColor} metalness={0.8} roughness={0.2} />
                    </mesh>
                </mesh>
            </group>
        </Float>
    );
} 