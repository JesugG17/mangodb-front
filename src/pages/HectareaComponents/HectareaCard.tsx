import React from 'react';
import { Hectarea as HectareaType } from './HectareaPage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { ROLES } from '@/lib/constants';
import { httpClient } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';

const getBackgroundColor = (status: HectareaType['status']): string => {
  switch (status) {
    case 'NO COSECHABLE':
      return 'bg-red-100';
    case 'COSECHABLE':
      return 'bg-green-100';
    case 'COSECHANDO':
      return 'bg-yellow-100';
    case 'COSECHADA':
      return 'bg-gray-100';
  }
};

const getStatusColor = (status: HectareaType['status']): string => {
  switch (status) {
    case 'NO COSECHABLE':
      return 'text-red-700';
    case 'COSECHABLE':
      return 'text-green-700';
    case 'COSECHANDO':
      return 'text-yellow-700';
    case 'COSECHADA':
      return 'text-gray-700';
  }
};

const getBorderColor = (status: HectareaType['status']): string => {
  switch (status) {
    case 'NO COSECHABLE':
      return 'border-red-700';
    case 'COSECHABLE':
      return 'border-green-700';
    case 'COSECHANDO':
      return 'border-yellow-700';
    case 'COSECHADA':
      return 'border-gray-700';
  }
};

const getHoverStyles = (status: HectareaType['status']): string => {
  switch (status) {
    case 'NO COSECHABLE':
      return 'hover:bg-red-700';
    case 'COSECHABLE':
      return 'hover:bg-green-700';
    case 'COSECHANDO':
      return 'hover:bg-yellow-700';
    case 'COSECHADA':
      return 'hover:bg-gray-700';
  }
};

export const HectareaCard: React.FC<HectareaType> = ({
  idHectarea,
  comunidad,
  ubicacion,
  status,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const isAutorizarButtonEnabled = status === 'COSECHABLE';

  const fetchAutorizarHectarea = () => {
    httpClient
      .put(`/hectareas/autorizar/${idHectarea}`)
      .then((res) =>{
        if (!res.data.isValid) {
          toast({
            title: 'ERROR AL AUTORIZAR LA HECTÁREA',
            description: res.data.message,
            action: <ToastAction altText='Goto schedule to undo'>Cerrar</ToastAction>,
          });
          return;
        }

        toast({
          title: 'HECTÁREA AUTORIZADA CON ÉXITO',
          description: res.data.message,
          action: <ToastAction altText='Goto schedule to undo'>Cerrar</ToastAction>,
        });

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
  };

  const fetchFinalizarCosecha = () => {
    httpClient
      .put(`/hectareas/finalizar-cosecha/${idHectarea}`)
      .then((res) =>{
        if (!res.data.isValid) {
          toast({
            title: 'ERROR AL FINALIZAR LA COSECHA',
            description: res.data.message,
            action: <ToastAction altText='Goto schedule to undo'>Cerrar</ToastAction>,
          });
          return;
        }

        toast({
          title: 'COSECHA FINALIZADA CON ÉXITO',
          description: res.data.message,
          action: <ToastAction altText='Goto schedule to undo'>Cerrar</ToastAction>,
        });

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
  };

  return (
    <div
      className={`${getBackgroundColor(
        status
      )} border rounded-lg p-4 m-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col justify-items-start`}
    >
      <div>
        <h3 className='text-lg font-semibold text-[#3d3d3d] mb-2'>Hectárea {idHectarea}</h3>
        <div className='space-y-2'>
          <p className='text-sm text-[#3d3d3d]'>
            <span className='font-medium'>Comunidad:</span> {comunidad}
          </p>
          <p className='text-sm text-[#3d3d3d]'>
            <span className='font-medium'>Ubicación:</span> {ubicacion}
          </p>
          <p className={`text-sm font-medium ${getStatusColor(status)}`}>Estado: {status}</p>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <button
          onClick={() => navigate(`/dashboard/hectarea/${idHectarea}`)}
          className={`bg-transparent h-8 rounded border mt-4 p-1 ${getBorderColor(status)} ${getStatusColor(status)} ${getHoverStyles(status)} hover:text-white transition-all duration-200 flex-1`}
        >
          <span className={`text-sm font-semibold`}>Ver detalle</span>
        </button>
        
        {(user.role === ROLES.LIDER_RECOLECCION && status === 'COSECHANDO') && (
          <button
            onClick={() => {
              {fetchFinalizarCosecha()}
            }}
            className={`bg-transparent h-8 rounded border p-1 border-yellow-700 text-yellow-700 hover:bg-yellow-700 hover:text-white transition-all duration-200 flex-1`}
          >
            <span className="text-sm font-semibold">Finalizar Cosecha</span>
          </button>
        )}

        {user.role === ROLES.ADMIN && (
          <button
            onClick={() => {
              {fetchAutorizarHectarea()}
            }}
            disabled={!isAutorizarButtonEnabled}
            className={`bg-transparent h-8 rounded border p-1 ${getBorderColor(status)} ${
              isAutorizarButtonEnabled 
                ? `${getStatusColor(status)} ${getHoverStyles(status)} hover:text-white` 
                : 'text-gray-400'
            } transition-all duration-200 flex-1 ${
              !isAutorizarButtonEnabled && 'opacity-50 cursor-not-allowed'
            }`}
          >
            <span className="text-sm font-semibold">Autorizar</span>
          </button>
        )}
      </div>
    </div>
  );
};

