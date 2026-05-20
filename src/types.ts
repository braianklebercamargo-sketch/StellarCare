export type ViewState = "landing" | "dashboard" | "register" | "evolution";

export interface Patient {
  id: string;
  name: string;
  age: number;
  bed: string;
  diagnosis: string;
}

export interface MetricPoint {
  time: string;
  temp: number;
  spo2: number;
  pain: number;
  sys: number;
  dia: number;
  fc?: number;
  fr?: number;
}
