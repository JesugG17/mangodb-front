import { useEffect, useState } from 'react';
import { Sprout, Box, ArrowBigLeftDash } from 'lucide-react';
import { FirstLetterGreen } from '@/components/FirstLetterGreen/FirstLetterGreen';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate, useParams } from 'react-router-dom';
import { httpClient } from '@/lib/api';
import { CajaResponse, DataHectarea, HectareaResponse } from '@/types';
import { Input } from '@/components/ui/input';

interface CajaRegistro {
  planta: number;
  kg: number;
  tipo: string;
}

interface CajaRegistrada {
  idCaja: number;
  hectarea: number;
  kg: number;
  planta: number;
  fecha: Date;
  tipo: string;
}

export const DetalleHectarea = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();

  const [cajaRegistrada, setCajaRegistrada] = useState<CajaRegistrada>({
    idCaja: 0,
    hectarea: 0,
    kg: 0,
    planta: 0,
    fecha: new Date(),
    tipo: 'CALIDAD'
  });
  const [hectarea, setHectarea] = useState<DataHectarea>();
  const [cajaRegistro, setCajaRegistro] = useState<CajaRegistro>({
    kg: 0,
    planta: 0,
    tipo: 'CALIDAD'
  });

  const handleRegistrarCaja = (res: CajaResponse) => {
  const { data } = res;

    if (res.isValid) {
      setCajaRegistrada({
        idCaja: data.idCaja,
        hectarea: +id!,
        kg: data.kg,
        planta: data.planta.idPlanta,
        fecha: data.fecha,
        tipo: data.tipo,
      });

      setCajaRegistro({
        kg: 0,
        planta: 0,
        tipo: 'CALIDAD',
      });
    
      toast({
        title: 'CAJA REGISTRADA CON ÉXITO',
        description: 'La caja ha sido registrada correctamente',
        action: <ToastAction altText='Goto schedule to undo'>Cerrar</ToastAction>,
      });
    }

    if (!res.isValid) {
      toast({
        title: 'ERROR AL REGISTRAR CAJA',
        description: res.message,
        action: <ToastAction altText='Goto schedule to undo'>Cerrar</ToastAction>,
      });
    }
  };
  
  const registrarCaja = async () => {

    if(cajaRegistro.planta === 0 || cajaRegistro.kg === 0) {
      toast({
        title: 'ERROR AL REGISTRAR CAJA',
        description: 'Debe colocar cantidades correctas',
        action: <ToastAction altText='Goto schedule to undo'>Cerrar</ToastAction>
      });
      return;
    }

    const userForCreate = {
      planta: cajaRegistro.planta,
      kg: cajaRegistro.kg,
      tipo: cajaRegistro.tipo
    }

    const res = await httpClient.post('/cajas/create', userForCreate);
    handleRegistrarCaja(res.data);
  }

  const asignarSensorProducto = async (plantaId: number) => {
    await httpClient.post('/plantas/asignar-sensor-producto', {
      plantaId
    });
  }

  const asignarSensorCrecimiento = async (plantaId: number) => {
    await httpClient.post('/plantas/asignar-sensor-crecimiento', {
      plantaId
    });
  }

  useEffect(() => {
    httpClient.get<HectareaResponse>(`/hectareas/by-id/${id}`)
      .then((res) => {
        if (!res.data.isValid) {
          toast({
            title: 'ERROR AL CARGAR HECTÁREA',
            description: res.data.message,
            action: <ToastAction altText='Goto schedule to undo'>Cerrar</ToastAction>,
          });
          navigate('/dashboard/hectarea');
        }

        setHectarea(res.data.data)
      })
  }, [])

  return (
    <div className='w-full h-[93%]'>
      <div className='flex p-2 items-center justify-between'>
        <div className='flex p-3 items-center'>
          <ArrowBigLeftDash size={40} className='cursor-pointer' color='#98a75f' onClick={() => navigate('/dashboard/hectarea')} />
          <div className='flex items-center ml-5'>
            <Sprout size={40} color='#98a75f' />
            <FirstLetterGreen label='Detalle de Hectárea' style={{ fontSize: 35 }} />
          </div>
        </div>
        <Dialog onOpenChange={(open) => {
          if (!open) {
            setCajaRegistrada({
              idCaja: 0,
              hectarea: 0,
              kg: 0,
              planta: 0,
              fecha: new Date(),
              tipo: 'CALIDAD',
            });
          }
        }}>
          <DialogTrigger asChild>
            <Button 
              className='bg-[#98a75f] hover:bg-[#7a8a3b] text-white flex gap-1'
            >
              <Box className='mr-2 h-4 w-4' />
              Registrar Caja
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Registrar Caja</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='flex grid-cols-4 items-center gap-7'>
                <Label htmlFor='planta' className='text-right'>
                  Planta
                </Label>
                <Input
                  id="planta"
                  type="text"
                  value={cajaRegistro.planta}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                        setCajaRegistro({ ...cajaRegistro, planta: Number(value) });
                    }
                  }}
                  className="col-span-3"
                />
              </div>
              <div className='flex grid-cols-4 items-center gap-9'>
                <Label htmlFor='planta' className='text-right'>
                  Kilos
                </Label>
                <Input
                  id="kilos"
                  type="text"
                  value={cajaRegistro.kg}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                        setCajaRegistro({ ...cajaRegistro, kg: Number(value) });
                    }
                }}
                  className="col-span-3"
                />
              </div>
              <div className='flex grid-cols-4 items-center gap-5'>
                <Label htmlFor='calidad' className='text-right'>
                  Calidad
                </Label>
                <Select
                  onValueChange={(value: string) =>
                    setCajaRegistro({ ...cajaRegistro, tipo: value })
                  }
                  defaultValue={cajaRegistro.tipo}
                >
                  <SelectTrigger className='col-span-3'>
                    <SelectValue placeholder='Seleccionar calidad' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='CALIDAD'>Calidad</SelectItem>
                    <SelectItem value='NO CALIDAD'>No Calidad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={() => registrarCaja()}
              className=' bg-[#98a75f] hover:bg-[#7a8a3b] text-white'
            >
              Registrar Caja
            </Button>
            <div className='mt-4 p-4 bg-gray-100 rounded-md'>
              <h3 className='font-bold mb-2'>Etiqueta:</h3>
              <p>Hectárea: {cajaRegistrada.hectarea}</p>
              <p>Kilos: {cajaRegistrada.kg}</p>
              <p>Planta: {cajaRegistrada.planta}</p>
              <p>Fecha de registro: {new Date(cajaRegistrada.fecha).toLocaleDateString()}</p>
              <p>Calidad: {cajaRegistrada.tipo}</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className='flex flex-col p-[30px] bg-[#fcfcfc] w-full h-[98%] rounded shadow-lg'>
        <div className='grid grid-cols-5 gap-4'>
          {hectarea?.plantas.map((planta) => (
            <Card key={planta.idPlanta} className='p-4'>
              <CardContent className='flex flex-col items-center'>
                <Sprout size={40} color='#98a75f' className='mb-4' />
                <span>{planta.idPlanta}</span>
                <Button
                  onClick={() => asignarSensorCrecimiento(planta.idPlanta)}
                  className='w-full mb-2 bg-[#c7c7c7] hover:bg-[#cccccc] text-[#3B3B3B]'
                >
                  Sensor Crecimiento
                </Button>
                <Button
                  onClick={() => asignarSensorProducto(planta.idPlanta)}
                  className='w-full bg-[#c7c7c7] hover:bg-[#cccccc] text-[#3B3B3B]'
                >
                  Sensor Producto
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
