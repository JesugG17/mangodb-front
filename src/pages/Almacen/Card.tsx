import React from 'react';
import calidad from '@/assets/img/calidad.jpg';
import noCalidad from '@/assets/img/noCalidad.png';

export const Card: React.FC<CardProps> = ({ label }) => {
    return (
        <>
            <div className="w-1/2 h-2/3 p-2 flex flex-col justify-center items-center">
                {label === "Calidad" ? <img src={calidad} alt="calidad" className="w-1/2 h-full" /> : <img src={noCalidad} alt="no calidad" className="w-1/2 h-full"/>}
                <span className="text-2xl"> { label } </span>
            </div>
        </>
    );
}

interface CardProps {
  label: string;
}
