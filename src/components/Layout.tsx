import { ReactNode } from "react";
import { ViewState } from "../types";
import { Activity, UserPlus, Home, User, Globe } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export function Layout({ children, currentView, setView }: LayoutProps) {
  const navItems = [
    { id: "landing" as ViewState, label: "Página Inicial", icon: Globe },
    { id: "dashboard" as ViewState, label: "Dashboard", icon: Home },
    { id: "register" as ViewState, label: "Registrar Paciente", icon: UserPlus },
    { id: "evolution" as ViewState, label: "Evolução", icon: Activity },
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100 font-sans min-h-screen md:h-screen w-full flex flex-col md:flex-row md:overflow-hidden md:p-6 md:gap-6 antialiased">
      {/* Mobile Header */}
      <header className="md:hidden bg-zinc-900 border-b border-zinc-800 p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-bold text-lg tracking-tight text-zinc-100">StellarCare</h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-zinc-800/50 border border-zinc-700 px-3 py-1.5 rounded-full text-zinc-300">
          <User className="w-3.5 h-3.5" />
          <span>Téc. Enf</span>
        </div>
      </header>

      {/* Desktop Sidebar (Bento Style) */}
      <nav className="hidden md:flex w-64 bg-zinc-900/50 border border-zinc-800 rounded-3xl flex-col py-8 px-4 gap-8">
        {/* Header/Logo */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight text-zinc-100">StellarCare</h1>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Simulação Web3</p>
          </div>
        </div>

        {/* User Card */}
        <div className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-indigo-500/30 p-0.5">
            <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center">
              <User className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-zinc-200 truncate">Roberto Silva</p>
            <p className="text-xs text-zinc-500 font-mono truncate">Técnico em Enf.</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  isActive
                    ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-[inset_0_0_20px_rgba(79,70,229,0.05)]"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 border border-transparent"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-indigo-400" : "opacity-70"}`} />
                <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer/Status */}
        <div className="mt-auto px-2">
           <div className="flex items-center justify-between text-[10px] uppercase font-mono text-zinc-500">
             <span>Blockchain</span>
             <span className="text-emerald-500 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ACTIVE</span>
           </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0 scrollbar-hide py-4 px-2 md:py-0 md:px-0">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around p-2 z-20">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center p-2 rounded-xl min-w-[70px] ${
                isActive ? "text-indigo-400" : "text-zinc-500"
              }`}
            >
              <div className={`p-1.5 rounded-lg mb-1 ${isActive ? "bg-indigo-600/20 border border-indigo-500/20" : ""}`}>
                <Icon className={`w-5 h-5`} />
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
