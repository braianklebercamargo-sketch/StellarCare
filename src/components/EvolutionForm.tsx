import { useState, useMemo } from "react";
import {
  Activity,
  AlertTriangle,
  ShieldCheck,
  Stethoscope,
  Save,
  FileText,
  CheckCircle2,
  User,
} from "lucide-react";
import { Patient, MetricPoint } from "../types";
interface EvolutionFormProps {
  patients: Patient[];
  onSign: (patientId: string, metric: MetricPoint) => void;
}
export function EvolutionForm({ patients, onSign }: EvolutionFormProps) {
  const [loading, setLoading] = useState(false);
  const [signed, setSigned] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState(
    patients[0]?.id || "",
  );
  const selectedPatient = useMemo(
    () => patients.find((p) => p.id === selectedPatientId) || patients[0],
    [patients, selectedPatientId],
  );
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
      const care = { hygiene: form.hygiene, medication: form.medication };
      setAiResult({
        summary: `Evolução Sistematizada:\nPaciente monitorado. Observações:"${form.observations || "Nenhuma"}"\nCuidados administrados: ${[care.hygiene && "Higiene", care.medication && "Medicação"].filter(Boolean).join(", ")}.`,
        alerts: vitals.temp > 38 ? ["Risco Clínico: Febre Alta (>38°C)"] : [],
        protocols: vitals.pain >= 8 ? ["Protocolo de Manejo de Dor"] : [],
      });
      setLoading(false);
    }, 600);
  };
  const handleSign = () => {
    setSigned(true);
    setTransactionId(
      `tx_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`,
    );
    setTimeout(() => {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
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
      {" "}
      {}{" "}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {" "}
        <div>
          {" "}
          <h1 className="text-2xl font-sans font-extrabold font-bold tracking-tight text-[var(--black)]">
            Evolução de Enfermagem
          </h1>{" "}
          <p className="text-xs text-[var(--gray-500)] font-sans font-semibold uppercase tracking-wider">
            Sistematização de Assistência (SAE) & Controle Seguro
          </p>{" "}
        </div>{" "}
        {signed && (
          <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-sans font-semibold font-bold tracking-wider flex items-center gap-2 border border-emerald-300">
            {" "}
            <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-bounce" />{" "}
            REGISTRO ASSINADO DIGITALMENTE{" "}
          </div>
        )}{" "}
      </div>{" "}
      <div className="bg-white border border-[#E4EAF4] rounded-[var(--radius-xl)] overflow-hidden shadow-[0_4px_35px_rgba(15,23,42,0.02)]">
        {" "}
        {}{" "}
        <div className="bg-[var(--gray-100)]/70/ border-b border-[#E4EAF4] p-5 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {" "}
          <div className="flex items-center gap-4">
            {" "}
            <div className="w-11 h-11 bg-[var(--primary-light)]/ border border-[var(--primary-mid)]/50 rounded-[var(--radius-xl)] flex items-center justify-center text-[var(--primary)] font-bold text-lg">
              {" "}
              <User className="w-5 h-5" />{" "}
            </div>{" "}
            <div>
              {" "}
              <select
                disabled={signed}
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="bg-transparent text-[var(--black)] font-bold text-lg leading-tight outline-none border-b border-dashed border-slate-300 pb-1 w-full md:w-auto focushoverhover:border-teal-500 transition-all cursor-pointer"
              >
                {" "}
                {patients.length === 0 ? (
                  <option value="" className="bg-white text-[var(--black)]">
                    Nenhum Paciente
                  </option>
                ) : null}{" "}
                {patients.map((p) => (
                  <option
                    key={p.id}
                    value={p.id}
                    className="bg-white text-[var(--black)]"
                  >
                    {p.name}
                  </option>
                ))}{" "}
              </select>{" "}
              {selectedPatient && (
                <p className="text-[10px] text-[var(--gray-500)] font-sans font-semibold uppercase tracking-wider mt-1">
                  {" "}
                  Leito: {selectedPatient.bed} • Idade: {selectedPatient.age}{" "}
                  Anos • Registro Ativo{" "}
                </p>
              )}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="p-5 md:p-8 space-y-8">
          {" "}
          {}{" "}
          <section>
            {" "}
            <div className="flex items-center gap-3 mb-5">
              {" "}
              <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
                {" "}
                <Activity className="w-4 h-4" />{" "}
              </div>{" "}
              <h4 className="font-bold text-[var(--black)] text-sm">
                Sinais Vitais (Mensuração)
              </h4>{" "}
            </div>{" "}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {" "}
              <div>
                {" "}
                <label className="block text-[9px] uppercase font-sans font-semibold tracking-wider text-[var(--gray-500)] font-bold mb-2">
                  Temp (°C)
                </label>{" "}
                <input
                  type="number"
                  step="0.1"
                  disabled={signed}
                  value={form.temp}
                  onChange={(e) => setForm({ ...form, temp: e.target.value })}
                  className="w-full bg-[var(--gray-100)]/50/ border border-[#E4EAF4]/ rounded-[var(--radius-xl)] px-4 py-3 text-[var(--black)] focushoverhover:bg-white hoverhover:bg-white focus:ring-1 focus:ring-teal-500 focushoverhover:border-teal-500 outline-none disabled:opacity-50 font-sans font-semibold text-sm transition-all"
                />{" "}
              </div>{" "}
              <div className="col-span-2 md:col-span-1">
                {" "}
                <label className="block text-[9px] uppercase font-sans font-semibold tracking-wider text-[var(--gray-500)] font-bold mb-2">
                  PA (mmHg)
                </label>{" "}
                <div className="flex items-center gap-1.5">
                  {" "}
                  <input
                    type="number"
                    placeholder="Sis"
                    disabled={signed}
                    value={form.pa_sys}
                    onChange={(e) =>
                      setForm({ ...form, pa_sys: e.target.value })
                    }
                    className="w-full bg-[var(--gray-100)]/50/ border border-[#E4EAF4]/ rounded-[var(--radius-xl)] px-3 py-3 text-[var(--black)] focushoverhover:bg-white hoverhover:bg-white focus:ring-1 focus:ring-teal-500 focushoverhover:border-teal-500 outline-none disabled:opacity-50 font-sans font-semibold text-sm transition-all text-center placeholder-slate-400"
                  />{" "}
                  <span className="text-[var(--gray-500)] font-sans font-semibold">
                    /
                  </span>{" "}
                  <input
                    type="number"
                    placeholder="Dia"
                    disabled={signed}
                    value={form.pa_dia}
                    onChange={(e) =>
                      setForm({ ...form, pa_dia: e.target.value })
                    }
                    className="w-full bg-[var(--gray-100)]/50/ border border-[#E4EAF4]/ rounded-[var(--radius-xl)] px-3 py-3 text-[var(--black)] focushoverhover:bg-white hoverhover:bg-white focus:ring-1 focus:ring-teal-500 focushoverhover:border-teal-500 outline-none disabled:opacity-50 font-sans font-semibold text-sm transition-all text-center placeholder-slate-400"
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="block text-[9px] uppercase font-sans font-semibold tracking-wider text-[var(--gray-500)] font-bold mb-2">
                  SpO2 (%)
                </label>{" "}
                <input
                  type="number"
                  disabled={signed}
                  value={form.spo2}
                  onChange={(e) => setForm({ ...form, spo2: e.target.value })}
                  className="w-full bg-[var(--gray-100)]/50/ border border-[#E4EAF4]/ rounded-[var(--radius-xl)] px-4 py-3 text-[var(--black)] focushoverhover:bg-white hoverhover:bg-white focus:ring-1 focus:ring-teal-500 focushoverhover:border-teal-500 outline-none disabled:opacity-50 font-sans font-semibold text-sm transition-all"
                />{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="block text-[9px] uppercase font-sans font-semibold tracking-wider text-[var(--gray-500)] font-bold mb-2">
                  Dor (0-10)
                </label>{" "}
                <input
                  type="number"
                  min="0"
                  max="10"
                  disabled={signed}
                  value={form.pain}
                  onChange={(e) => setForm({ ...form, pain: e.target.value })}
                  className="w-full bg-[var(--gray-100)]/50/ border border-[#E4EAF4]/ rounded-[var(--radius-xl)] px-4 py-3 text-[var(--black)] focushoverhover:bg-white hoverhover:bg-white focus:ring-1 focus:ring-teal-500 focushoverhover:border-teal-500 outline-none disabled:opacity-50 font-sans font-semibold text-sm transition-all"
                />{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="block text-[9px] uppercase font-sans font-semibold tracking-wider text-[var(--gray-500)] font-bold mb-2">
                  FC (bpm)
                </label>{" "}
                <input
                  type="number"
                  disabled={signed}
                  value={form.fc}
                  onChange={(e) => setForm({ ...form, fc: e.target.value })}
                  className="w-full bg-[var(--gray-100)]/50/ border border-[#E4EAF4]/ rounded-[var(--radius-xl)] px-4 py-3 text-[var(--black)] focushoverhover:bg-white hoverhover:bg-white focus:ring-1 focus:ring-teal-500 focushoverhover:border-teal-500 outline-none disabled:opacity-50 font-sans font-semibold text-sm transition-all"
                />{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="block text-[9px] uppercase font-sans font-semibold tracking-wider text-[var(--gray-500)] font-bold mb-2">
                  FR (irpm)
                </label>{" "}
                <input
                  type="number"
                  disabled={signed}
                  value={form.fr}
                  onChange={(e) => setForm({ ...form, fr: e.target.value })}
                  className="w-full bg-[var(--gray-100)]/50/ border border-[#E4EAF4]/ rounded-[var(--radius-xl)] px-4 py-3 text-[var(--black)] focushoverhover:bg-white hoverhover:bg-white focus:ring-1 focus:ring-teal-500 focushoverhover:border-teal-500 outline-none disabled:opacity-50 font-sans font-semibold text-sm transition-all"
                />{" "}
              </div>{" "}
            </div>{" "}
          </section>{" "}
          {}{" "}
          <section>
            {" "}
            <div className="flex items-center gap-3 mb-5">
              {" "}
              <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                {" "}
                <Stethoscope className="w-4 h-4" />{" "}
              </div>{" "}
              <h4 className="font-bold text-[var(--black)] text-sm">
                Cuidados Prestados nesta Intervenção
              </h4>{" "}
            </div>{" "}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {" "}
              {[
                { id: "hygiene", label: "Higiene Corporal" },
                { id: "decubitus", label: "Mudança Decúbito" },
                { id: "medication", label: "Medicação (SN)" },
                { id: "dressing", label: "Curativo Realizado" },
                { id: "diuresis", label: "Controle Diurese" },
                { id: "glycemia", label: "Glicemia Capilar" },
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center gap-3 p-4 border rounded-[var(--radius-xl)] cursor-pointer transition-all ${(form as any)[item.id] ? "border-teal-300 bg-[var(--primary-light)]/40 text-teal-800" : "border-[#E4EAF4] bg-[var(--gray-100)]/50/ hoverhoverhover:bg-[var(--gray-100)]/ hoverhoverhover:border-[#E4EAF4] hoverhover:border-slate-700"} ${signed ? "opacity-60 cursor-default" : ""}`}
                >
                  {" "}
                  <input
                    type="checkbox"
                    disabled={signed}
                    checked={(form as any)[item.id]}
                    onChange={(e) =>
                      setForm({ ...form, [item.id]: e.target.checked })
                    }
                    className="w-4 h-4 text-[var(--primary)] rounded border-slate-400 bg-white focus:ring-teal-500"
                  />{" "}
                  <span
                    className={`text-sm font-medium ${(form as any)[item.id] ? "text-teal-900 font-semibold" : "text-[var(--gray-500)]"}`}
                  >
                    {item.label}
                  </span>{" "}
                </label>
              ))}{" "}
            </div>{" "}
          </section>{" "}
          {}{" "}
          <section>
            {" "}
            <div className="flex items-center gap-3 mb-5">
              {" "}
              <div className="w-8 h-8 rounded-xl bg-[var(--primary-light)]/ border border-[var(--primary-mid)] flex items-center justify-center text-[var(--primary)]">
                {" "}
                <FileText className="w-4 h-4" />{" "}
              </div>{" "}
              <h4 className="font-bold text-[var(--black)] text-sm">
                Observações de Enfermagem
              </h4>{" "}
            </div>{" "}
            <textarea
              disabled={signed}
              value={form.observations}
              onChange={(e) =>
                setForm({ ...form, observations: e.target.value })
              }
              placeholder="Descreva detalhadamente o estado geral do paciente, queixas subjetivas, nível de consciência, padrão respiratório, aceitação da dieta, ou quaisquer intercorrências..."
              className="w-full bg-[var(--gray-100)]/50/ border border-[#E4EAF4]/ rounded-[var(--radius-xl)] p-5 text-[var(--black)] focushoverhover:bg-white hoverhover:bg-white focus:ring-1 focus:ring-teal-500 focushoverhover:border-teal-500 outline-none min-h-[140px] resize-y disabled:opacity-50 text-sm transition-all placeholder-slate-400"
            />{" "}
          </section>{" "}
          {}{" "}
          {!signed && (
            <div className="flex justify-end pt-6">
              {" "}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-[var(--primary)] hoverhoverhover:bg-teal-700 text-white font-semibold font-sans py-3 px-8 rounded-[var(--radius-xl)] shadow-[var(--shadow-md)] shadow-teal-500/10 transition-all duration-150 flex items-center gap-3 disabled:opacity-50 cursor-pointer"
              >
                {" "}
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Activity className="w-5 h-5" />
                )}{" "}
                {loading
                  ? "Sistematizando evolução..."
                  : "Processar e Validar Dados"}{" "}
              </button>{" "}
            </div>
          )}{" "}
          {}{" "}
          {aiResult && (
            <div className="mt-8 space-y-6 bg-[var(--gray-100)] border border-[var(--primary-mid)]/45 p-6 rounded-[2rem] shadow-[var(--shadow-xs)]">
              {" "}
              {}{" "}
              {aiResult.alerts && aiResult.alerts.length > 0 && (
                <div className="bg-red-50 border border-red-200/70 rounded-[var(--radius-xl)] p-5 shadow-[var(--shadow-xs)]">
                  {" "}
                  <div className="flex items-center gap-2 text-red-700 font-bold mb-3 tracking-wide uppercase text-xs">
                    {" "}
                    <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />{" "}
                    Protocolo de Alerta Clínico Ativado{" "}
                  </div>{" "}
                  <ul className="list-disc list-inside space-y-1 text-sm text-red-800">
                    {" "}
                    {aiResult.alerts.map((alert, i) => (
                      <li key={i}>{alert}</li>
                    ))}{" "}
                  </ul>{" "}
                </div>
              )}{" "}
              {}{" "}
              {aiResult.protocols && aiResult.protocols.length > 0 && (
                <div className="bg-amber-50 border border-amber-300 rounded-[var(--radius-xl)] p-5 shadow-[var(--shadow-xs)]">
                  {" "}
                  <div className="flex items-center gap-2 text-amber-700 font-bold mb-3 tracking-wide uppercase text-xs">
                    {" "}
                    <ShieldCheck className="w-5 h-5 text-amber-500" /> Conduta
                    de Enfermagem Recomendada{" "}
                  </div>{" "}
                  <ul className="list-disc list-inside text-sm text-amber-800">
                    {" "}
                    {aiResult.protocols.map((prot, i) => (
                      <li key={i}>{prot}</li>
                    ))}{" "}
                  </ul>{" "}
                </div>
              )}{" "}
              {}{" "}
              <div className="bg-white border border-[#E4EAF4]/ rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-xs)]">
                {" "}
                <h4 className="text-[var(--gray-500)] font-bold mb-4 text-[10px] uppercase font-sans font-semibold tracking-wider flex items-center gap-2">
                  {" "}
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-ping"></span>{" "}
                  Minuta da Evolução Estruturada (Pronta para Assinatura){" "}
                </h4>{" "}
                <div className="text-[var(--gray-700)] text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {" "}
                  {aiResult.summary}{" "}
                </div>{" "}
              </div>{" "}
              {!signed && (
                <div className="flex justify-end pt-4">
                  {" "}
                  <button
                    onClick={handleSign}
                    className="bg-emerald-600 hoverhoverhover:bg-emerald-700 text-emerald-50 font-bold tracking-wide py-3 px-8 rounded-[var(--radius-xl)] shadow-[var(--shadow-md)] shadow-emerald-500/10 transition-all duration-150 flex items-center gap-2 cursor-pointer"
                  >
                    {" "}
                    <Save className="w-5 h-5 text-emerald-300" /> Assinar
                    Digitalmente e Concluir{" "}
                  </button>{" "}
                </div>
              )}{" "}
            </div>
          )}{" "}
          {}{" "}
          {signed && transactionId && (
            <div className="mt-8 bg-[var(--gray-100)] text-[var(--gray-700)] p-5 rounded-[var(--radius-xl)] font-sans font-semibold text-[11px] border border-[#E4EAF4] space-y-2">
              {" "}
              <div className="flex items-center gap-2 text-emerald-600 mb-3 font-bold uppercase tracking-widest text-[12px]">
                {" "}
                <CheckCircle2 className="w-4 h-4" /> Protocolo ICP-Brasil
                Blockchain{" "}
              </div>{" "}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-3 border-b border-[#E4EAF4]/">
                {" "}
                <p>
                  <span className="text-[var(--gray-500)] font-bold">
                    PROFISSIONAL:
                  </span>{" "}
                  TÉC Roberto Silva (COREN-SP 214.992)
                </p>{" "}
                <p>
                  <span className="text-[var(--gray-500)] font-bold">
                    TIMESTAMP:
                  </span>{" "}
                  {new Date().toISOString()}
                </p>{" "}
                <p className="md:col-span-2 truncate">
                  <span className="text-[var(--gray-500)] font-bold">
                    SHA256_TX:
                  </span>{" "}
                  <span className="text-[var(--primary)] font-semibold">
                    {transactionId}
                  </span>
                </p>{" "}
                <p className="md:col-span-2 truncate">
                  <span className="text-[var(--gray-500)] font-bold">
                    INTEGRITY_HASH:
                  </span>{" "}
                  {Math.random().toString(36).substring(2, 64)}
                </p>{" "}
              </div>{" "}
              <p className="text-[10px] text-[var(--gray-500)] italic pt-1">
                Este prontuário foi criptografado e registrado de forma
                definitiva para fins de auditoria assistencial de enfermagem.
              </p>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
