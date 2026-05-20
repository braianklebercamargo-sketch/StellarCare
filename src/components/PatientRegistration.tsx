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
        <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Cadastro de Paciente</h1>
        <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest text-[11px]">Registro // Simulação Workspace</p>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-500">Nome Completo</label>
            <input 
              value={name} onChange={e => setName(e.target.value)}
              type="text" required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-zinc-100 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-sans text-sm" placeholder="Nome do paciente simulado" />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-500">Idade (Anos)</label>
              <input 
                value={age} onChange={e => setAge(e.target.value)}
                type="number" required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-zinc-100 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-mono text-sm" placeholder="Ex: 45" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-500">Leito</label>
              <input 
                value={bed} onChange={e => setBed(e.target.value)}
                type="text" required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-zinc-100 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-mono text-sm uppercase" placeholder="Ex: 104-A" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-500">Diagnóstico Inicial</label>
            <textarea 
              value={diagnosis} onChange={e => setDiagnosis(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-zinc-100 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none h-28 transition-all font-sans text-sm" placeholder="Resumo do quadro na admissão..."></textarea>
          </div>
          
          <div className="pt-4">
            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold tracking-wide py-4 rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.2)] transition-all flex items-center justify-center gap-3">
              <UserPlus className="w-5 h-5 text-indigo-200" />
              INSERIR REGISTRO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
