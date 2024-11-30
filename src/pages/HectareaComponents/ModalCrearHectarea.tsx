import { ChangeEvent, FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { httpClient } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';

export const ModalCrearHectarea: FC<Props> = ({ isVisible, onOpenChange, onCreate }) => {
  const [formState, setFormState] = useState({
    idHectarea: 0,
    comunidad: '',
    ubicacion: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async() => {
    const newHectarea = {
      ...formState,
      idHectarea: +formState.idHectarea
    };
    
    if(newHectarea.idHectarea === 0 || newHectarea.comunidad === '' || newHectarea.ubicacion === '') {
      return toast({
        title: 'ERROR',
        description: 'Todos los campos son requeridos',
        action: <ToastAction altText='Goto schedule to undo'>Cerrar</ToastAction>
      });
    }

    setIsLoading(true);
    const { data } = await httpClient.post('/hectareas/create', newHectarea);
    setIsLoading(false);
    if (!data.isValid) {
      return toast({
        title: 'HA OCURRIDO UN ERROR',
        description: data.message
      });
    }
    
    toast({
      title: 'HECTAREA CREADA',
      description: data.message
    });
    setFormState({
      idHectarea: 0,
      comunidad: '',
      ubicacion: ''
    });
    onOpenChange(false);
    onCreate();
  }

  return (
    <Dialog open={isVisible} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Registrar Nueva Hectárea</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='id' className='text-right'>
              ID de hectárea
            </Label>
            <Input
              type='text'
              id='idHectarea'
              name='idHectarea'
              value={formState.idHectarea}
              className='col-span-3'
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                    setFormState(prevState => ({
                      ...prevState,
                      idHectarea: Number(value)
                    }));
                }
              }}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='comunidad' className='text-right'>
              Comunidad
            </Label>
            <Input
              id='comunidad'
              name='comunidad'
              value={formState.comunidad}
              onChange={handleChange}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='ubicacion' className='text-right'>
              Ubicación
            </Label>
            <Input
              id='ubicacion'
              name='ubicacion'
              value={formState.ubicacion}
              onChange={handleChange}
              className='col-span-3'
            />
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className='bg-[#98a75f] hover:bg-[#9dac65] text-white'
        >
          {
            isLoading
            ? 'Cargando...'
            : 'Registrar Hectarea'
          }
        </Button>
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  isVisible: boolean;
  onOpenChange: (newState: boolean) => void;
  onCreate: () => void;
}