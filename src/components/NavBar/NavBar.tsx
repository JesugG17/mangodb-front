import { Home, Sprout, HousePlus, UserRoundPlus, FolderOpen, Tag, Tags } from 'lucide-react';

import {
  Sidebar as SideBarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Hectarea',
    url: '#',
    icon: Sprout,
  },
  {
    title: 'Almacen',
    url: '#',
    icon: HousePlus,
  },
  {
    title: 'Etiqueta Hectarea',
    url: '#',
    icon: Tag,
  },
  {
    title: 'Etiqueta Almacen',
    url: '#',
    icon: Tags,
  },
];

const itemsCollapsible = [
  {
    title: 'Catálogos',
    icon: FolderOpen,
    options: [
      {
        title: 'Usuarios',
        url: '#',
        icon: UserRoundPlus,
      },
      {
        title: 'Hectareas',
        url: '#',
        icon: Sprout,
      },
    ],
  },
];

export function SideBar() {
  return (
    <SideBarComponent>
      <SidebarContent className='bg-[#eeeeee]'>
        {/* Opciones estáticas */}
        <SidebarGroup>
          <SidebarGroupLabel>Options</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            {/* Opciones colapsables */}
            <SidebarMenu>
              {itemsCollapsible.map((item) => (
                <Collapsible key={item.title} defaultOpen className='group/collapsible'>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.options.map((option) => (
                          <SidebarMenuSubItem key={option.title}>
                            <a href={option.url} className='flex items-center gap-2'>
                              <option.icon size={16} />
                              <span>{option.title}</span>
                            </a>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SideBarComponent>
  );
}

export function NavBar() {
  return (
    <div className='w-full h-10 bg-[#848f4b] flex items-center'>
      <SideBar />
    </div>
  );
}
