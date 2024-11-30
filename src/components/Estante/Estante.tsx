import React, { useEffect, useState } from 'react';
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
import { Almacen, Estante as IEstante } from '@/pages/Almacen/AlmacenOptions';
import { httpClient } from '@/lib/api';

interface Particion {
  particion: number;
  caja: unknown;
}

interface Division {
  division: number;
  particiones: Particion[];
}

export const Estante: React.FC<Props> = ({ estante, almacen }) => {
  const { disponibles, estante: id, lleno } = estante;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [divisiones, setDivisiones] = useState<Division[]>([]);

  const getBackgroundColor = (): string => {
    return lleno ? 'bg-red-100' : 'bg-green-100';
  };

  const getStatusColor = (disponible: boolean): string => {
    return disponible ? 'text-green-700' : 'text-red-700';
  };

  const estanteStatus = lleno ? 'Lleno' : 'Disponible';

  useEffect(() => {
    httpClient.post('/estantes', {
      estanteId: id,
      almacenId: almacen.id
    })
    .then(resp => {
      setDivisiones(resp.data.data);
    })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={`${getBackgroundColor()} border rounded-lg p-4 m-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-[200px] flex flex-col justify-items-start`}
      >
        <div>
          <h3 className='text-lg font-semibold text-[#3d3d3d] mb-2'>Estante {id}</h3>
          <div className='space-y-2'>
            <p className='text-sm text-[#3d3d3d]'>
              <span className='font-medium'>Espacios disponibles:</span> {disponibles}
            </p>
            <p className={`text-sm font-medium ${getStatusColor(!lleno)}`}>
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
              {
                divisiones.map(({ division, particiones }) => (
                  <TableRow key={division}>
                    <TableCell>{division}</TableCell>
                    <TableCell>
                      <div className='flex space-x-2'>
                        {
                          particiones.map(({ particion, caja }) => (
                            <div key={particion}>
                              {
                                caja 
                                ? <Package size={20} />
                                : <div className='w-5 h-5 border rounded' />
                              }
                            </div>
                          ))
                        }
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              }
              {/* {ocupacion.map((division, divIndex) => (
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
              ))} */}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
};

type Props = {
  estante: IEstante;
  almacen: Almacen;
}
