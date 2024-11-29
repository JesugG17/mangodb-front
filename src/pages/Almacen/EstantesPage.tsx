import React from 'react';
import { Estante } from '@/components/Estante/Estante';

export const EstantesPage: React.FC = () => {
  const estantes = [
    {
      id: 1,
      divisionesDisponibles: 2,
      ocupacion: [
        [true, false, true, false, true],
        [false, false, false, false, false],
        [true, true, true, true, true],
      ],
    },
    {
      id: 2,
      divisionesDisponibles: 0,
      ocupacion: [
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
      ],
    },
    {
      id: 3,
      divisionesDisponibles: 1,
      ocupacion: [
        [true, true, true, true, true],
        [false, false, false, false, false],
        [true, true, true, true, true],
      ],
    },
  ];

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-[#3B3B3B]'>Estantes</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {estantes.map((estante) => (
          <Estante
            key={estante.id}
            id={estante.id}
            divisionesDisponibles={estante.divisionesDisponibles}
            ocupacion={estante.ocupacion}
          />
        ))}
      </div>
    </div>
  );
};
