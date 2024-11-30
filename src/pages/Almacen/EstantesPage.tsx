import React from 'react';
import { Estante  } from '@/components/Estante/Estante';
import { Almacen, Estante as IEstante } from './AlmacenOptions';

export const EstantesPage: React.FC<Props> = ({ estantes, almacen }) => {

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-[#3B3B3B]'>Estantes</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {estantes.map((estante) => (
          <Estante
            key={estante.estante}
            almacen={almacen}
            estante={estante}
          />
        ))}
      </div>
    </div>
  );
};

type Props = {
  estantes: IEstante[];
  almacen: Almacen;
}