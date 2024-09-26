import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BoxProps {
    meshData: {
        vertices: number[][];
        triangles: number[][];
    };
}

const Box: React.FC<BoxProps> = ({ meshData }) => {
    const mesh = useRef<THREE.Mesh>(null!);

    useFrame(() => {
        mesh.current.rotation.x += 0.01;
        mesh.current.rotation.y += 0.01;
    });

    // Flatten vertices and triangles
    const vertices = meshData.vertices.flat();
    const indices = meshData.triangles.flat();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);

    return (
        <mesh ref={mesh} geometry={geometry}>
            <meshStandardMaterial color={'orange'} />
        </mesh>
    );
};

export default Box;
