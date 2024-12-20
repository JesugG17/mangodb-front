import { DashboardLayout } from '@/layout';
import { HectareaPage } from '@/pages/HectareaComponents/HectareaPage';
import { Home } from '@/pages/Home/Home';
import { Almacen } from '@/pages/Almacen/Almacen';
import { AlmacenOptions } from '@/pages/Almacen/AlmacenOptions';
import { UserCatalago } from '@/pages/UserCatalago/UserCatalago';
import { DetalleHectarea } from '@/pages/HectareaComponents/DetalleHectarea';
import { Route, Routes } from 'react-router-dom';

export const DashboardRouter = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path='/inicio' element={<Home />} />
        <Route path='/hectarea' element={<HectareaPage />} />
        <Route path='/hectarea/:id' element={<DetalleHectarea />} />
        <Route path='/almacen' element={<Almacen />} />
        <Route path='/almacen/:id' element={<AlmacenOptions />} />
        <Route path='/cat-usuarios' element={<UserCatalago />} />
      </Routes>
    </DashboardLayout>
  );
};
