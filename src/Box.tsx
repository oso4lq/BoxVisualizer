import React from 'react';

interface BoxProps {
    meshData: {
        vertices: number[][];
        triangles: number[][];
    };
}

const Box: React.FC = () => {

    return (
        <div className="box-container">
        </div>
    );
};

export default Box;
