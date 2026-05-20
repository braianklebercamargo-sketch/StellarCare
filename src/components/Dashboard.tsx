import { useState, useEffect } from "react";
import { Activity, Thermometer, Droplet, Heart, Wind } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Patient, MetricPoint } from "../types";

export interface DashboardProps {
  patients: Patient[];
  metricsByPatient: Record<string, MetricPoint[]>;
}

export function Dashboard({ patients, metricsByPatient }: DashboardProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(patients[0] || null);

  useEffect(() => {
    if (patients.length > 0 && (!selectedPatient || !patients.find(p => p.id === selectedPatient.id))) {
      setSelectedPatient(patients[0]);
    }
  }, [patients]);

  const currentMetrics = selectedPatient ? (metricsByPatient[selectedPatient.id] || []) : [];
  const latestMetric = currentMetrics.length > 0 ? currentMetrics[currentMetrics.length - 1] : null;

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col gap-4">
      {/* Header Container Bento */}
      <div className="flex items-center justify-between px-2 md:px-0">
        <div>
          <h1 className="text-2xl font-serif font-bold tracking-tight text-slate-900 dark:text-white">Monitoramento Clínico</h1>
          <p className="text-xs text-slate-400 dark:text-slate-400 font-mono uppercase tracking-wider">Acompanhamento de Sinais Vitais em Tempo Real</p>
        </div>
        <div className="hidden md:flex gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-1 rounded-full shadow-xs">
          <div className="px-4 py-1.5 bg-teal-50 dark:bg-teal-900/30 rounded-full text-[10px] font-bold text-teal-700 dark:text-teal-300 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span> Terminal Fixo
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1 pb-4">
        {/* Patient List (Bento Box 1) */}
        <div className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col gap-4 shadow-[0_4px_30px_rgba(15,23,42,0.02)]">
          <h3 className="font-bold uppercase tracking-widest text-[9px] text-slate-400 dark:text-slate-400 font-mono mb-2">PACIENTES INTERNADOS</h3>
          <div className="space-y-3 overflow-y-auto">
            {patients.length === 0 && <p className="text-slate-400 dark:text-slate-400 text-sm">Nenhum paciente admitido.</p>}
            {patients.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPatient(p)}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedPatient?.id === p.id
                    ? "bg-teal-50/50 border-teal-500/35 shadow-xs"
                    : "bg-slate-50/50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex justify-between items-start mb-1 gap-2">
                  <h4 className={`text-sm font-bold ${selectedPatient?.id === p.id ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-200"}`}>{p.name}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded font-semibold whitespace-nowrap">
                    {p.bed}
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-400 line-clamp-1 mb-2 font-sans">{p.diagnosis || "Sem diagnóstico definido"}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-400 font-mono">
                  <span>{p.age} Anos</span>
                  <span className="text-teal-600 font-bold">ID: {p.id.substring(0, 4)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Charts Dashboard (Bento Box 2) */}
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col shadow-[0_4px_30px_rgba(15,23,42,0.02)]">
          {selectedPatient ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{selectedPatient.name}</h2>
                  <p className="text-[11px] font-mono text-slate-400 dark:text-slate-400 uppercase tracking-widest mt-0.5">Quarto/Leito: {selectedPatient.bed} • Diagnóstico: {selectedPatient.diagnosis}</p>
                </div>
                <span className={`text-[9px] px-2.5 py-1 rounded-full border font-mono font-bold tracking-wider uppercase ${
                  latestMetric ? "bg-teal-50 dark:bg-teal-900/30 border-teal-200 text-teal-700 dark:text-teal-300" : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                }`}>
                  {latestMetric ? "MONITORADO" : "AGUARDANDO DADOS"}
                </span>
              </div>

              {/* Metrics Grid inside Charts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                 <div className="bg-slate-50/70 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between h-24">
                   <div className="flex items-center gap-2 mb-1">
                     <Thermometer className="w-4 h-4 text-orange-500" />
                     <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold">Temperatura</span>
                   </div>
                   <div className="text-2xl font-bold font-mono text-slate-800 dark:text-slate-100 flex items-baseline gap-1">
                      {latestMetric ? latestMetric.temp : "--"} <span className="text-xs text-slate-400 dark:text-slate-400 font-normal">°C</span>
                   </div>
                 </div>
                 <div className="bg-slate-50/70 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between h-24">
                   <div className="flex items-center gap-2 mb-1">
                     <Wind className="w-4 h-4 text-sky-500" />
                     <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold">Saturação</span>
                   </div>
                   <div className="text-2xl font-bold font-mono text-slate-800 dark:text-slate-100 flex items-baseline gap-1">
                      {latestMetric ? latestMetric.spo2 : "--"} <span className="text-xs text-slate-400 dark:text-slate-400 font-normal">%</span>
                   </div>
                 </div>
                 <div className="bg-slate-50/70 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between h-24">
                   <div className="flex items-center gap-2 mb-1">
                     <Heart className="w-4 h-4 text-red-500" />
                     <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold">P. Arterial</span>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100 leading-none">
                        {latestMetric ? `${latestMetric.sys}/${latestMetric.dia}` : "--/--"}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-400 font-mono mt-1 font-semibold">mmHg</span>
                   </div>
                 </div>
                 <div className="bg-slate-50/70 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between h-24">
                   <div className="flex items-center gap-2 mb-1">
                     <Activity className="w-4 h-4 text-teal-600" />
                     <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold">Escala de Dor</span>
                   </div>
                   <div className="text-2xl font-bold font-mono text-slate-800 dark:text-slate-100 flex items-baseline gap-1">
                      {latestMetric ? latestMetric.pain : "--"} <span className="text-xs text-slate-400 dark:text-slate-400 font-normal">/10</span>
                   </div>
                 </div>
              </div>

              <div className="flex-1 min-h-[250px] bg-slate-50/30 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 p-4">
                {currentMetrics.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentMetrics} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'monospace' }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'monospace' }} domain={[35, 40]} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'monospace' }} domain={[90, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a', boxShadow: '0 4px 20px rgba(15,23,42,0.05)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#64748b', fontFamily: 'monospace', fontSize: '11px' }}
                  itemStyle={{ fontFamily: 'monospace', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace', color: '#64748b', paddingTop: '10px' }} />
                <Line yAxisId="left" type="monotone" name="Temp (°C)" dataKey="temp" stroke="#f97316" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#ffffff' }} activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2, fill: '#fff' }} />
                <Line yAxisId="right" type="monotone" name="SpO2 (%)" dataKey="spo2" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#ffffff' }} activeDot={{ r: 6, stroke: '#0ea5e9', strokeWidth: 2, fill: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-400 font-mono text-xs py-12">
                    <Activity className="w-8 h-8 mb-2 opacity-30 text-teal-600 animate-pulse" />
                    AGUARDANDO PRIMEIRA EVOLUÇÃO ASSINADA
                  </div>
                )}
          </div>
        </>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-400 font-mono text-xs py-12">
          SELECIONE UM PACIENTE NA LISTA LATERAL
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
