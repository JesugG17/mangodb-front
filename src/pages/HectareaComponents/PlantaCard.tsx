import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { httpClient } from '@/lib/api';
import { Planta } from '@/types';
import { Sprout } from 'lucide-react';
import { FC, useState } from 'react';

export const PlantaCard: FC<Props> = ({ planta }) => {
  const [popOverCrecimiento, setPopOverCrecimiento] = useState(false);
  const [popOverProducto, setPopOverProducto] = useState(false);

  const asignarSensorProducto = async (plantaId: number) => {
    await httpClient.post('/plantas/asignar-sensor-producto', {
      plantaId,
    });
  };

  const asignarSensorCrecimiento = async (plantaId: number) => {
    await httpClient.post('/plantas/asignar-sensor-crecimiento', {
      plantaId,
    });
  };
  
  return (
    <Card className='p-4'>
      <CardContent className='flex flex-col items-center'>
        <Sprout size={40} color='#98a75f' className='mb-4' />
        <span>{planta.idPlanta}</span>
        {!planta.aptaSensorCrecimiento ? (
          <Popover open={popOverCrecimiento}>
            <PopoverTrigger asChild>
              <Button
                onMouseEnter={() => setPopOverCrecimiento(true)}
                onMouseLeave={() => setPopOverCrecimiento(false)}
                // disabled
                className='w-full cursor-default opacity-50 mb-2 bg-[#c7c7c7] hover:bg-[#cccccc] text-[#3B3B3B]'
              >
                Sensor Crecimiento
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className='bg-white rounded p-2'>
                <strong>Esta planta no es apta para colocar sensor de crecimiento</strong>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Button
            onClick={() => asignarSensorCrecimiento(planta.idPlanta)}
            className='w-full mb-2 bg-[#c7c7c7] hover:bg-[#cccccc] text-[#3B3B3B]'
          >
            Sensor Crecimiento
          </Button>
        )}
        <Button
          disabled={!planta.aptaSensorProducto}
          onClick={() => asignarSensorProducto(planta.idPlanta)}
          className='w-full bg-[#c7c7c7] hover:bg-[#cccccc] text-[#3B3B3B]'
        >
          Sensor Producto
        </Button>
      </CardContent>
    </Card>
  )
};

type Props = {
  planta: Planta;
};
