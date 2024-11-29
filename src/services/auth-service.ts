import { httpClient } from '@/lib/api';
import { AuthResponse } from '@/types';

interface LoginData {
  correo: string;
  contrasenia: string;
}

export const loginUser = async (loginData: LoginData) => {
  try {
    const response = await httpClient.post<AuthResponse>('/auth/login', loginData);
    return response.data;
  } catch (error) {
    console.log('An error has ocurred', error);
    return {
      isValid: false,
      message: 'No fue posible iniciar sesión',
    };
  }
};
