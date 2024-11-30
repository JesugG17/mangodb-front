import { useEffect, useState } from 'react';
import { FirstLetterGreen } from '@/components/FirstLetterGreen/FirstLetterGreen';
import { Sprout, Box } from 'lucide-react';
import { EstantesPage } from './EstantesPage';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { httpClient } from '@/lib/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/Spinner';

interface EntradaCaja {
  id: number;
  espacio: '';
  fechaRegistro: string;
}

export interface Estante {
  estante: number;
  disponibles: number;
  lleno: boolean;
} 

export interface Almacen {
  id: number;
  tipo: string;
}

export const AlmacenOptions = () => {
  const [cajaEntrada, setCajaEntrada] = useState<EntradaCaja>({
    id: 0,
    espacio: '',
    fechaRegistro: new Date().toISOString().split('T')[0],
  });
  const [estantes, setEstantes] = useState<Estante[]>([])
  const [almacen, setAlmacen] = useState<Almacen>({} as Almacen)
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleRegistrarCaja = () => {
    console.log('Caja registrada:', cajaEntrada);
    setCajaEntrada({
      id: 0,
      espacio: '',
      fechaRegistro: new Date().toISOString().split('T')[0],
    });
  };

  useEffect(() => {
    httpClient.get(`/almacenes/${id}`)
    .then(resp => {
      if (!resp.data.isValid) {
        navigate('/dashboard/almacen');
        return toast({
          title: 'HA OCURRIDO UN ERROR',
          description: resp.data.message
        });
      }

      setAlmacen(resp.data.data.almacen);
      setEstantes(resp.data.data.estantes);
    })
    .finally(() => setIsLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
       <Spinner />
      </div>
    );
  }

  return (
    <div className='w-full h-[93%]'>
      <div className='flex p-3 items-center'>
        <Sprout size={40} color='#98a75f' />
        <FirstLetterGreen label='Almacén' style={{ fontSize: 35 }} />
      </div>
      <div className='flex flex-col justify-items-start p-[30px] bg-[#fcfcfc] w-full h-[95%] rounded shadow-lg'>
        <div>
          <div className='w-full h-9 flex gap-5 items-center justify-between text-black'>
            <div className='flex items-center'>
              <span>ID:</span>
              <input type='text' placeholder={almacen.id + ''} disabled className='w-40 h-9 ml-3' />
              <span>Tipo:</span>
              <input type='text' placeholder={almacen.tipo} disabled className='w-40 h-9 ml-3' />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='bg-[#98a75f] hover:bg-[#7a8a3b] text-white flex gap-1'>
                  <Box className='mr-2 h-4 w-4' />
                  Entrada de Caja
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Entrada de Caja a Almacen</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='flex grid-cols-4 items-center gap-2'>
                    <Label htmlFor='kilos' className='w-1/5'>
                      ID Caja
                    </Label>
                    <Input
                      id='kilos'
                      type='text'
                      value={cajaEntrada.id}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          setCajaEntrada({ ...cajaEntrada, id: Number(value) });
                        }
                      }}
                      className='col-span-3'
                    />
                  </div>
                </div>
                <Button className=' bg-[#98a75f] hover:bg-[#7a8a3b] text-white'>
                  Asignar Partición
                </Button>
                <div className='mt-4 p-4 bg-gray-100 rounded-md' onClick={handleRegistrarCaja}>
                  <h3 className='font-bold mb-2'>Etiqueta:</h3>
                  <p>Caja: [ID de la Caja]</p>
                  <p>Fecha de registro: {cajaEntrada.fechaRegistro}</p>
                  <p>Partición Asignada: {cajaEntrada.espacio}</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className='mt-10 flex justify-center'>
          <EstantesPage estantes={estantes} almacen={almacen} />
        </div>
      </div>
    </div>
  );
};
