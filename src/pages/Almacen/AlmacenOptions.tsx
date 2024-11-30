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
  idCaja: number;
  estante: number;
  division: number;
  particion: number;
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
  const [formState, setFormState] = useState({
    idCaja: ''
  });
  const [cajaEntrada, setCajaEntrada] = useState<EntradaCaja>({} as EntradaCaja);
  const [estantes, setEstantes] = useState<Estante[]>([])
  const [almacen, setAlmacen] = useState<Almacen>({} as Almacen)
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEstanteLoading, setIsEstanteLoading] = useState(false);

  const handleAsignarEspacio = async() => {
    const { data } = await httpClient.post('/almacenes/asignar-espacio', {
      idCaja: formState.idCaja,
      idAlmacen: almacen.id
    });

    if (!data.isValid) {
      return toast({
        title: 'HA OCURRIDO UN ERROR',
        description: data.message
      });
    }
    setCajaEntrada({ ...data.data });
    await fetchAlmacen();
  }

  const fetchAlmacen = async() => {
    setIsEstanteLoading(true)
    const { data } = await httpClient.get(`/almacenes/${id}`);

    if (!data.isValid) {
      navigate('/dashboard/almacen');
      return toast({
        title: 'HA OCURRIDO UN ERROR',
        description: data.message
      });
    }

    setAlmacen(data.data.almacen);
    setEstantes(data.data.estantes);
    setIsEstanteLoading(false);
  }

  useEffect(() => {
    fetchAlmacen().finally(() => setIsLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
       <Spinner />
      </div>
    );
  }

  const almacenLleno = estantes.every(estante => estante.lleno);

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
              <input type='text' placeholder={almacen.id + ''} disabled className='w-40 h-9 ml-3 p-2' />
              <span>Tipo:</span>
              <input type='text' placeholder={almacen.tipo} disabled className='w-40 h-9 ml-3 p-2' />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button disabled={almacenLleno} className='bg-[#98a75f] hover:bg-[#7a8a3b] text-white flex gap-1'>
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
                      type='number'
                      value={formState.idCaja}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          setFormState({
                            idCaja: value
                          });
                        }
                      }}
                      className='col-span-3'
                    />
                  </div>
                </div>
                <Button
                  onClick={handleAsignarEspacio}
                  disabled={isEstanteLoading}
                  className=' bg-[#98a75f] hover:bg-[#7a8a3b] text-white'
                >
                  {isEstanteLoading ? 'Cargando...' : 'Asignar Espacio'}
                </Button>
                <div className='mt-4 p-4 bg-gray-100 rounded-md'>
                  <h3 className='font-bold mb-2'>Etiqueta:</h3>
                  <p><strong>Caja:</strong> {cajaEntrada.idCaja || 'No asignado'}</p>
                  <p><strong>Estante:</strong> {cajaEntrada.estante || 'No asignado'}</p>
                  <p><strong>Division:</strong> {cajaEntrada.division || 'No asignado'}</p>
                  <p><strong>Particion:</strong> {cajaEntrada.particion || 'No asignado'}</p>
                  <p><strong>Fecha de registro:</strong> {cajaEntrada.fechaRegistro ? cajaEntrada.fechaRegistro.split('T')[0] : 'No asignado'}</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className='mt-10 flex justify-center'>
          {
            isEstanteLoading
            ? 'Cargando...'
            : <EstantesPage estantes={estantes} almacen={almacen} />
          }
        </div>
      </div>
    </div>
  );
};
