import { ReactNode } from "react";
import { ViewState } from "../types";
import { Activity, UserPlus, Home, User, Globe, Moon, Sun } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function Layout({ children, currentView, setView, theme, toggleTheme }: LayoutProps) {
  const navItems = [
    { id: "landing" as ViewState, label: "Página Inicial", icon: Globe },
    { id: "dashboard" as ViewState, label: "Painel de Controle", icon: Home },
    { id: "register" as ViewState, label: "Admitir Paciente", icon: UserPlus },
    { id: "evolution" as ViewState, label: "Gera Evo. De Enfermagem", icon: Activity },
  ];

  return (
    <div className="bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans min-h-screen md:h-screen w-full flex flex-col md:flex-row md:overflow-hidden md:p-6 md:gap-6 antialiased">
      {/* Mobile Header */}
      <header className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center sticky top-0 z-10 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center shadow-md shadow-teal-500/10">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-slate-900 dark:text-white">StellarCare</h1>
            <span className="text-[9px] text-teal-600 font-mono tracking-wider font-semibold block leading-none uppercase">Clínica & Assistência</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="p-1.5 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/85 px-3 py-1.5 rounded-full text-slate-700 dark:text-slate-200">
            <User className="w-3.5 h-3.5 text-teal-600" />
            <span>Téc. Roberto</span>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex w-68 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex-col py-8 px-4 gap-8 shadow-[0_4px_30px_rgba(15,23,42,0.02)]">
        {/* Header/Logo */}
        <div className="flex items-center justify-between gap-3 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center shadow-[0_4px_15px_rgba(13,148,136,0.25)]">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg font-serif tracking-tight text-slate-950 dark:text-white leading-tight">StellarCare</h1>
              <p className="text-[9px] text-teal-600 font-mono uppercase tracking-widest font-semibold">Registro Assistencial</p>
            </div>
          </div>
          <button onClick={toggleTheme} className="p-2 rounded-xl text-slate-400 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* User Card */}
        <div className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-teal-500/20 p-0.5">
            <div className="w-full h-full rounded-full bg-teal-50/50 flex items-center justify-center">
              <User className="w-5 h-5 text-teal-600" />
            </div>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">Roberto Silva</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider truncate">COREN-SP 214.992</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 ${
                  isActive
                    ? "bg-teal-50/70 text-teal-700 dark:text-teal-300 border-l-4 border-l-teal-600 font-semibold shadow-xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 border-l-4 border-l-transparent"
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? "text-teal-600" : "opacity-70"}`} />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer/Status */}
        <div className="mt-auto px-2 border-t border-slate-100 dark:border-slate-800 pt-4">
           <div className="flex items-center justify-between text-[9px] uppercase font-mono text-slate-400 dark:text-slate-400">
             <span>Assinatura Digital</span>
             <span className="text-teal-600 font-bold flex items-center gap-1">
               <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> ATIVO
             </span>
           </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0 scrollbar-hide py-4 px-2 md:py-0 md:px-0">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex justify-around p-2 z-20 shadow-lg">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center p-1 rounded-xl min-w-[70px] ${
                isActive ? "text-teal-600" : "text-slate-400 dark:text-slate-400"
              }`}
            >
              <div className={`p-1.5 rounded-lg mb-1 ${isActive ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 border border-teal-100" : ""}`}>
                <Icon className={`w-4.5 h-4.5`} />
              </div>
              <span className={`text-[10px] ${isActive ? "font-semibold" : "font-medium"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
