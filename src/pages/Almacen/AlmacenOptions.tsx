import { useState } from 'react';
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

interface EntradaCaja {
  id: number;
  espacio: '';
  fechaRegistro: string;
}

export const AlmacenOptions = () => {
  const [cajaEntrada, setCajaEntrada] = useState<EntradaCaja>({
    id: 0,
    espacio: '',
    fechaRegistro: new Date().toISOString().split('T')[0],
  });

  const handleRegistrarCaja = () => {
    // Aquí iría la lógica para guardar el registro de la caja
    console.log('Caja registrada:', cajaEntrada);
    // Reiniciar el formulario
    setCajaEntrada({
      id: 0,
      espacio: '',
      fechaRegistro: new Date().toISOString().split('T')[0],
    });
  };

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
              <input type='text' placeholder='1234' disabled className='w-40 h-9 ml-3' />
              <span>Tipo:</span>
              <input type='text' placeholder='Calidad' disabled className='w-40 h-9 ml-3' />
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
          <EstantesPage />
        </div>
      </div>
    </div>
  );
};
