import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ToastAction } from '@/components/ui/toast';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { httpClient } from '@/lib/api';
import { ROLES } from '@/lib/constants';
import { Planta, SensorCrecimiento, SensorProducto, SensorResponse } from '@/types';
import { Sprout } from 'lucide-react';
import { FC, useState } from 'react';

export const PlantaCard: FC<Props> = ({ planta }) => {
  const [plantaState, setPlantaState] = useState(planta);
  const [popOverCrecimiento, setPopOverCrecimiento] = useState(false);
  const [popOverProducto, setPopOverProducto] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

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

    if (res.data.isValid) {
      setPlantaState((prevState) => ({
        ...prevState,
        sensorProducto: {} as SensorProducto,
      }));
    }

    mensajeSensor(res.data);
  };

  const asignarSensorCrecimiento = async (plantaId: number) => {
    const res = await httpClient.post<SensorResponse>('/plantas/asignar-sensor-crecimiento', {
      plantaId,
    });

    if (res.data.isValid) {
      setPlantaState((prevState) => ({
        ...prevState,
        sensorCrecimiento: {} as SensorCrecimiento,
      }));
    }

    mensajeSensor(res.data);
  };

  return (
    <Card className='p-4'>
      <CardContent className='flex flex-col items-center'>
        <Sprout size={40} color='#98a75f' className='mb-4' />
        <span>{planta.idPlanta}</span>
        {user.role === ROLES.ADMIN && (
          <>
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
                    <strong>Esta planta aun no es apta para colocar sensor de crecimiento</strong>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Button
                onClick={() => asignarSensorCrecimiento(planta.idPlanta)}
                className={`w-full mb-2 
                  ${plantaState.sensorCrecimiento ? 'bg-[#98a75f] pointer-events-none' : 'bg-[#A8A8A8]'} 
                  ${!plantaState.sensorCrecimiento && 'hover:bg-[#98a75f]' } text-white`}
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
                    <strong>Esta planta aun no es apta para colocar sensor de producto</strong>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Button
                onClick={() => asignarSensorProducto(planta.idPlanta)}
                className={`w-full mb-2 
                  ${plantaState.sensorProducto ? 'bg-[#98a75f] pointer-events-none' : 'bg-[#A8A8A8]'}
                  ${!plantaState.sensorProducto && 'hover:bg-[#98a75f]' } text-white`}
              >
                Sensor Producto
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

type Props = {
  planta: Planta;
};
