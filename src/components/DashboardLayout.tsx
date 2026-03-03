import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  GraduationCap, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  School as SchoolIcon,
  ClipboardList
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
  key?: string;
}

const SidebarItem = ({ icon: Icon, label, href, active, collapsed }: SidebarItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
      active 
        ? "bg-kenya-green text-white shadow-md shadow-kenya-green/20" 
        : "text-slate-600 hover:bg-kenya-green/5 hover:text-kenya-green"
    )}
  >
    <Icon size={20} className={cn(active ? "text-white" : "text-slate-400 group-hover:text-kenya-green")} />
    {!collapsed && <span className="font-medium">{label}</span>}
    {!collapsed && active && <ChevronRight size={16} className="ml-auto" />}
  </Link>
);

export const DashboardLayout = ({ children, role }: { children: React.ReactNode, role: string }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/', roles: ['super_admin', 'principal', 'teacher', 'student'] },
    { icon: SchoolIcon, label: 'Schools', href: '/schools', roles: ['super_admin'] },
    { icon: Users, label: 'Teachers', href: '/teachers', roles: ['principal'] },
    { icon: GraduationCap, label: 'Students', href: '/students', roles: ['principal', 'teacher'] },
    { icon: BookOpen, label: 'Subjects', href: '/subjects', roles: ['principal'] },
    { icon: ClipboardList, label: 'Exams', href: '/exams', roles: ['principal', 'teacher'] },
    { icon: FileText, label: 'Marks Entry', href: '/marks', roles: ['principal', 'teacher'] },
    { icon: FileText, label: 'Reports', href: '/reports', roles: ['principal', 'teacher', 'student'] },
    { icon: Settings, label: 'Settings', href: '/settings', roles: ['super_admin', 'principal', 'teacher', 'student'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transition-all duration-300 lg:static lg:translate-x-0",
          collapsed ? "w-20" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="h-20 flex items-center px-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-kenya-green rounded-xl flex items-center justify-center text-white shadow-lg shadow-kenya-green/20">
                <GraduationCap size={24} />
              </div>
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 leading-tight">Alakara KNEC</span>
                  <span className="text-[10px] text-kenya-red font-bold tracking-widest uppercase">National Analytics</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {filteredItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={location.pathname === item.href}
                collapsed={collapsed}
              />
            ))}
          </nav>

          {/* User Profile / Logout */}
          <div className="p-4 border-t border-slate-100">
            <button 
              onClick={() => navigate('/login')}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-600 hover:bg-kenya-red/5 hover:text-kenya-red transition-all duration-200",
                collapsed && "justify-center"
              )}
            >
              <LogOut size={20} />
              {!collapsed && <span className="font-medium">Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileOpen(true)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden"
            >
              <Menu size={24} />
            </button>
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg hidden lg:block"
            >
              {collapsed ? <ChevronRight size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-semibold text-slate-800 hidden sm:block">
              {menuItems.find(item => item.href === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end hidden md:flex">
              <span className="text-sm font-semibold text-slate-900">John Doe</span>
              <span className="text-[10px] text-kenya-green font-bold uppercase tracking-wider">{role.replace('_', ' ')}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-kenya-green/10 border-2 border-white shadow-sm flex items-center justify-center text-kenya-green font-bold">
              JD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};
