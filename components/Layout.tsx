import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, Server, Bell, Info, Menu, X, Shield } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  // Hide sidebar on landing page
  if (location.pathname === '/') {
    return <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">{children}</div>;
  }

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/devices', label: 'Device Management', icon: Server },
    { path: '/alerts', label: 'Alerts & Logs', icon: Bell },
    { path: '/about', label: 'About Project', icon: Info },
  ];

  return (
    <div className="flex h-screen bg-black text-zinc-300 font-sans overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:w-72 flex-col bg-zinc-950/50 border-r border-white/10 backdrop-blur-xl">
        <NavLink to="/" className="flex items-center gap-3 p-8 hover:bg-white/5 transition-colors">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-900/20">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">NetGuard</h1>
            <p className="text-xs text-zinc-500">System Online</p>
          </div>
        </NavLink>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${isActive
                  ? 'bg-zinc-800/80 text-white shadow-inner shadow-white/5 border border-white/5'
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50'
                }`
              }
            >
              <item.icon className={`h-5 w-5 transition-colors ${location.pathname === item.path ? 'text-indigo-400' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 m-4 rounded-xl bg-gradient-to-b from-zinc-900 to-black border border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 border border-white/5">
              AD
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-200">Admin User</p>
              <p className="text-xs text-zinc-600">Network Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-black relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #3f3f46 1px, transparent 0)', backgroundSize: '24px 24px' }}>
        </div>

        <header className="md:hidden flex items-center justify-between p-4 bg-zinc-950/80 backdrop-blur-md border-b border-white/10 z-20">
          <NavLink to="/" className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-indigo-500" />
            <span className="font-bold text-lg text-white">NetGuard</span>
          </NavLink>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-zinc-400">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-zinc-900 text-white z-10 shadow-2xl border-b border-zinc-800">
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg ${isActive ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 z-10 relative">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};