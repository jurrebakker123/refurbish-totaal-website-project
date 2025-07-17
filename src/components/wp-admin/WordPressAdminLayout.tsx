import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Euro, 
  Image, 
  Users, 
  FormInput, 
  Palette, 
  BarChart3, 
  Settings,
  Menu,
  X,
  ChevronDown,
  Bell,
  Search,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WordPressAdminLayoutProps {
  children: React.ReactNode;
}

const WordPressAdminLayout: React.FC<WordPressAdminLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [contentSubmenuOpen, setContentSubmenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/wp-admin/dashboard',
      submenu: []
    },
    {
      title: 'Content',
      icon: FileText,
      path: '/wp-admin/content',
      submenu: [
        { title: 'Alle Pagina\'s', path: '/wp-admin/content/pages' },
        { title: 'Nieuwe Pagina', path: '/wp-admin/content/pages/new' },
        { title: 'Blog Posts', path: '/wp-admin/content/posts' },
        { title: 'Nieuwe Post', path: '/wp-admin/content/posts/new' },
        { title: 'Menu\'s', path: '/wp-admin/content/menus' },
        { title: 'Widgets', path: '/wp-admin/content/widgets' }
      ]
    },
    {
      title: 'Prijzen',
      icon: Euro,
      path: '/wp-admin/prices',
      submenu: []
    },
    {
      title: 'Media',
      icon: Image,
      path: '/wp-admin/media',
      submenu: []
    },
    {
      title: 'Gebruikers',
      icon: Users,
      path: '/wp-admin/users',
      submenu: []
    },
    {
      title: 'Formulieren',
      icon: FormInput,
      path: '/wp-admin/forms',
      submenu: []
    },
    {
      title: 'Vormgeving',
      icon: Palette,
      path: '/wp-admin/appearance',
      submenu: []
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      path: '/wp-admin/analytics',
      submenu: []
    },
    {
      title: 'Instellingen',
      icon: Settings,
      path: '/wp-admin/settings',
      submenu: []
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* WordPress Admin Bar */}
      <div className="bg-gray-900 text-white h-8 flex items-center justify-between px-4 text-sm">
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-blue-300">
            RefurbishTotaalNederland.nl
          </Link>
          <span className="text-gray-400">|</span>
          <span>WordPress Admin</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-white hover:text-blue-300 h-6 px-2"
          >
            Bekijk Website
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={cn(
          "bg-white border-r border-gray-200 min-h-screen transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-64"
        )}>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {!sidebarCollapsed && (
              <h1 className="text-xl font-bold text-gray-800">RefurbishCMS</h1>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="py-4">
            {menuItems.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors",
                    isActive(item.path) && "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  )}
                  onClick={() => {
                    if (item.title === 'Content') {
                      setContentSubmenuOpen(!contentSubmenuOpen);
                    }
                  }}
                >
                  <item.icon className={cn("h-5 w-5", !sidebarCollapsed && "mr-3")} />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {item.submenu.length > 0 && (
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform",
                          contentSubmenuOpen && "rotate-180"
                        )} />
                      )}
                    </>
                  )}
                </Link>

                {/* Submenu */}
                {!sidebarCollapsed && item.submenu.length > 0 && contentSubmenuOpen && item.title === 'Content' && (
                  <div className="bg-gray-50">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={cn(
                          "block px-12 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors",
                          isActive(subItem.path) && "bg-blue-50 text-blue-600"
                        )}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Zoek in admin..."
                  className="pl-10 w-96"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Nieuw
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="text-sm font-medium">Admin</span>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordPressAdminLayout;