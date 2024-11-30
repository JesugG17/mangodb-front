import { FirstLetterGreen } from '@/components/FirstLetterGreen/FirstLetterGreen';
import { Sprout } from 'lucide-react';
import { Card } from './Card';

export const Almacen = () => {
  return (
    <div className='w-full h-[93%]'>
      <div className='flex p-3 items-center'>
        <Sprout size={40} color='#98a75f' />
        <FirstLetterGreen label='Almacén' style={{ fontSize: 35 }} />
      </div>
      <div className='flex justify-items-start p-[30px] bg-white w-full h-[95%] rounded shadow-lg'>
        <div className='flex w-full justify-between items-center'>
          <Card label='Calidad' />
          <Card label='No calidad' />
        </div>
      </div>
    </div>
  );
};
