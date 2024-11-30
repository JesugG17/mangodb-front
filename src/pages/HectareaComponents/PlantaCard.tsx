import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { httpClient } from '@/lib/api';
import { Planta, SensorResponse } from '@/types';
import { Sprout } from 'lucide-react';
import { FC, useState } from 'react';

export const PlantaCard: FC<Props> = ({ planta }) => {
  const [popOverCrecimiento, setPopOverCrecimiento] = useState(false);
  const [popOverProducto, setPopOverProducto] = useState(false);
  const { toast } = useToast();

  const mensajeSensor = (data: SensorResponse) => {
    if (!data.isValid) {
      toast({
        title: 'ERROR AL ASIGNAR SENSOR',
        description: data.message,
        action: <ToastAction altText='Goto schedule to undo'>Cerrar</ToastAction>,
      });
      return;
    }

    toast({
      title: 'SENSOR ASIGNADO CON ÉXITO',
      description: data.message,
      action: <ToastAction altText='Goto schedule to undo'>Cerrar</ToastAction>,
    });
  };

  const asignarSensorProducto = async (plantaId: number) => {
    const res = await httpClient.post<SensorResponse>('/plantas/asignar-sensor-producto', {
      plantaId,
    });
    mensajeSensor(res.data);
  };

  const asignarSensorCrecimiento = async (plantaId: number) => {
    const res = await httpClient.post<SensorResponse>('/plantas/asignar-sensor-crecimiento', {
      plantaId,
    });
    mensajeSensor(res.data);
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
                onMouseOver={() => setPopOverCrecimiento(true)}
                onMouseOut={() => setPopOverCrecimiento(false)}
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
            className={`w-full mb-2 ${planta.sensorCrecimiento ? 'bg-green-500' : 'bg-red-400'} text-white`}
          >
            Sensor Crecimiento
          </Button>
        )}

        {!planta.aptaSensorProducto ? (
          <Popover open={popOverProducto}>
            <PopoverTrigger asChild>
              <Button
                onMouseOver={() => setPopOverProducto(true)}
                onMouseOut={() => setPopOverProducto(false)}
                className='w-full cursor-default opacity-50 mb-2 bg-[#c7c7c7] hover:bg-[#cccccc] text-[#3B3B3B]'
              >
                Sensor Producto
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className='bg-white rounded p-2'>
                <strong>Esta planta no es apta para colocar sensor de producto</strong>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Button
            onClick={() => asignarSensorProducto(planta.idPlanta)}
            className={`w-full mb-2 ${planta.sensorProducto ? 'bg-green-500' : 'bg-red-400'} text-white`}
          >
            Sensor Producto
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

type Props = {
  planta: Planta;
};
