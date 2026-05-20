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
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(
    patients[0] || null,
  );
  useEffect(() => {
    if (
      patients.length > 0 &&
      (!selectedPatient || !patients.find((p) => p.id === selectedPatient.id))
    ) {
      setSelectedPatient(patients[0]);
    }
  }, [patients]);
  const currentMetrics = selectedPatient
    ? metricsByPatient[selectedPatient.id] || []
    : [];
  const latestMetric =
    currentMetrics.length > 0
      ? currentMetrics[currentMetrics.length - 1]
      : null;
  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col gap-4">
      {" "}
      {}{" "}
      <div className="flex items-center justify-between px-2 md:px-0">
        {" "}
        <div>
          {" "}
          <h1 className="text-2xl font-sans font-extrabold font-bold tracking-tight text-[var(--black)]">
            Monitoramento Clínico
          </h1>{" "}
          <p className="text-xs text-[var(--gray-500)] font-sans font-semibold uppercase tracking-wider">
            Acompanhamento de Sinais Vitais em Tempo Real
          </p>{" "}
        </div>{" "}
        <div className="hidden md:flex gap-2 bg-white border border-[#E4EAF4] p-1 rounded-full shadow-[var(--shadow-xs)]">
          {" "}
          <div className="px-4 py-1.5 bg-[var(--primary-light)]/ rounded-full text-[10px] font-bold text-[var(--primary-hover)] uppercase tracking-widest flex items-center gap-1.5">
            {" "}
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"></span>{" "}
            Terminal Fixo{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="grid grid-cols-12 gap-4 flex-1 pb-4">
        {" "}
        {}{" "}
        <div className="col-span-12 lg:col-span-4 bg-white border border-[#E4EAF4] rounded-[var(--radius-xl)] p-6 flex flex-col gap-4 shadow-[0_4px_30px_rgba(15,23,42,0.02)]">
          {" "}
          <h3 className="font-bold uppercase tracking-widest text-[9px] text-[var(--gray-500)] font-sans font-semibold mb-2">
            PACIENTES INTERNADOS
          </h3>{" "}
          <div className="space-y-3 overflow-y-auto">
            {" "}
            {patients.length === 0 && (
              <p className="text-[var(--gray-500)] text-sm">
                Nenhum paciente admitido.
              </p>
            )}{" "}
            {patients.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPatient(p)}
                className={`w-full text-left p-4 rounded-[var(--radius-xl)] border transition-all cursor-pointer ${selectedPatient?.id === p.id ? "bg-[var(--primary-light)]/50 border-teal-500/35 shadow-[var(--shadow-xs)]" : "bg-[var(--gray-100)]/50/ border-[#E4EAF4] hoverhoverhover:bg-[var(--gray-100)]/ hoverhoverhover:border-[#E4EAF4] hoverhover:border-slate-700"}`}
              >
                {" "}
                <div className="flex justify-between items-start mb-1 gap-2">
                  {" "}
                  <h4
                    className={`text-sm font-bold ${selectedPatient?.id === p.id ? "text-[var(--black)]" : "text-[var(--gray-700)]"}`}
                  >
                    {p.name}
                  </h4>{" "}
                  <span className="text-[10px] font-sans font-semibold px-2 py-0.5 bg-white border border-slate-300 text-[var(--gray-500)] rounded font-semibold whitespace-nowrap">
                    {" "}
                    {p.bed}{" "}
                  </span>{" "}
                </div>{" "}
                <p className="text-xs text-[var(--gray-500)] line-clamp-1 mb-2 font-sans">
                  {p.diagnosis || "Sem diagnóstico definido"}
                </p>{" "}
                <div className="flex items-center justify-between text-[10px] text-[var(--gray-500)] font-sans font-semibold">
                  {" "}
                  <span>{p.age} Anos</span>{" "}
                  <span className="text-[var(--primary)] font-bold">
                    ID: {p.id.substring(0, 4)}
                  </span>{" "}
                </div>{" "}
              </button>
            ))}{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <div className="col-span-12 lg:col-span-8 bg-white border border-[#E4EAF4] rounded-[var(--radius-xl)] p-6 flex flex-col shadow-[0_4px_30px_rgba(15,23,42,0.02)]">
          {" "}
          {selectedPatient ? (
            <>
              {" "}
              <div className="flex items-center justify-between mb-8">
                {" "}
                <div>
                  {" "}
                  <h2 className="text-lg font-bold text-[var(--black)]">
                    {selectedPatient.name}
                  </h2>{" "}
                  <p className="text-[11px] font-sans font-semibold text-[var(--gray-500)] uppercase tracking-widest mt-0.5">
                    Quarto/Leito: {selectedPatient.bed} • Diagnóstico:{" "}
                    {selectedPatient.diagnosis}
                  </p>{" "}
                </div>{" "}
                <span
                  className={`text-[9px] px-2.5 py-1 rounded-full border font-sans font-semibold font-bold tracking-wider uppercase ${latestMetric ? "bg-[var(--primary-light)]/ border-[var(--primary-mid)] text-[var(--primary-hover)]" : "bg-[var(--gray-100)] border-[#E4EAF4] text-[var(--gray-500)]"}`}
                >
                  {" "}
                  {latestMetric ? "MONITORADO" : "AGUARDANDO DADOS"}{" "}
                </span>{" "}
              </div>{" "}
              {}{" "}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {" "}
                <div className="bg-[var(--gray-100)]/70/ border border-[#E4EAF4] p-4 rounded-[var(--radius-xl)] flex flex-col justify-between h-24">
                  {" "}
                  <div className="flex items-center gap-2 mb-1">
                    {" "}
                    <Thermometer className="w-4 h-4 text-orange-500" />{" "}
                    <span className="text-[10px] font-sans font-semibold uppercase text-[var(--gray-500)] font-bold">
                      Temperatura
                    </span>{" "}
                  </div>{" "}
                  <div className="text-2xl font-bold font-sans font-semibold text-[var(--black)] flex items-baseline gap-1">
                    {" "}
                    {latestMetric ? latestMetric.temp : "--"}{" "}
                    <span className="text-xs text-[var(--gray-500)] font-normal">
                      °C
                    </span>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="bg-[var(--gray-100)]/70/ border border-[#E4EAF4] p-4 rounded-[var(--radius-xl)] flex flex-col justify-between h-24">
                  {" "}
                  <div className="flex items-center gap-2 mb-1">
                    {" "}
                    <Wind className="w-4 h-4 text-sky-500" />{" "}
                    <span className="text-[10px] font-sans font-semibold uppercase text-[var(--gray-500)] font-bold">
                      Saturação
                    </span>{" "}
                  </div>{" "}
                  <div className="text-2xl font-bold font-sans font-semibold text-[var(--black)] flex items-baseline gap-1">
                    {" "}
                    {latestMetric ? latestMetric.spo2 : "--"}{" "}
                    <span className="text-xs text-[var(--gray-500)] font-normal">
                      %
                    </span>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="bg-[var(--gray-100)]/70/ border border-[#E4EAF4] p-4 rounded-[var(--radius-xl)] flex flex-col justify-between h-24">
                  {" "}
                  <div className="flex items-center gap-2 mb-1">
                    {" "}
                    <Heart className="w-4 h-4 text-red-500" />{" "}
                    <span className="text-[10px] font-sans font-semibold uppercase text-[var(--gray-500)] font-bold">
                      P. Arterial
                    </span>{" "}
                  </div>{" "}
                  <div className="flex flex-col">
                    {" "}
                    <span className="text-xl font-bold font-sans font-semibold text-[var(--black)] leading-none">
                      {" "}
                      {latestMetric
                        ? `${latestMetric.sys}/${latestMetric.dia}`
                        : "--/--"}{" "}
                    </span>{" "}
                    <span className="text-[10px] text-[var(--gray-500)] font-sans font-semibold mt-1 font-semibold">
                      mmHg
                    </span>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="bg-[var(--gray-100)]/70/ border border-[#E4EAF4] p-4 rounded-[var(--radius-xl)] flex flex-col justify-between h-24">
                  {" "}
                  <div className="flex items-center gap-2 mb-1">
                    {" "}
                    <Activity className="w-4 h-4 text-[var(--primary)]" />{" "}
                    <span className="text-[10px] font-sans font-semibold uppercase text-[var(--gray-500)] font-bold">
                      Escala de Dor
                    </span>{" "}
                  </div>{" "}
                  <div className="text-2xl font-bold font-sans font-semibold text-[var(--black)] flex items-baseline gap-1">
                    {" "}
                    {latestMetric ? latestMetric.pain : "--"}{" "}
                    <span className="text-xs text-[var(--gray-500)] font-normal">
                     /
                    </span>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="flex-1 min-h-[250px] bg-[var(--gray-100)]/30/ rounded-[var(--radius-xl)] border border-[#E4EAF4] p-4">
                {" "}
                {currentMetrics.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    {" "}
                    <LineChart
                      data={currentMetrics}
                      margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                    >
                      {" "}
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#e2e8f0"
                      />{" "}
                      <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 11,
                          fill: "#64748b",
                          fontFamily: "monospace",
                        }}
                        dy={10}
                      />{" "}
                      <YAxis
                        yAxisId="left"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 11,
                          fill: "#64748b",
                          fontFamily: "monospace",
                        }}
                        domain={[35, 40]}
                      />{" "}
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 11,
                          fill: "#64748b",
                          fontFamily: "monospace",
                        }}
                        domain={[90, 100]}
                      />{" "}
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          backgroundColor: "#ffffff",
                          borderColor: "#e2e8f0",
                          color: "#0f172a",
                          boxShadow: "0 4px 20px rgba(15,23,42,0.05)",
                        }}
                        labelStyle={{
                          fontWeight: "bold",
                          color: "#64748b",
                          fontFamily: "monospace",
                          fontSize: "11px",
                        }}
                        itemStyle={{
                          fontFamily: "monospace",
                          fontSize: "12px",
                        }}
                      />{" "}
                      <Legend
                        iconType="circle"
                        wrapperStyle={{
                          fontSize: "11px",
                          fontFamily: "monospace",
                          color: "#64748b",
                          paddingTop: "10px",
                        }}
                      />{" "}
                      <Line
                        yAxisId="left"
                        type="monotone"
                        name="Temp (°C)"
                        dataKey="temp"
                        stroke="#f97316"
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2, fill: "#ffffff" }}
                        activeDot={{
                          r: 6,
                          stroke: "#f97316",
                          strokeWidth: 2,
                          fill: "#fff",
                        }}
                      />{" "}
                      <Line
                        yAxisId="right"
                        type="monotone"
                        name="SpO2 (%)"
                        dataKey="spo2"
                        stroke="#0ea5e9"
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2, fill: "#ffffff" }}
                        activeDot={{
                          r: 6,
                          stroke: "#0ea5e9",
                          strokeWidth: 2,
                          fill: "#fff",
                        }}
                      />{" "}
                    </LineChart>{" "}
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-[var(--gray-500)] font-sans font-semibold text-xs py-12">
                    {" "}
                    <Activity className="w-8 h-8 mb-2 opacity-30 text-[var(--primary)] animate-pulse" />{" "}
                    AGUARDANDO PRIMEIRA EVOLUÇÃO ASSINADA{" "}
                  </div>
                )}{" "}
              </div>{" "}
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-[var(--gray-500)] font-sans font-semibold text-xs py-12">
              {" "}
              SELECIONE UM PACIENTE NA LISTA LATERAL{" "}
            </div>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
