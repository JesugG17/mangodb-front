import { DashboardSidebar } from '@/components/Sidebar/Sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { FC, PropsWithChildren, useState } from 'react';

export const DashboardLayout: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarProvider open={isOpen} onOpenChange={setIsOpen}>
      <div className='flex h-screen w-full'>
        <DashboardSidebar isOpen={isOpen} />
        <SidebarInset className='flex flex-col flex-grow'>
          <header className='flex items-center border-b px-4 bg-[#98A75F] text-[#3B3B3B] p-[10px]'>
            <SidebarTrigger />
            <div className='ml-4 font-semibold'>Dashboard</div>
          </header>
          <main className='flex-grow p-4 bg-[#f3f3f3]'>{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

type Props = PropsWithChildren;
