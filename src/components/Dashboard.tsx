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
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Dashboard Clínico</h1>
          <p className="text-sm text-zinc-500 font-mono">Monitoramento // Sinais Vitais</p>
        </div>
        <div className="hidden md:flex gap-2 bg-zinc-900 border border-zinc-800 p-1 rounded-full">
          <div className="px-4 py-1.5 bg-zinc-800 rounded-full text-xs font-semibold text-zinc-200 uppercase tracking-widest">Live</div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1 pb-4">
        {/* Patient List (Bento Box 1) */}
        <div className="col-span-12 lg:col-span-4 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 flex flex-col gap-4">
          <h3 className="font-bold uppercase tracking-widest text-[11px] text-zinc-500 mb-2">Meus Pacientes (Simulação)</h3>
          <div className="space-y-3 overflow-y-auto">
            {patients.length === 0 && <p className="text-zinc-500 text-sm">Nenhum paciente cadastrado.</p>}
            {patients.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPatient(p)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  selectedPatient?.id === p.id
                    ? "bg-indigo-600/10 border-indigo-500/30 shadow-[inset_0_0_20px_rgba(79,70,229,0.05)]"
                    : "bg-zinc-900 border-zinc-800/50 hover:bg-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-sm font-bold ${selectedPatient?.id === p.id ? "text-indigo-100" : "text-zinc-200"}`}>{p.name}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-zinc-950 border border-zinc-700 text-zinc-400 rounded">
                    {p.bed}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 line-clamp-1 mb-2">{p.diagnosis}</p>
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                  <span>{p.age} YEARS</span>
                  <span className="text-indigo-400">ID: {p.id.substring(0, 4)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Charts Dashboard (Bento Box 2) */}
        <div className="col-span-12 lg:col-span-8 bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 flex flex-col">
          {selectedPatient ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-lg font-bold text-zinc-100">{selectedPatient.name}</h2>
                  <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Histórico // {selectedPatient.bed}</p>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20 font-bold tracking-widest uppercase">
                  {latestMetric ? "MONITORADO" : "AGUARDANDO DADOS"}
                </span>
              </div>

              {/* Metrics Grid inside Charts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                 <div className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-2xl flex flex-col justify-between h-24">
                   <div className="flex items-center gap-2 mb-1">
                     <Thermometer className="w-4 h-4 text-orange-400" />
                     <span className="text-[10px] font-mono uppercase text-zinc-500">Temperatura</span>
                   </div>
                   <div className="text-2xl font-bold font-mono text-zinc-100 flex items-baseline gap-1">
                      {latestMetric ? latestMetric.temp : "--"} <span className="text-xs text-zinc-500">°C</span>
                   </div>
                 </div>
                 <div className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-2xl flex flex-col justify-between h-24">
                   <div className="flex items-center gap-2 mb-1">
                     <Wind className="w-4 h-4 text-sky-400" />
                     <span className="text-[10px] font-mono uppercase text-zinc-500">Saturação</span>
                   </div>
                   <div className="text-2xl font-bold font-mono text-zinc-100 flex items-baseline gap-1">
                      {latestMetric ? latestMetric.spo2 : "--"} <span className="text-xs text-zinc-500">%</span>
                   </div>
                 </div>
                 <div className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-2xl flex flex-col justify-between h-24">
                   <div className="flex items-center gap-2 mb-1">
                     <Heart className="w-4 h-4 text-red-500" />
                     <span className="text-[10px] font-mono uppercase text-zinc-500">Pressão Art.</span>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-xl font-bold font-mono text-zinc-100 leading-none">
                        {latestMetric ? `${latestMetric.sys}/${latestMetric.dia}` : "--/--"}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono mt-1">mmHg</span>
                   </div>
                 </div>
                 <div className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-2xl flex flex-col justify-between h-24">
                   <div className="flex items-center gap-2 mb-1">
                     <Activity className="w-4 h-4 text-purple-400" />
                     <span className="text-[10px] font-mono uppercase text-zinc-500">Escala de Dor</span>
                   </div>
                   <div className="text-2xl font-bold font-mono text-zinc-100 flex items-baseline gap-1">
                      {latestMetric ? latestMetric.pain : "--"} <span className="text-xs text-zinc-500">/10</span>
                   </div>
                 </div>
              </div>

              <div className="flex-1 min-h-[250px] bg-zinc-950/20 rounded-2xl border border-zinc-800/50 p-4">
                {currentMetrics.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentMetrics} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#71717a', fontFamily: 'monospace' }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#71717a', fontFamily: 'monospace' }} domain={[35, 40]} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#71717a', fontFamily: 'monospace' }} domain={[90, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#a1a1aa', fontFamily: 'monospace', fontSize: '12px' }}
                  itemStyle={{ fontFamily: 'monospace', fontSize: '13px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace', color: '#a1a1aa', paddingTop: '10px' }} />
                <Line yAxisId="left" type="monotone" name="Temp (°C)" dataKey="temp" stroke="#f97316" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#18181b' }} activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2, fill: '#fff' }} />
                <Line yAxisId="right" type="monotone" name="SpO2 (%)" dataKey="spo2" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#18181b' }} activeDot={{ r: 6, stroke: '#6366f1', strokeWidth: 2, fill: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500 font-mono text-xs">
                    <Activity className="w-8 h-8 mb-2 opacity-20" />
                    AGUARDANDO PRIMEIRA EVOLUÇÃO
                  </div>
                )}
          </div>
        </>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-zinc-500 font-mono text-xs">
          SELECIONE UM PACIENTE
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
