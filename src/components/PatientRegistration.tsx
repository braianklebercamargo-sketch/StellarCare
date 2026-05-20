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
      {" "}
      <div className="flex flex-col gap-1">
        {" "}
        <h1 className="text-2xl font-sans font-extrabold font-bold text-[var(--black)] tracking-tight">
          Admitir Novo Paciente
        </h1>{" "}
        <p className="text-[var(--gray-500)] text-[10px] font-sans font-semibold uppercase tracking-widest leading-none">
          Formulário de Entrada
        </p>{" "}
      </div>{" "}
      <div className="bg-white border border-[#E4EAF4] rounded-[var(--radius-xl)] p-6 md:p-8 shadow-[0_4px_30px_rgba(15,23,42,0.02)]">
        {" "}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {" "}
          <div className="space-y-2">
            {" "}
            <label className="block text-[10px] uppercase font-sans font-semibold tracking-widest text-[var(--gray-500)]">
              Nome Completo do Paciente
            </label>{" "}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              className="w-full bg-[var(--gray-100)]/50/ border border-[#E4EAF4]/ rounded-[var(--radius-xl)] px-4 py-3 text-[var(--black)] outline-none focushoverhover:bg-white hoverhover:bg-white focus:ring-1 focus:ring-teal-500 focushoverhover:border-teal-500 transition-all font-sans text-sm placeholder-slate-400"
              placeholder="Ex: Maria de Lourdes e Silva"
            />{" "}
          </div>{" "}
          <div className="grid grid-cols-2 gap-6">
            {" "}
            <div className="space-y-2">
              {" "}
              <label className="block text-[10px] uppercase font-sans font-semibold tracking-widest text-[var(--gray-500)]">
                Idade (Anos)
              </label>{" "}
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                required
                className="w-full bg-[var(--gray-100)]/50/ border border-[#E4EAF4]/ rounded-[var(--radius-xl)] px-4 py-3 text-[var(--black)] outline-none focushoverhover:bg-white hoverhover:bg-white focus:ring-1 focus:ring-teal-500 focushoverhover:border-teal-500 transition-all font-sans font-semibold text-sm placeholder-slate-400"
                placeholder="Ex: 65"
              />{" "}
            </div>{" "}
            <div className="space-y-2">
              {" "}
              <label className="block text-[10px] uppercase font-sans font-semibold tracking-widest text-[var(--gray-500)]">
                Leito / Quarto
              </label>{" "}
              <input
                value={bed}
                onChange={(e) => setBed(e.target.value)}
                type="text"
                required
                className="w-full bg-[var(--gray-100)]/50/ border border-[#E4EAF4]/ rounded-[var(--radius-xl)] px-4 py-3 text-[var(--black)] outline-none focushoverhover:bg-white hoverhover:bg-white focus:ring-1 focus:ring-teal-500 focushoverhover:border-teal-500 transition-all font-sans font-semibold text-sm uppercase placeholder-slate-400"
                placeholder="Ex: Q-204 ou L-10"
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="space-y-2">
            {" "}
            <label className="block text-[10px] uppercase font-sans font-semibold tracking-widest text-[var(--gray-500)]">
              Diagnóstico Admissional / Queixa
            </label>{" "}
            <textarea
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full bg-[var(--gray-100)]/50/ border border-[#E4EAF4]/ rounded-[var(--radius-xl)] px-4 py-3 text-[var(--black)] outline-none focushoverhover:bg-white hoverhover:bg-white focus:ring-1 focus:ring-teal-500 focushoverhover:border-teal-500 resize-none h-28 transition-all font-sans text-sm placeholder-slate-400"
              placeholder="Descreva brevemente o principal diagnóstico de admissão ou o motivo da queixa médica atual..."
            ></textarea>{" "}
          </div>{" "}
          <div className="pt-4">
            {" "}
            <button className="w-full bg-[var(--primary)] hoverhoverhover:bg-teal-700 text-white font-semibold font-sans tracking-wide py-4 rounded-[var(--radius-xl)] shadow-[var(--shadow-md)] shadow-teal-500/10 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer">
              {" "}
              <UserPlus className="w-5 h-5 text-teal-100" /> CONFIRMAR ADMISSÃO
              CLÍNICA{" "}
            </button>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
}
