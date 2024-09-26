import React, { useRef, useState } from 'react';
import * as THREE from 'three';

interface BoxProps {
    meshData: {
        vertices: number[][];
        triangles: number[][];
    };
}

const Box: React.FC<BoxProps> = ({ meshData }) => {
    const mesh = useRef<THREE.Mesh>(null!);
    const [edgeColor, setEdgeColor] = useState('#000000');

    // Flatten vertices and triangles
    const vertices = meshData.vertices.flat();
    const indices = meshData.triangles.flat();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    // Assign groups for each face (2 triangles per face, 3 indices per triangle => 6 indices per group)
    for (let i = 0; i < 6; i++) {
        geometry.addGroup(i * 6, 6, i);
    }

    // Colors for each face
    const faceColors = [
        new THREE.Color('#ff6666'), // Bottom face - Red
        new THREE.Color('#66ff66'), // Top face - Green
        new THREE.Color('#6666ff'), // Front face - Blue
        new THREE.Color('#ffff66'), // Right face - Yellow
        new THREE.Color('#66ffff'), // Back face - Cyan
        new THREE.Color('#ff66ff'), // Left face - Magenta
    ];

    // Materials for each face
    const materials = faceColors.map(color => new THREE.MeshStandardMaterial({ color: color, side: THREE.DoubleSide }));

    // Edges for faces
    const edges = new THREE.EdgesGeometry(geometry, 1);

    return (
        <group>
            {/* Main Box Mesh */}
            <mesh
                ref={mesh}
                geometry={geometry}
                material={materials}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial color={'#f0f0f0'} side={THREE.DoubleSide} />
            </mesh>

            {/* Edges (Borders) */}
            <lineSegments
                geometry={edges}
                onPointerOver={() => setEdgeColor('#40a9ff')} // Change color on hover
                onPointerOut={() => setEdgeColor('#000000')} // Revert color on hover out
                castShadow
            >
                <lineBasicMaterial color={edgeColor} linewidth={2} />
            </lineSegments>
        </group>
    );
};

export default Box;
