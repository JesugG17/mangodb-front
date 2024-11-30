import React from 'react';
import calidad from '@/assets/img/calidad.jpg';
import noCalidad from '@/assets/img/noCalidad.png';
import { useNavigate } from 'react-router-dom';

export const Card: React.FC<CardProps> = ({ label }) => {
  const navigate = useNavigate();

  return (
    <div className='w-1/2 h-2/3 p-2 flex flex-col justify-center items-center'>
      {label === 'Calidad' ? (
        <img onClick={() => navigate('/dashboard/almacen/1')} src={calidad} alt='calidad' className='w-1/2 h-full cursor-pointer hover:scale-105 transition-all duration-200' />
      ) : (
        <img onClick={() => navigate('/dashboard/almacen/2')} src={noCalidad} alt='no calidad' className='w-1/2 h-full cursor-pointer hover:scale-105 transition-all duration-200' />
      )}
      <span className='text-2xl'> {label} </span>
    </div>
  );
};

interface CardProps {
  label: string;
}
