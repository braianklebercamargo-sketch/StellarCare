import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/generate-summary", async (req, res) => {
    try {
      const { vitals, care, observations } = req.body;

      if (!ai) {
        return res.json({
          summary: `[MOCK - IA Desativada]\nPaciente apresenta estabilidade clínica no momento do registro. Observações da Enfermagem: "${observations || 'Nenhuma'}"\n\nCuidados: ${[care.hygiene && 'Higiene', care.medication && 'Medicação'].filter(Boolean).join(', ')}.`,
          alerts: vitals.temp > 38 ? ["[MOCK] Risco Eminente: Febre Alta (>38°C)"] : [],
          protocols: vitals.pain >= 8 ? ["[MOCK] Protocolo de Dor Recomendado"] : []
        });
      }

      const prompt = `
You are an AI assistant for a system used by Nursing Technicians (StellarCare) to register daily patient evolutions. 
Your job is to process the following structured data and observations and return a structured JSON response.

Input Data:
- Vital Signs:
  - Temperature: ${vitals.temp} °C
  - Blood Pressure (PA): ${vitals.pa_sys}/${vitals.pa_dia} mmHg
  - Heart Rate (FC): ${vitals.fc} bpm
  - Respiratory Rate (FR): ${vitals.fr} irpm
  - SpO2: ${vitals.spo2} %
  - Pain Scale: ${vitals.pain}/10

- Care Provided:
  - Hygiene: ${care.hygiene ? "Yes" : "No"}
  - Decubitus Change: ${care.decubitus ? "Yes" : "No"}
  - Medication Administered: ${care.medication ? "Yes" : "No"}
  - Dressing Change: ${care.dressing ? "Yes" : "No"}
  - Diuresis Checked: ${care.diuresis ? "Yes" : "No"}
  - Glycemia Checked: ${care.glycemia ? "Yes" : "No"}

- Free Text Observations:
"${observations}"

Instructions:
1. Generate an "executive summary" for shift handover (passagem de plantão). It must be compact and professional. Do NOT prescribe conduct. Suggest/orient based on medical standards only if relevant.
2. Formulate "alerts". You MUST ONLY generate an alert if there is an imminent health risk. The strict criteria for imminent risk are:
   - Temperature > 38°C
   - PA (Blood Pressure) > 200/100 mmHg (either systolic > 200 or diastolic > 100)
   - Severe anomalies in Diuresis or vital signs mentioned in the text.
   If none of these are met, the alerts array MUST be empty to avoid alert fatigue.
3. Formulate "protocols". Suggest quick guides based on the most common emergency institutional protocols (Chest Pain - Protocolo de Dor Torácica, Sepsis - Protocolo de Sepse, Stroke - Protocolo de AVC) ONLY IF the symptoms reported strongly indicate them. If not, the protocols array MUST be empty.

Output formatting:
Respond strictly in JSON format as follows, do not include any markdown formatting wrappers.
{
  "summary": "The executive summary text...",
  "alerts": ["Alert 1", "Alert 2"],
  "protocols": ["Sepsis Protocol (Warning signs detected...)"]
}
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const jsonText = response.text || "{}";
      const result = JSON.parse(jsonText);

      res.json(result);
    } catch (error) {
      console.error("AI Generation error:", error);
      const { vitals, care, observations } = req.body;
      res.json({
        summary: `[MOCK - Falha na API da IA]\nPaciente monitorado. Observações registradas: "${observations || 'Nenhuma'}".`,
        alerts: vitals.temp > 38 ? ["[MOCK] Risco Eminente: Febre Alta (>38°C)"] : [],
        protocols: []
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
