
import * as React from "react";
import { createContext, useContext, useEffect, useState } from 'react';
import { ChevronRight, Menu } from 'lucide-react';
import { cn } from "@/lib/utils";

type SidebarContextValue = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggleCollapsed: () => void;
  collapsedWidth: number;
  setCollapsedWidth: (width: number) => void;
};

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
  collapsedWidth?: number;
}

export function SidebarProvider({
  children,
  defaultCollapsed = false,
  collapsedWidth = 56,
}: SidebarProviderProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [width, setCollapsedWidth] = useState(collapsedWidth);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        toggleCollapsed,
        collapsedWidth: width,
        setCollapsedWidth: setCollapsedWidth,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

interface SidebarProps {
  children?: React.ReactNode;
  className?: string;
  collapsible?: boolean;
}

export function Sidebar({ children, className, collapsible }: SidebarProps) {
  return (
    <aside 
      className={cn(
        "flex h-screen flex-col overflow-y-auto border-r border-gray-200 bg-white transition-all duration-300 ease-in-out",
        className
      )}
    >
      {children}
    </aside>
  );
}

export function SidebarTrigger({ className }: { className?: string }) {
  const { toggleCollapsed } = useSidebar();
  return (
    <button
      onClick={toggleCollapsed}
      className={cn("p-2 rounded-md hover:bg-gray-100", className)}
      aria-label="Toggle sidebar"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 px-3 py-4">{children}</div>;
}

interface SidebarGroupProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SidebarGroup({ 
  children, 
  defaultOpen, 
  open: controlledOpen, 
  onOpenChange 
}: SidebarGroupProps) {
  const [open, setOpen] = useState(defaultOpen || false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : open;

  const handleToggle = () => {
    if (!isControlled) {
      setOpen(!open);
    }
    onOpenChange?.(!isOpen);
  };

  return (
    <div className="mb-4">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === SidebarGroupLabel) {
            return React.cloneElement(child as React.ReactElement<any>, {
              onClick: handleToggle,
              open: isOpen,
            });
          }
          if (child.type === SidebarGroupContent) {
            return isOpen ? child : null;
          }
          return child;
        }
        return child;
      })}
    </div>
  );
}

interface SidebarGroupLabelProps {
  children: React.ReactNode;
  onClick?: () => void;
  open?: boolean;
}

export function SidebarGroupLabel({ children, onClick, open }: SidebarGroupLabelProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between px-2 py-2 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 rounded-md"
    >
      {children}
      {onClick && (
        <ChevronRight
          className={cn(
            "h-4 w-4 text-gray-500 transition-transform duration-200",
            open && "transform rotate-90"
          )}
        />
      )}
    </div>
  );
}

export function SidebarGroupContent({ children }: { children: React.ReactNode }) {
  return <div className="pl-2 mt-1">{children}</div>;
}

export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1">{children}</div>;
}

export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

interface SidebarMenuButtonProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export function SidebarMenuButton({ children, className, asChild = false }: SidebarMenuButtonProps) {
  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      className: cn("w-full text-sm text-gray-700 flex items-center px-2 py-2 rounded-md", className),
    });
  }
  
  return (
    <button className={cn("w-full text-sm text-gray-700 flex items-center px-2 py-2 rounded-md", className)}>
      {children}
    </button>
  );
}
