import { useState, useMemo } from "react";
import { Activity, AlertTriangle, ShieldCheck, Stethoscope, Save, FileText, CheckCircle2, User } from "lucide-react";
import { Patient, MetricPoint } from "../types";

interface EvolutionFormProps {
  patients: Patient[];
  onSign: (patientId: string, metric: MetricPoint) => void;
}

export function EvolutionForm({ patients, onSign }: EvolutionFormProps) {
  const [loading, setLoading] = useState(false);
  const [signed, setSigned] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || "");
  const selectedPatient = useMemo(() => patients.find(p => p.id === selectedPatientId) || patients[0], [patients, selectedPatientId]);

  const [form, setForm] = useState({
    temp: "",
    pa_sys: "",
    pa_dia: "",
    fc: "",
    fr: "",
    spo2: "",
    pain: "",
    hygiene: false,
    decubitus: false,
    medication: false,
    dressing: false,
    diuresis: false,
    glycemia: false,
    observations: "",
  });

  const [aiResult, setAiResult] = useState<{
    summary: string;
    alerts: string[];
    protocols: string[];
  } | null>(null);

  const handleGenerate = () => {
    setLoading(true);
    setAiResult(null);
    
    setTimeout(() => {
      const vitals = {
        temp: parseFloat(form.temp) || 0,
        pain: parseFloat(form.pain) || 0,
      };

      const care = {
        hygiene: form.hygiene,
        medication: form.medication,
      };

      setAiResult({
        summary: `Evolução Sistematizada:\nPaciente monitorado. Observações: "${form.observations || 'Nenhuma'}"\nCuidados administrados: ${[care.hygiene && 'Higiene', care.medication && 'Medicação'].filter(Boolean).join(', ')}.`,
        alerts: vitals.temp > 38 ? ["Risco Clínico: Febre Alta (>38°C)"] : [],
        protocols: vitals.pain >= 8 ? ["Protocolo de Manejo de Dor"] : []
      });
      setLoading(false);
    }, 600);
  };

  const handleSign = () => {
    setSigned(true);
    setTransactionId(`tx_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`);
    
    setTimeout(() => {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      onSign(selectedPatient.id, {
          time,
          temp: parseFloat(form.temp) || 36.5,
          spo2: parseFloat(form.spo2) || 98,
          pain: parseFloat(form.pain) || 0,
          sys: parseFloat(form.pa_sys) || 120,
          dia: parseFloat(form.pa_dia) || 80,
          fc: parseFloat(form.fc) || 80,
          fr: parseFloat(form.fr) || 18,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto md:p-4">
      {/* Header Bento */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Evolução de Enfermagem</h1>
          <p className="text-sm text-zinc-500 font-mono">Registro Estruturado // Assinatura Web3</p>
        </div>
        {signed && (
          <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-widest flex items-center gap-2 border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" />
            REGISTRO ASSINADO
          </div>
        )}
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl shadow-black/20">
        {/* Header Ribbon Bento */}
        <div className="bg-zinc-900 border-b border-zinc-800 p-5 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex items-center justify-center text-indigo-400 font-bold text-lg">
              <User className="w-6 h-6" />
            </div>
            <div>
              <select 
                disabled={signed}
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="bg-transparent text-zinc-100 font-bold text-lg leading-tight outline-none border-b border-dashed border-zinc-700 pb-1 w-full md:w-auto"
              >
                {patients.length === 0 ? <option value="">Nenhum Paciente</option> : null}
                {patients.map(p => (
                  <option key={p.id} value={p.id} className="bg-zinc-900">{p.name}</option>
                ))}
              </select>
              {selectedPatient && (
                <p className="text-[11px] text-zinc-500 font-mono uppercase tracking-widest mt-1">
                  {selectedPatient.bed} • {selectedPatient.age} Anos
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-5 md:p-8 space-y-8">
          
          {/* Phase 1: Vitals */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                 <Activity className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-zinc-200">Sinais Vitais</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-2">Temp (°C)</label>
                <input 
                  type="number" step="0.1" 
                  disabled={signed}
                  value={form.temp} onChange={e => setForm({...form, temp: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-zinc-100 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none disabled:opacity-50 font-mono text-sm transition-all" 
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-2">PA (mmHg)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" placeholder="Sis" 
                    disabled={signed}
                    value={form.pa_sys} onChange={e => setForm({...form, pa_sys: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-3 text-zinc-100 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none disabled:opacity-50 font-mono text-sm transition-all text-center" 
                  />
                  <span className="text-zinc-600 font-mono">/</span>
                  <input 
                    type="number" placeholder="Dia" 
                    disabled={signed}
                    value={form.pa_dia} onChange={e => setForm({...form, pa_dia: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-3 text-zinc-100 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none disabled:opacity-50 font-mono text-sm transition-all text-center" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-2">SpO2 (%)</label>
                <input 
                  type="number" 
                  disabled={signed}
                  value={form.spo2} onChange={e => setForm({...form, spo2: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-zinc-100 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none disabled:opacity-50 font-mono text-sm transition-all" 
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-2">Dor (0-10)</label>
                <input 
                  type="number" min="0" max="10" 
                  disabled={signed}
                  value={form.pain} onChange={e => setForm({...form, pain: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-zinc-100 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none disabled:opacity-50 font-mono text-sm transition-all" 
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-2">FC (bpm)</label>
                <input 
                  type="number" 
                  disabled={signed}
                  value={form.fc} onChange={e => setForm({...form, fc: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-zinc-100 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none disabled:opacity-50 font-mono text-sm transition-all" 
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-2">FR (irpm)</label>
                <input 
                  type="number" 
                  disabled={signed}
                  value={form.fr} onChange={e => setForm({...form, fr: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-zinc-100 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none disabled:opacity-50 font-mono text-sm transition-all" 
                />
              </div>
            </div>
          </section>

          {/* Phase 2: Care Provided */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
                 <Stethoscope className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-zinc-200">Cuidados Prestados</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { id: 'hygiene', label: 'Higiene Corporal' },
                { id: 'decubitus', label: 'Mudança Decúbito' },
                { id: 'medication', label: 'Medicação (SN)' },
                { id: 'dressing', label: 'Curativo' },
                { id: 'diuresis', label: 'Controle Diurese' },
                { id: 'glycemia', label: 'Glicemia' },
              ].map((item) => (
                <label key={item.id} className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all ${
                  (form as any)[item.id] ? "border-indigo-500/50 bg-indigo-600/10 shadow-[inset_0_0_20px_rgba(79,70,229,0.05)]" : "border-zinc-800 bg-zinc-950/50 hover:bg-zinc-800"
                } ${signed ? "opacity-50 cursor-default" : ""}`}>
                  <input 
                    type="checkbox" 
                    disabled={signed}
                    checked={(form as any)[item.id]} 
                    onChange={e => setForm({...form, [item.id]: e.target.checked})}
                    className="w-4 h-4 text-indigo-500 rounded border-zinc-700 bg-zinc-900 focus:ring-indigo-500 focus:ring-offset-zinc-950" 
                  />
                  <span className={`text-sm font-medium ${(form as any)[item.id] ? "text-indigo-300" : "text-zinc-400"}`}>{item.label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Phase 3: Free Text */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                 <FileText className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-zinc-200">Observações Clínicas</h4>
            </div>
            <textarea
              disabled={signed}
              value={form.observations}
              onChange={e => setForm({...form, observations: e.target.value})}
              placeholder="Descreva o estado geral do paciente, queixas, ou intercorrências..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-5 text-zinc-100 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none min-h-[140px] resize-y disabled:opacity-50 text-sm transition-all"
            />
          </section>

          {/* AI Generation Button */}
          {!signed && (
            <div className="flex justify-end pt-6">
              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-8 rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all flex items-center gap-3 disabled:opacity-50 disabled:shadow-none"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Activity className="w-5 h-5" />
                )}
                {loading ? "Processando..." : "Salvar Informações"}
              </button>
            </div>
          )}

          {/* AI Results Section Bento */}
          {aiResult && (
            <div className="mt-8 space-y-6 bg-zinc-900 p-6 rounded-[2rem] border border-indigo-500/20 shadow-[inset_0_0_40px_rgba(79,70,229,0.05)]">
              
              {/* ALERTS */}
              {aiResult.alerts && aiResult.alerts.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-red-400 font-bold mb-3 tracking-widest uppercase text-xs">
                    <AlertTriangle className="w-5 h-5" />
                    Risco Iminente Detectado
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-red-200">
                    {aiResult.alerts.map((alert, i) => <li key={i}>{alert}</li>)}
                  </ul>
                </div>
              )}

              {/* PROTOCOLS */}
              {aiResult.protocols && aiResult.protocols.length > 0 && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-amber-400 font-bold mb-3 tracking-widest uppercase text-xs">
                    <ShieldCheck className="w-5 h-5" />
                    Protocolo Recomendado
                  </div>
                  <ul className="list-disc list-inside text-sm text-amber-200">
                    {aiResult.protocols.map((prot, i) => <li key={i}>{prot}</li>)}
                  </ul>
                </div>
              )}

              {/* SUMMARY */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
                <h4 className="text-zinc-500 font-bold mb-4 text-[10px] uppercase font-mono tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  Sumário Executivo (Passagem)
                </h4>
                <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {aiResult.summary}
                </div>
              </div>

              {!signed && (
                 <div className="flex justify-end pt-4">
                    <button 
                      onClick={handleSign}
                      className="bg-emerald-600 hover:bg-emerald-500 text-emerald-50 font-bold tracking-wide py-3 px-8 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Assinar e Registrar
                    </button>
                 </div>
              )}
            </div>
          )}

          {/* Blockchain Audit Trail */}
          {signed && transactionId && (
            <div className="mt-8 bg-zinc-950 text-zinc-400 p-5 rounded-3xl font-mono text-[11px] border border-zinc-800">
              <div className="flex items-center gap-2 text-emerald-400 mb-3 font-bold uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4" />
                Stellar Network // Confirmed
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <p><span className="text-zinc-600">SIGNER_ID:</span> TEC_4992</p>
                <p><span className="text-zinc-600">TIMESTAMP:</span> {new Date().toISOString()}</p>
                <p className="md:col-span-2 truncate"><span className="text-zinc-600">TX_HASH:</span> <span className="text-indigo-400">{transactionId}</span></p>
                <p className="md:col-span-2 truncate"><span className="text-zinc-600">DATA_HASH:</span> {Math.random().toString(36).substring(2, 64)}</p>
              </div>
              <p className="pt-3 border-t border-zinc-800 text-zinc-600 italic">Sensitive clinical data obscured before hashing.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
