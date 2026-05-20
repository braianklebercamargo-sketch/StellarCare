import { ReactNode } from "react";
import { ViewState } from "../types";
import { Activity, UserPlus, Home, User, Globe, Moon, Sun } from "lucide-react";
interface LayoutProps {
  children: ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}
export function Layout({ children, currentView, setView }: LayoutProps) {
  const navItems = [
    { id: "landing" as ViewState, label: "Página Inicial", icon: Globe },
    { id: "dashboard" as ViewState, label: "Painel de Controle", icon: Home },
    { id: "register" as ViewState, label: "Admitir Paciente", icon: UserPlus },
    {
      id: "evolution" as ViewState,
      label: "Gera Evo. De Enfermagem",
      icon: Activity,
    },
  ];
  return (
    <div className="bg-[var(--bg-page)] text-[var(--black)] font-sans min-h-screen md:h-screen w-full flex flex-col md:flex-row md:overflow-hidden md:p-6 md:gap-6 antialiased">
      {" "}
      {}{" "}
      <header className="md:hidden bg-white border-b border-[#E4EAF4] p-4 flex justify-between items-center sticky top-0 z-10 shadow-[var(--shadow-xs)]">
        {" "}
        <div className="flex items-center gap-2">
          {" "}
          <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center shadow-[var(--shadow-md)] shadow-teal-500/10">
            {" "}
            <Activity className="w-5 h-5 text-white" />{" "}
          </div>{" "}
          <div>
            {" "}
            <h1 className="font-bold text-base tracking-tight text-[var(--black)]">
              StellarCare
            </h1>{" "}
            <span className="text-[9px] text-[var(--primary)] font-sans font-semibold tracking-wider font-semibold block leading-none uppercase">
              Clínica & Assistência
            </span>{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex items-center gap-2">
          {" "}
          <div className="flex items-center gap-2 text-xs font-sans font-semibold bg-[var(--gray-100)] border border-[#E4EAF4]/ px-3 py-1.5 rounded-full text-[var(--gray-700)]">
            {" "}
            <User className="w-3.5 h-3.5 text-[var(--primary)]" />{" "}
            <span>Téc. Roberto</span>{" "}
          </div>{" "}
        </div>{" "}
      </header>{" "}
      {}{" "}
      <nav className="hidden md:flex w-68 bg-white border border-[#E4EAF4] rounded-[var(--radius-xl)] flex-col py-8 px-4 gap-8 shadow-[0_4px_30px_rgba(15,23,42,0.02)]">
        {" "}
        {}{" "}
        <div className="flex items-center justify-between gap-3 px-2">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <div className="w-10 h-10 bg-[var(--primary)] rounded-xl flex items-center justify-center shadow-[0_4px_15px_rgba(13,148,136,0.25)]">
              {" "}
              <Activity className="w-6 h-6 text-white" />{" "}
            </div>{" "}
            <div>
              {" "}
              <h1 className="font-bold text-lg font-sans font-extrabold tracking-tight text-[var(--black)] leading-tight">
                StellarCare
              </h1>{" "}
              <p className="text-[9px] text-[var(--primary)] font-sans font-semibold uppercase tracking-widest font-semibold">
                Registro Assistencial
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <div className="bg-[var(--gray-100)] border border-[#E4EAF4] p-4 rounded-[var(--radius-xl)] flex items-center gap-3">
          {" "}
          <div className="w-10 h-10 rounded-full border border-teal-500/20 p-0.5">
            {" "}
            <div className="w-full h-full rounded-full bg-[var(--primary-light)]/50 flex items-center justify-center">
              {" "}
              <User className="w-5 h-5 text-[var(--primary)]" />{" "}
            </div>{" "}
          </div>{" "}
          <div className="overflow-hidden">
            {" "}
            <p className="text-sm font-bold text-[var(--black)] truncate">
              Roberto Silva
            </p>{" "}
            <p className="text-[10px] text-[var(--gray-500)] font-sans font-semibold uppercase tracking-wider truncate">
              COREN-SP 214.992
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <div className="flex-1 flex flex-col gap-1.5">
          {" "}
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 ${isActive ? "bg-[var(--primary-light)]/70 text-[var(--primary-hover)] border-l-4 border-l-teal-600 font-semibold shadow-[var(--shadow-xs)]" : "text-[var(--gray-500)] hoverhoverhover:text-[var(--black)] hoverhover:text-slate-100 hoverhoverhover:bg-[var(--gray-100)]  border-l-4 border-l-transparent"}`}
              >
                {" "}
                <Icon
                  className={`w-4.5 h-4.5 ${isActive ? "text-[var(--primary)]" : "opacity-70"}`}
                />{" "}
                <span className="text-sm">{item.label}</span>{" "}
              </button>
            );
          })}{" "}
        </div>{" "}
        {}{" "}
        <div className="mt-auto px-2 border-t border-[#E4EAF4] pt-4">
          {" "}
          <div className="flex items-center justify-between text-[9px] uppercase font-sans font-semibold text-[var(--gray-500)]">
            {" "}
            <span>Assinatura Digital</span>{" "}
            <span className="text-[var(--primary)] font-bold flex items-center gap-1">
              {" "}
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span>{" "}
              ATIVO{" "}
            </span>{" "}
          </div>{" "}
        </div>{" "}
      </nav>{" "}
      {}{" "}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0 scrollbar-hide py-4 px-2 md:py-0 md:px-0">
        {" "}
        {children}{" "}
      </main>{" "}
      {}{" "}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E4EAF4] flex justify-around p-2 z-20 shadow-[var(--shadow-lg)]">
        {" "}
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center p-1 rounded-xl min-w-[70px] ${isActive ? "text-[var(--primary)]" : "text-[var(--gray-500)]"}`}
            >
              {" "}
              <div
                className={`p-1.5 rounded-lg mb-1 ${isActive ? "bg-[var(--primary-light)]/ text-[var(--primary)] border border-[var(--primary-mid)]" : ""}`}
              >
                {" "}
                <Icon className={`w-4.5 h-4.5`} />{" "}
              </div>{" "}
              <span
                className={`text-[10px] ${isActive ? "font-semibold" : "font-medium"}`}
              >
                {" "}
                {item.label}{" "}
              </span>{" "}
            </button>
          );
        })}{" "}
      </nav>{" "}
    </div>
  );
}
