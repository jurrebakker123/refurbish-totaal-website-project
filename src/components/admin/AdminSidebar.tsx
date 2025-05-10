
import React from 'react';
import { Database, Calculator, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const AdminSidebar = () => {
  const { collapsed } = useSidebar();
  
  return (
    <Sidebar
      className={collapsed ? "w-14 border-r border-gray-200" : "w-60 border-r border-gray-200"}
      collapsible
    >
      <SidebarContent>
        <SidebarGroup defaultOpen>
          <SidebarGroupLabel>Dakkapel Calculator</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-md">
                  <Calculator className="h-4 w-4 text-brand-darkGreen" />
                  {!collapsed && <span>Prijzen</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-md">
                  <Database className="h-4 w-4 text-brand-darkGreen" />
                  {!collapsed && <span>Opties</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-md">
                  <Settings className="h-4 w-4 text-brand-darkGreen" />
                  {!collapsed && <span>Instellingen</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
