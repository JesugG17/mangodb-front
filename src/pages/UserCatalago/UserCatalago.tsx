import { useEffect, useState } from 'react';
import { Sprout, Pencil, UserPlus } from 'lucide-react';
import { FirstLetterGreen } from '@/components/FirstLetterGreen/FirstLetterGreen';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { httpClient } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

interface User {
  nombres: string;
  correo: string;
  apellido_paterno: string;
  apellido_materno: string;
  role: { id: number; nombre: string };
}

interface UserForms {
  nombres: string;
  correo: string;
  apellido_paterno: string;
  apellido_materno: string;
  roleId: number;
  contrasenia: string;
  confirmarContrasenia: string;
}

interface UserUpdated {
  correo: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  roleId: number;
}

const INITIAL_STATE = {
  nombres: '',
  correo: '',
  apellido_paterno: '',
  apellido_materno: '',
  roleId: 0,
  contrasenia: '',
  confirmarContrasenia: '',
};

export const UserCatalago = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<UserUpdated | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [newUser, setNewUser] = useState<UserForms>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    const res = await httpClient.get('/users/all');
    setIsLoadingUsers(false);

    if (res.data.isValid) {
      setUsers(res.data.data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const validarCampos = (user: UserForms) => {
    if (
      user.correo === '' ||
      user.nombres === '' ||
      user.apellido_paterno === '' ||
      user.apellido_materno === '' ||
      user.contrasenia === '' ||
      user.confirmarContrasenia === ''
    ) {
      toast({
        title: 'CAMPOS VACÍOS.',
        description: 'Por favor complete todos los campos para continuar.',
        action: <ToastAction altText='Goto schedule to undo'>Cerrar</ToastAction>,
      });
      return false;
    }
    
    if (user.contrasenia !== user.confirmarContrasenia) {
      toast({
        title: 'VERIFICAR CONTRASEÑA.',
        description: 'Las contraseñas no coinciden, por favor verifique.',
        action: <ToastAction altText='Goto schedule to undo'>Cerrar</ToastAction>,
      });
      return false;
    }

    if (user.roleId === 0) {
      toast({
        title: 'SELECCIONAR ROL.',
        description: 'Por favor seleccione un rol para el nuevo usuario.',
        action: <ToastAction altText='Goto schedule to undo'>Cerrar</ToastAction>,
      });
      return false;
    }

    return true;
  };

  const handleEditUser = (user: User) => {
    const { nombres, correo, apellido_paterno, apellido_materno, role } = user;
    setEditingUser({ nombres, correo, apellido_paterno, apellido_materno, roleId: role.id });
  };

  const handleSaveUser = async () => {
    if (editingUser) {
      const userToUpdate = {
        nombres: editingUser.nombres,
        correo: editingUser.correo,
        apellido_paterno: editingUser.apellido_paterno,
        apellido_materno: editingUser.apellido_materno,
        roleId: editingUser.roleId,
      };

      if (!validarCampos(userToUpdate as UserForms)) return;
      setIsLoading(true);
      const res = await httpClient.put(`/users/update/${userToUpdate.correo}`, userToUpdate);
      setIsLoading(false);
      if (res.data.isValid) {
        toast({
          title: 'USUARIO EDITADO CON ÉXTIO.',
          description: 'El usuario ha sido editado correctamente.',
          action: <ToastAction altText='Goto schedule to undo'>Cerrar</ToastAction>,
        });
        fetchUsers();
      }
    }
  };

  const handleCreateUser = async () => {
    const newUserToCreate = {
      correo: newUser.correo,
      contrasenia: newUser.contrasenia,
      confirmarContrasenia: newUser.confirmarContrasenia,
      nombres: newUser.nombres,
      apellido_paterno: newUser.apellido_paterno,
      apellido_materno: newUser.apellido_materno,
      roleId: newUser.roleId,
    };

    if (!validarCampos(newUserToCreate)) return;
    setIsCreateDialogOpen(false);

    const res = await httpClient.post('/users/create', newUserToCreate);
    if (res.data.isValid) {
      toast({
        title: 'USUARIO CREADO CON ÉXTIO.',
        description: 'El usuario ha sido creado correctamente.',
        action: <ToastAction altText='Goto schedule to undo'>Cerrar</ToastAction>,
      });
      fetchUsers();
      setNewUser(INITIAL_STATE);
    }
  };

  return (
    <div className='w-full h-[93%]'>
      <div className='flex p-3 items-center justify-between'>
        <div className='flex p-3 items-center'>
          <Sprout size={40} color='#98a75f' />
          <FirstLetterGreen label='Catálogo de Usuarios' style={{ fontSize: 35 }} />
        </div>
        <div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className='bg-[#98a75f] hover:bg-[#7a8a3b] text-white'>
                <UserPlus className='mr-2 h-4 w-4' /> Crear Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Crear Nuevo Usuario</DialogTitle>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='newFirstName' className='text-right'>
                    Nombres
                  </Label>
                  <Input
                    id='newFirstName'
                    value={newUser.nombres}
                    onChange={(e) => setNewUser({ ...newUser, nombres: e.target.value })}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='newLastName' className='text-right'>
                    Apellido Paterno
                  </Label>
                  <Input
                    id='newLastName'
                    value={newUser.apellido_paterno}
                    onChange={(e) => setNewUser({ ...newUser, apellido_paterno: e.target.value })}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='newMaternalLastName' className='text-right'>
                    Apellido Materno
                  </Label>
                  <Input
                    id='newMaternalLastName'
                    value={newUser.apellido_materno}
                    onChange={(e) => setNewUser({ ...newUser, apellido_materno: e.target.value })}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='newEmail' className='text-right'>
                    Correo
                  </Label>
                  <Input
                    id='newEmail'
                    type='email'
                    value={newUser.correo}
                    onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='newRole' className='text-right'>
                    Rol
                  </Label>
                  <Select
                    onValueChange={(value) => setNewUser({ ...newUser, roleId: parseInt(value) })}
                    value={newUser.roleId.toString()}
                  >
                    <SelectTrigger className='col-span-3'>
                      <SelectValue placeholder='Seleccionar rol' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='1'>Administrador</SelectItem>
                      <SelectItem value='2'>Gerente de Almacen</SelectItem>
                      <SelectItem value='3'>Lider de Recolección</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='newPassword' className='text-right'>
                    Contraseña
                  </Label>
                  <Input
                    id='newPassword'
                    type='password'
                    value={newUser.contrasenia}
                    onChange={(e) => setNewUser({ ...newUser, contrasenia: e.target.value })}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='newConfirmPassword' className='text-right'>
                    Confirmar Contraseña
                  </Label>
                  <Input
                    id='newConfirmPassword'
                    type='password'
                    value={newUser.confirmarContrasenia}
                    onChange={(e) =>
                      setNewUser({ ...newUser, confirmarContrasenia: e.target.value })
                    }
                    className='col-span-3'
                  />
                </div>
              </div>
              <Button
                onClick={handleCreateUser}
                disabled={isLoading}
                className='bg-[#98a75f] hover:bg-[#7a8a3b] text-white'
              >
                {isLoading ? 'Cargando...' : 'Crear Usuario'}
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className='flex flex-col p-[30px] bg-[#fcfcfc] w-full h-[92%] rounded shadow-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Correo</TableHead>
              <TableHead>Nombres</TableHead>
              <TableHead>Apellido Paterno</TableHead>
              <TableHead>Apellido Materno</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Opciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingUsers &&
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className='w-20 h-5' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='w-20 h-5' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='w-20 h-5' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='w-20 h-5' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='w-20 h-5' />
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled
                      className='bg-[#98a75f] hover:bg-[#7a8a3b] text-white'
                    >
                      Cargando...
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            {users.map((user) => (
              <TableRow key={user.correo}>
                <TableCell>{user.correo}</TableCell>
                <TableCell>{user.nombres}</TableCell>
                <TableCell>{user.apellido_paterno}</TableCell>
                <TableCell>{user.apellido_materno}</TableCell>
                <TableCell>{user.role.nombre}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => handleEditUser(user)}
                        className='bg-[#98a75f] hover:bg-[#7a8a3b] text-white'
                      >
                        <Pencil className='mr-2 h-4 w-4' /> Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px]'>
                      <DialogHeader>
                        <DialogTitle>Editar Usuario</DialogTitle>
                      </DialogHeader>
                      <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                          <Label htmlFor='firstName' className='text-right'>
                            Nombres
                          </Label>
                          <Input
                            id='firstName'
                            value={editingUser?.nombres}
                            onChange={(e) =>
                              setEditingUser({ ...editingUser!, nombres: e.target.value })
                            }
                            className='col-span-3'
                          />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                          <Label htmlFor='lastName' className='text-right'>
                            Apellido Paterno
                          </Label>
                          <Input
                            id='lastName'
                            value={editingUser?.apellido_paterno}
                            onChange={(e) =>
                              setEditingUser({
                                ...editingUser!,
                                apellido_paterno: e.target.value,
                              })
                            }
                            className='col-span-3'
                          />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                          <Label htmlFor='maternalLastName' className='text-right'>
                            Apellido Materno
                          </Label>
                          <Input
                            id='maternalLastName'
                            value={editingUser?.apellido_materno}
                            onChange={(e) =>
                              setEditingUser({
                                ...editingUser!,
                                apellido_materno: e.target.value,
                              })
                            }
                            className='col-span-3'
                          />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                          <Label htmlFor='role' className='text-right'>
                            Rol
                          </Label>
                          <Select
                            onValueChange={(value) =>
                              setEditingUser({ ...editingUser!, roleId: parseInt(value) })
                            }
                            defaultValue={editingUser?.roleId.toString()}
                          >
                            <SelectTrigger className='col-span-3'>
                              <SelectValue placeholder='Seleccionar rol' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='1'>Administrador</SelectItem>
                              <SelectItem value='2'>Gerente de Almacen</SelectItem>
                              <SelectItem value='3'>Lider de Recolección</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button
                        onClick={handleSaveUser}
                        className='bg-[#98a75f] hover:bg-[#7a8a3b] text-white'
                      >
                        Guardar cambios
                      </Button>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
