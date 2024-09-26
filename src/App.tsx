import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';

const App: React.FC = () => {

    const [length, setLength] = useState(1);
    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(1);
    const [boxData, setBoxData] = useState<any>(null);

    const API_URL = 'https://80bd4ca4-933a-407a-a690-dde3737f6d53-00-2zu5xuy6udy1i.kirk.replit.dev';


    return (
        <div className="container">
        </div>
    );
};

export default App;
