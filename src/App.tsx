import React, { useEffect, useState } from 'react';
import { Button, InputNumber, Form } from 'antd';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import Box from './Box';
import './App.css';

const App: React.FC = () => {

    const [length, setLength] = useState(1);
    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(1);
    const [boxData, setBoxData] = useState<any>(null);

    const API_URL = 'https://box-visualizer-backend.vercel.app/';

    const handleCalculate = async () => {
        try {
            const response = await fetch(API_URL + 'box/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ length, width, height }),
            });
            const data = await response.json();
            setBoxData(data);
        } catch (error) {
            console.error('Error fetching box data:', error);
        }
    };

    useEffect(() => {
        handleCalculate();
    }, []);

    return (
        <StyledContainer>
            <MenuWrapper>
                <StyledTitle>3D Box Visualizer</StyledTitle>
                <Form layout="inline" className="box-form">
                    <Form.Item label="Length">
                        <InputNumber
                            min={0.1}
                            value={length}
                            onChange={(value) => setLength(value || 1)}
                        />
                    </Form.Item>
                    <Form.Item label="Width">
                        <InputNumber
                            min={0.1}
                            value={width}
                            onChange={(value) => setWidth(value || 1)}
                        />
                    </Form.Item>
                    <Form.Item label="Height">
                        <InputNumber
                            min={0.1}
                            value={height}
                            onChange={(value) => setHeight(value || 1)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={handleCalculate}>
                            Calculate
                        </Button>
                    </Form.Item>
                </Form>
            </MenuWrapper>
            <Canvas
                className="canvas"
                style={{ background: '#113B51' }}
                shadows camera={{ position: [2, 2, 4], fov: 50 }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[10, 10, 10]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <OrbitControls />

                {/* The Box */}
                {boxData && <Box meshData={boxData} />}

                {/* Plane for shadows */}
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                    <planeGeometry args={[20, 20]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>

            </Canvas>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100vh;
    background-color: #6F90A2;
`;

const MenuWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 0 20px;
    margin: 20px 0;
    width: 33%;
`;

const StyledTitle = styled.h1`
    color: #f0f0f0;
    font-size: 24px;
    text-align: center;
`;

export default App;
