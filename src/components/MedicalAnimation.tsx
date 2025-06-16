import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import { Group, Vector3, BufferGeometry, Float32BufferAttribute, LineBasicMaterial, Line } from 'three';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

function generateRandomPoints(count: number, radius: number) {
    const points = [];
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        points.push(x, y, z);
    }
    return new Float32BufferAttribute(points, 3);
}

function createConnectingLines(points: Float32BufferAttribute, maxDistance: number) {
    const positions = [];
    const vertices = points.array;

    for (let i = 0; i < vertices.length; i += 3) {
        for (let j = i + 3; j < vertices.length; j += 3) {
            const distance = new Vector3(
                vertices[i] - vertices[j],
                vertices[i + 1] - vertices[j + 1],
                vertices[i + 2] - vertices[j + 2]
            ).length();

            if (distance < maxDistance) {
                positions.push(
                    vertices[i], vertices[i + 1], vertices[i + 2],
                    vertices[j], vertices[j + 1], vertices[j + 2]
                );
            }
        }
    }

    return new Float32BufferAttribute(positions, 3);
}

export function MedicalModel() {
    const group = useRef<Group>(null);
    const pointsRef = useRef<any>();
    const linesRef = useRef<any>();
    const { isDarkMode } = useTheme();

    // Futuristic color scheme
    const pointColor = isDarkMode
        ? '#00f2ff' // Bright cyan in dark mode
        : '#0891b2'; // Darker cyan in light mode
    const lineColor = isDarkMode
        ? '#818cf8' // Indigo in dark mode
        : '#4f46e5'; // Darker indigo in light mode
    const pointOpacity = isDarkMode ? 1 : 0.85;
    const lineOpacity = isDarkMode ? 0.6 : 0.4;

    const [points, lines] = useMemo(() => {
        // Increase number of points for more complex network
        const pointsAttribute = generateRandomPoints(150, 5);
        const linesAttribute = createConnectingLines(pointsAttribute, 2.2); // Slightly increased connection distance

        const pointsGeometry = new BufferGeometry();
        pointsGeometry.setAttribute('position', pointsAttribute);

        const linesGeometry = new BufferGeometry();
        linesGeometry.setAttribute('position', linesAttribute);

        return [pointsGeometry, linesGeometry];
    }, []);

    useFrame((state) => {
        if (group.current) {
            // Slower rotation for more elegant movement
            group.current.rotation.y = state.clock.getElapsedTime() * 0.08;
        }
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * -0.04;
        }
        if (linesRef.current) {
            linesRef.current.rotation.y = state.clock.getElapsedTime() * -0.04;
        }
    });

    return (
        <group ref={group}>
            <Float
                speed={1.2}
                rotationIntensity={0.3}
                floatIntensity={0.6}
            >
                <Points ref={pointsRef} geometry={points}>
                    <PointMaterial
                        transparent
                        vertexColors
                        size={6} // Slightly smaller points for cleaner look
                        sizeAttenuation={false}
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                        opacity={pointOpacity}
                        color={pointColor}
                    />
                </Points>
                <primitive
                    ref={linesRef}
                    object={new Line(
                        lines,
                        new LineBasicMaterial({
                            color: lineColor,
                            transparent: true,
                            opacity: lineOpacity,
                            blending: THREE.AdditiveBlending,
                        })
                    )}
                />
            </Float>
        </group>
    );
}

