import React from 'react';
import { Hectarea as HectareaType } from './HectareaPage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { ROLES } from '@/lib/constants';

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

export const HectareaCard: React.FC<HectareaType> = ({
  idHectarea,
  comunidad,
  ubicacion,
  status,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAutorizarButtonEnabled = status === 'COSECHABLE';

  return (
    <div
      className={`${getBackgroundColor(
        status
      )} border rounded-lg p-4 m-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer  flex flex-col justify-items-start`}
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
          className={`bg-transparent h-8 rounded border mt-4 p-1 ${getBorderColor(status)} hover:bg-white hover:border-black stransition-all duration-200  flex-1`}
        >
          <span className={`text-sm font-semibold ${getStatusColor(status)}`}>Ver detalle</span>
        </button>
        {user.role === ROLES.ADMIN && (
          <button
            onClick={() => {
              // e.stopPropagation();
              console.log('click');
            }}
            disabled={!isAutorizarButtonEnabled}
            className={`bg-transparent h-8 rounded border p-1 ${getBorderColor(status)} ${
              isAutorizarButtonEnabled ? '' : 'disabled pointer-events-none'
            } transition-all duration-200 hover:bg-white hover:text-black hover:border-black flex-1`}
          >
            <span className={`text-sm font-semibold ${getStatusColor(status)}`}>Autorizar</span>
          </button>
        )}
      </div>
    </div>
  );
};
