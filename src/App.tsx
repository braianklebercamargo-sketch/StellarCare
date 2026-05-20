/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { EvolutionForm } from "./components/EvolutionForm";
import { PatientRegistration } from "./components/PatientRegistration";
import { LandingPage } from "./components/LandingPage";
import { ViewState, Patient, MetricPoint } from "./types";

const initialPatients: Patient[] = [
  { id: "1", name: "Maria de Lourdes Almeida", age: 68, bed: "Leito 104-A", diagnosis: "Pneumonia Adquirida na Comunidade" },
  { id: "2", name: "João Pedro Santos", age: 45, bed: "Leito 104-B", diagnosis: "Pós-operatório Apendicectomia" },
];

const initialMetrics: Record<string, MetricPoint[]> = {
  "1": [
    { time: "08:00", temp: 36.8, spo2: 98, pain: 2, sys: 120, dia: 80, fc: 80, fr: 18 },
    { time: "14:00", temp: 37.2, spo2: 97, pain: 4, sys: 130, dia: 85, fc: 85, fr: 19 },
    { time: "20:00", temp: 38.5, spo2: 95, pain: 7, sys: 145, dia: 90, fc: 100, fr: 22 },
  ],
  "2": [
    { time: "08:00", temp: 36.5, spo2: 99, pain: 4, sys: 110, dia: 70, fc: 75, fr: 16 },
  ]
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>("landing");
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [metrics, setMetrics] = useState<Record<string, MetricPoint[]>>(initialMetrics);
  const [theme, setTheme] = useState<'light'|'dark'>('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };

  const handleAddPatient = (patient: Patient) => {
    setPatients([...patients, patient]);
    setMetrics({ ...metrics, [patient.id]: [] });
    setCurrentView("dashboard");
  };

  const handleAddEvolution = (patientId: string, metric: MetricPoint) => {
    setMetrics({
      ...metrics,
      [patientId]: [...(metrics[patientId] || []), metric],
    });
    setCurrentView("dashboard");
  };

  if (currentView === "landing") {
    return <LandingPage onEnter={setCurrentView} theme={theme} toggleTheme={toggleTheme} />;
  }

  return (
    <Layout currentView={currentView} setView={setCurrentView} theme={theme} toggleTheme={toggleTheme}>
      {currentView === "dashboard" && <Dashboard patients={patients} metricsByPatient={metrics} />}
      {currentView === "register" && <PatientRegistration onRegister={handleAddPatient} />}
      {currentView === "evolution" && <EvolutionForm patients={patients} onSign={handleAddEvolution} />}
    </Layout>
  );
}
