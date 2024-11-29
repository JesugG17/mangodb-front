import { Home, Package, Sprout, Users, Layers, LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { httpClient } from '@/lib/api';
import { Opcion } from '@/types';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';

const icons = {
  home: Home,
  package: Package,
  sprout: Sprout,
  users: Users,
  layers: Layers,
};

type IconsKey = keyof typeof icons;

export const DashboardSidebar: React.FC<Props> = ({ isOpen }) => {
  const [opciones, setOpciones] = useState<Opcion[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const navigate = useNavigate();
  const { userName, setAuth } = useAuth();
  const { toast } = useToast();

  const getIcon = (icon: string) => {
    const IconComponent = icons[icon as IconsKey];
    return <IconComponent />;
  };

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      name: '',
    });
    localStorage.clear();
  };

  const fetchOptions = async () => {
    setIsLoadingOptions(true);
    const res = await httpClient.get('/users/opciones');
    setIsLoadingOptions(false);
    if (res.data.isValid) {
      setOpciones(res.data.data);
      return;
    }

    localStorage.clear();
    navigate('/auth/login', {
      replace: true,
    });
    setAuth({
      isAuthenticated: false,
      name: '',
    });
    toast({
      title: 'SU SESIÓN HA EXPIRADO',
      description: 'Ha pasado el tiempo maximo en el que su sesión es valida...',
      action: <ToastAction altText='Goto schedule to undo'>Cerrar</ToastAction>,
    });
  };

  useEffect(() => {
    fetchOptions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='flex items-center p-4'>
        <Avatar className='w-10 h-10 transition-all duration-300 ease-in-out group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8'>
          <AvatarFallback className='bg-primary text-primary-foreground'>
            {userName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        {isOpen && (
          <div className='ml-3 overflow-hidden transition-all duration-300 ease-in-out group-data-[collapsible=icon]:w-0'>
            <h3 className='font-semibold text-lg leading-tight'>MangoDB</h3>
            <p className='text-xs text-muted-foreground'>{userName}</p>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent className='flex flex-col justify-between'>
        <SidebarMenu>
          {isLoadingOptions
            ? Array.from({ length: 6 }).map((_, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))
            : opciones.map((item, index) => (
                <SidebarMenuItem key={index} className='flex justify-center'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild>
                          <Link to={item.ruta} className='flex items-center gap-3'>
                            {getIcon(item.icono)}
                            <span>{item.texto}</span>
                          </Link>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side='right' sideOffset={10}>
                        {item.texto}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SidebarMenuItem>
              ))}
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem className='flex justify-center'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    disabled={isLoadingOptions}
                    asChild
                    className='pb-5 cursor-pointer'
                    onClick={handleLogout}
                  >
                    <div className='text-center'>
                      <LogOut />
                      <span>Cerrar sesión</span>
                    </div>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side='right' sideOffset={10}>
                  Cerrar sesión
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

type Props = {
  isOpen: boolean;
};
