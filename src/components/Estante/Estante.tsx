import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Package } from 'lucide-react';

interface EstanteProps {
  id: number;
  divisionesDisponibles: number;
  ocupacion: boolean[][];
}

export const Estante: React.FC<EstanteProps> = ({ id, divisionesDisponibles, ocupacion }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getBackgroundColor = (disponible: boolean): string => {
    return disponible ? 'bg-green-100' : 'bg-red-100';
  };

  const getStatusColor = (disponible: boolean): string => {
    return disponible ? 'text-green-700' : 'text-red-700';
  };

  const estanteStatus = divisionesDisponibles > 0 ? 'Disponible' : 'Lleno';

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={`${getBackgroundColor(
          divisionesDisponibles > 0
        )} border rounded-lg p-4 m-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-[200px] flex flex-col justify-items-start`}
      >
        <div>
          <h3 className='text-lg font-semibold text-[#3d3d3d] mb-2'>Estante {id}</h3>
          <div className='space-y-2'>
            <p className='text-sm text-[#3d3d3d]'>
              <span className='font-medium'>Divisiones disponibles:</span> {divisionesDisponibles}
            </p>
            <p className={`text-sm font-medium ${getStatusColor(divisionesDisponibles > 0)}`}>
              Estado: {estanteStatus}
            </p>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Estante {id}</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>División</TableHead>
                <TableHead>Particiones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ocupacion.map((division, divIndex) => (
                <TableRow key={divIndex}>
                  <TableCell>{divIndex + 1}</TableCell>
                  <TableCell>
                    <div className='flex space-x-2'>
                      {division.map((ocupada, partIndex) => (
                        <div key={partIndex}>
                          {ocupada ? (
                            <Package size={20} />
                          ) : (
                            <div className='w-5 h-5 border rounded' />
                          )}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
};
