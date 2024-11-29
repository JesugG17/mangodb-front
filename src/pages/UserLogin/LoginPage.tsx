import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { loginUser } from '@/services/auth-service';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  correo: z.string().email({ message: 'Correo no valido' }),
  contrasenia: z
    .string()
    .min(6, { message: 'La contraseña debe de tener un minimo de 6 caracteres' }),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    const response = await loginUser(data);
    setIsLoading(false);

    if (!response?.isValid) {
      setError('root', {
        type: 'manual',
        message: response.message,
      });
      return;
    }

    setAuth({
      isAuthenticated: true,
      name: response.data?.user.name as string,
    });

    const auth = {
      token: response.data?.token,
      userName: response.data?.user.name,
    };
    localStorage.setItem('auth', JSON.stringify(auth));
    navigate('/dashboard/inicio', {
      replace: true,
    });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-md'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-bold text-center'>Inicio de Sesión</CardTitle>
            <CardDescription className='text-center'>
              Ingresa tu correo y contraseña para iniciar sesión
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Correo</Label>
              <div className='relative'>
                <Mail
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                  size={20}
                />
                <Input
                  id='email'
                  placeholder='Correo'
                  type='email'
                  className='pl-10'
                  {...register('correo')}
                />
              </div>
              {errors.correo && <p className='text-sm text-red-500'>{errors.correo.message}</p>}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Contraseña</Label>
              <div className='relative'>
                <Lock
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                  size={20}
                />
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Contraseña'
                  className='pl-10 pr-10'
                  {...register('contrasenia')}
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5' aria-hidden='true' />
                  ) : (
                    <Eye className='h-5 w-5' aria-hidden='true' />
                  )}
                </button>
              </div>
              {errors.contrasenia && (
                <p className='text-sm text-red-500'>{errors.contrasenia.message}</p>
              )}
            </div>
            {errors.root && <p className='text-sm text-red-500'>{errors.root.message}</p>}
          </CardContent>
          <CardFooter>
            <Button className='w-full' type='submit' disabled={isLoading}>
              {isLoading ? 'Cargando...' : 'Login'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
