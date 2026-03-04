import React, { useState, useEffect } from 'react';
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
  ClipboardList,
  Bell,
  MessageSquare,
  User
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabase } from '../lib/supabase';
import { supabaseService } from '../services/supabaseService';
import { Profile } from '../types';

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

export const DashboardLayout = ({ children, role, onLogout }: { children: React.ReactNode, role: string, onLogout: () => void }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const userProfile = await supabaseService.getProfile(session.user.id);
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/', roles: ['super_admin', 'principal', 'teacher', 'student'] },
    { icon: SchoolIcon, label: 'Schools', href: '/schools', roles: ['super_admin'] },
    { icon: Users, label: 'Teachers', href: '/teachers', roles: ['principal'] },
    { icon: GraduationCap, label: 'Students', href: '/students', roles: ['principal', 'teacher'] },
    { icon: ClipboardList, label: 'Classes', href: '/classes', roles: ['principal'] },
    { icon: BookOpen, label: 'Subjects', href: '/subjects', roles: ['principal'] },
    { icon: ClipboardList, label: 'Exams', href: '/exams', roles: ['principal', 'teacher'] },
    { icon: FileText, label: 'Marks Entry', href: '/marks', roles: ['principal', 'teacher'] },
    { icon: FileText, label: 'Reports', href: '/reports', roles: ['principal', 'student'] },
    { icon: BookOpen, label: 'Resources', href: '/resources', roles: ['super_admin', 'principal', 'teacher', 'student'] },
    { icon: Settings, label: 'Settings', href: '/settings', roles: ['super_admin', 'principal', 'teacher', 'student'] },
  ];

  const notifications = [
    { id: 1, from: 'Principal', message: 'Staff meeting at 2 PM today.', time: '10 mins ago' },
    { id: 2, from: 'Super Admin', message: 'System maintenance scheduled for Sunday.', time: '2 hours ago' },
    { id: 3, from: 'Principal', message: 'Please submit Term 1 marks by Friday.', time: '1 day ago' },
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
              onClick={handleLogout}
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
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative transition-colors"
              >
                <Bell size={22} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-kenya-red rounded-full border-2 border-white"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 z-[60] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <span className="font-bold text-slate-900">Notifications</span>
                    <span className="text-[10px] bg-kenya-red text-white px-2 py-0.5 rounded-full font-bold">3 NEW</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-kenya-green/10 text-kenya-green flex items-center justify-center shrink-0">
                            <MessageSquare size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">Message from {n.from}</p>
                            <p className="text-xs text-slate-600 mt-1 line-clamp-2">{n.message}</p>
                            <p className="text-[10px] text-slate-400 mt-2 font-medium">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center bg-slate-50/50">
                    <button className="text-xs font-bold text-kenya-green hover:underline">View All Messages</button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                <div className="flex flex-col items-end hidden md:flex px-2">
                  <span className="text-sm font-semibold text-slate-900">{profile?.full_name || 'Loading...'}</span>
                  <span className="text-[10px] text-kenya-green font-bold uppercase tracking-wider">{role.replace('_', ' ')}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-kenya-green/10 border-2 border-white shadow-sm flex items-center justify-center text-kenya-green font-bold">
                  {profile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || '??'}
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 z-[60] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-sm font-bold text-slate-900">{profile?.full_name || 'User'}</p>
                    <p className="text-xs text-slate-500">{profile?.email || 'email@example.com'}</p>
                  </div>
                  <div className="p-2">
                    <Link 
                      to="/settings" 
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-50 hover:text-kenya-green transition-colors"
                    >
                      <User size={18} />
                      Profile Information
                    </Link>
                    <Link 
                      to="/settings" 
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-50 hover:text-kenya-green transition-colors"
                    >
                      <Settings size={18} />
                      Account Settings
                    </Link>
                  </div>
                  <div className="p-2 border-t border-slate-100">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-kenya-red hover:bg-rose-50 transition-colors"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
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
