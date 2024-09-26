import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Button, InputNumber, Form } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import Box from './Box';

const App: React.FC = () => {

    const [length, setLength] = useState(1);
    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(1);
    const [boxData, setBoxData] = useState<any>(null);

    const API_URL = 'https://80bd4ca4-933a-407a-a690-dde3737f6d53-00-2zu5xuy6udy1i.kirk.replit.dev';

    const handleCalculate = async () => {
        try {
            const response = await fetch(API_URL + '/box', {
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

    return (
        <div className="container">
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
            <Canvas className="canvas">
                {boxData && <Box meshData={boxData} />}
            </Canvas>
        </div>
    );
};

export default App;
