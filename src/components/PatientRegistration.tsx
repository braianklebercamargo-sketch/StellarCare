import { UserPlus } from "lucide-react";
import { useState, FormEvent } from "react";
import { Patient } from "../types";

interface PatientRegistrationProps {
  onRegister: (patient: Patient) => void;
}

export function PatientRegistration({ onRegister }: PatientRegistrationProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bed, setBed] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !age || !bed) return;
    
    onRegister({
      id: Math.random().toString(36).substring(2, 9),
      name,
      age: parseInt(age),
      bed,
      diagnosis,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl mx-auto md:p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">Admitir Novo Paciente</h1>
        <p className="text-slate-400 dark:text-slate-400 text-[10px] font-mono uppercase tracking-widest leading-none">Formulário de Entrada // Ficha Clínico-Hospitalar</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-[0_4px_30px_rgba(15,23,42,0.02)]">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-[10px] uppercase font-mono tracking-widest text-slate-500 dark:text-slate-400">Nome Completo do Paciente</label>
            <input 
              value={name} onChange={e => setName(e.target.value)}
              type="text" required
              className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/90 rounded-2xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all font-sans text-sm placeholder-slate-400" placeholder="Ex: Maria de Lourdes e Silva" />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] uppercase font-mono tracking-widest text-slate-500 dark:text-slate-400">Idade (Anos)</label>
              <input 
                value={age} onChange={e => setAge(e.target.value)}
                type="number" required
                className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/90 rounded-2xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all font-mono text-sm placeholder-slate-400" placeholder="Ex: 65" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] uppercase font-mono tracking-widest text-slate-500 dark:text-slate-400">Leito / Quarto</label>
              <input 
                value={bed} onChange={e => setBed(e.target.value)}
                type="text" required
                className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/90 rounded-2xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all font-mono text-sm uppercase placeholder-slate-400" placeholder="Ex: Q-204 ou L-10" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-[10px] uppercase font-mono tracking-widest text-slate-500 dark:text-slate-400">Diagnóstico Admissional / Queixa</label>
            <textarea 
              value={diagnosis} onChange={e => setDiagnosis(e.target.value)}
              className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/90 rounded-2xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 resize-none h-28 transition-all font-sans text-sm placeholder-slate-400" placeholder="Descreva brevemente o principal diagnóstico de admissão ou o motivo da queixa médica atual..."></textarea>
          </div>
          
          <div className="pt-4">
            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold font-sans tracking-wide py-4 rounded-2xl shadow-md shadow-teal-500/10 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer">
              <UserPlus className="w-5 h-5 text-teal-100" />
              CONFIRMAR ADMISSÃO CLÍNICA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
