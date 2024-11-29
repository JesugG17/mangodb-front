import { useEffect, useState } from 'react';
import { FirstLetterGreen } from '@/components/FirstLetterGreen/FirstLetterGreen';
import { BadgePlus, Sprout } from 'lucide-react';
import { httpClient } from '@/lib/api';
import { HectareaCardSkeleton } from './HectareaCardSkeleton';
import { HectareaCard } from './HectareaCard';
import { Button } from '@/components/ui/button';
import { ModalCrearHectarea } from './ModalCrearHectarea';

export interface Hectarea {
  idHectarea: number;
  comunidad: string;
  ubicacion: string;
  status: 'COSECHABLE' | 'COSECHANDO' | 'NO COSECHABLE' | 'COSECHADA';
}

export const HectareaPage = () => {
  const [hectareas, setHectareas] = useState<Hectarea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleToggleModal = (newState: boolean) => {
    setIsModalVisible(newState);
  }

  const fetchHectareas = () => {
    httpClient.get('/hectareas/all')
    .then(resp => setHectareas(resp.data.data))
    .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    fetchHectareas();
  }, [])

  return (
    <div className='w-full h-[90%]'>
      <div className='flex p-3 items-center'>
        <Sprout size={40} color='#98a75f' />
        <FirstLetterGreen label='Hectáreas' style={{ fontSize: 35 }} />
        <div className='flex justify-between w-full'>
          <div className='relative flex w-full ml-5'>
            <input
              type='text'
              placeholder='ID de hectarea'
              className='w-200 h-11 rounded-l-md border-y border-l border-[#98a75f] px-4 py-1 focus:outline-none focus:ring-1 focus:ring-[#aebe6f] focus:border-transparent'
            />
            <button className='h-11 rounded-r-md bg-[#98a75f] px-4 py-2 text-white hover:bg-[#9dac65] focus:outline-none focus:ring-1 focus:ring-[#aebe6f] focus:ring-offset-1'>
              Buscar
            </button>
          </div>
          <div>
          <Button onClick={() => handleToggleModal(true)} className='h-11 w-40 bg-[#98a75f] text-white hover:bg-[#9dac65] focus:outline-none focus:ring-1 focus:ring-[#aebe6f] focus:ring-offset-1 flex items-center justify-center gap-1'>
            <BadgePlus size={18} /> Crear Hectarea
          </Button>
          </div>
        </div>
      </div>
      <div className='h-full w-full bg-white p-5 grid grid-cols-4 '>
        {
          isLoading && (
            Array.from({ length: 5 }).map((_, index) => (
              <HectareaCardSkeleton key={index} />
            ))
          )
        }
        {
          hectareas.map(hectarea => (
            <HectareaCard key={hectarea.idHectarea} {...hectarea} />
          ))
        }
      </div>
      <ModalCrearHectarea isVisible={isModalVisible} onOpenChange={handleToggleModal} onCreate={fetchHectareas} />
    </div>
  );
};
