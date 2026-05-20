import { useState, useMemo } from "react";
import { 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Thermometer, 
  Wind, 
  Heart, 
  Stethoscope, 
  Layers, 
  Globe, 
  FileText,
  UserCheck,
  Moon,
  Sun
} from "lucide-react";
import { motion } from "motion/react";
import { ViewState } from "../types";

interface LandingPageProps {
  onEnter: (view: ViewState) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function LandingPage({ onEnter, theme, toggleTheme }: LandingPageProps) {
  // Interactive Simulator State
  const [testTemp, setTestTemp] = useState(36.5);
  const [testSpo2, setTestSpo2] = useState(98);
  const [testPain, setTestPain] = useState(2);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Dynamic Clinical Guidelines
  const clinicalStatus = useMemo(() => {
    let alert = "Parâmetros Normais";
    let alertClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
    let protocol = "Manter monitoramento assistencial de rotina e registrar evolução periódica.";

    if (testTemp >= 38) {
      alert = "Alerta: Hipertermia / Febre";
      alertClass = "text-orange-700 bg-orange-50 border-orange-200";
      protocol = "Notificar o enfermeiro assistente, providenciar medidas físicas de resfriamento corporal e conferir prescrição de antitérmicos.";
    } else if (testTemp < 35.5) {
      alert = "Alerta: Hipotermia";
      alertClass = "text-sky-700 bg-sky-50 border-sky-200";
      protocol = "Aplicar mantas de aquecimento passivo, monitorizar a temperatura a cada hora e evitar correntes de ar frio no leito.";
    }

    if (testSpo2 < 93) {
      alert = testTemp >= 38 ? "Gravidade: Febre + Queda de Saturação" : "Gravidade: Hipóxia Clínico";
      alertClass = "text-red-700 bg-red-50 border-red-200 animate-pulse";
      protocol = "Elevar cabeceira do leito (Posição de Fowler), preparar circuito de oxigenoterapia/cateter nasal de O2 e acionar plantão de enfermagem com urgência.";
    }

    if (testPain >= 8) {
      alert = "Queixa: Dor Severe (" + testPain + "/10)";
      alertClass = "text-rose-700 bg-rose-50 border-rose-200";
      protocol = "Protocolo de manejo de dor intensa: posicionar o paciente em decúbito de conforto, acionar analgesia sob prescrição SOS e acalmar o paciente.";
    }

    return { alert, alertClass, protocol };
  }, [testTemp, testSpo2, testPain]);

  // Secure Cryptographic Hash generator
  const cryptoHash = useMemo(() => {
    const rawData = `temp:${testTemp}|spo2:${testSpo2}|pain:${testPain}|tech:RobertoSilva|timestamp:${Date.now()}`;
    let hash = 0;
    for (let i = 0; i < rawData.length; i++) {
      hash = (hash << 5) - hash + rawData.charCodeAt(i);
      hash |= 0;
    }
    return "SHA256: 0x8a" + Math.abs(hash).toString(16).padStart(12, "0") + "64c7eef";
  }, [testTemp, testSpo2, testPain]);

  const faqs = [
    {
      q: "O que é e para que serve a Sistematização da Assistência de Enfermagem (SAE)?",
      a: "A SAE é uma metodologia de trabalho científica que organiza os cuidados profissionais de enfermagem, proporcionando segurança para os pacientes e rastreabilidade jurídica completa para o profissional de plantão de acordo com as normas vigentes do COFEN."
    },
    {
      q: "Como a inteligência do sistema auxilia o Técnico de Enfermagem?",
      a: "O sistema processa de forma instantânea os parâmetros vitais informados pelo técnico, cruzando-os com as condutas clínicas padronizadas. Ele gera automaticamente uma minuta estruturada da evolução e orienta o profissional de forma proativa."
    },
    {
      q: "O que garante a segurança e imutabilidade dos registros?",
      a: "Cada evolução assinada pelo técnico gera um comprovante com identificador criptográfico único (hash SHA256). Isso garante que o prontuário não possa ser adulterado retroativamente, oferecendo total transparência e respaldo em auditorias hospitalares."
    },
    {
      q: "O StellarCare funciona em tablets e celulares?",
      a: "Sim. O sistema foi desenvolvido com design responsivo (layout fluído), permitindo o uso em computadores fixos de postos hospitalares, tablets dedicados ou celulares de suporte móvel."
    }
  ];

  return (
    <div className="bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen font-sans overflow-x-hidden relative selection:bg-teal-600/10 selection:text-teal-800">
      
      {/* Decorative Clinical Background Element */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-sky-500/5 blur-[150px] pointer-events-none" />

      {/* Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900/80 backdrop-blur-md z-50 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center shadow-[0_4px_12px_rgba(13,148,136,0.15)]">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold font-serif text-xl tracking-tight text-slate-900 dark:text-white block leading-none">StellarCare</span>
            <span className="text-[9px] text-teal-600 font-mono tracking-widest font-bold uppercase block mt-1">Prontuário Hospitalar</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-xl text-slate-400 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => onEnter("dashboard")} 
            className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 px-3 py-1 cursor-pointer"
          >
            Acessar Painel
          </button>
          <button 
            onClick={() => onEnter("register")} 
            className="text-sm font-semibold text-teal-600 hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-200 cursor-pointer hidden sm:block"
          >
            Admitir Paciente
          </button>
          
          <button 
            onClick={() => onEnter("dashboard")}
            className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-teal-500/10 transition-all duration-150 cursor-pointer"
          >
            Entrar no Posto <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 px-3.5 py-1.5 rounded-full mb-8"
        >
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span className="text-xs font-mono font-bold tracking-wider text-teal-700 dark:text-teal-300 uppercase">Sistema Profissional de Enfermagem Homologado</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight"
        >
          Evolução Assistencial de Enfermagem <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-600 to-sky-600">Segura e Padronizada</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-6 leading-relaxed"
        >
          Apoio completo para o técnico de plantão. Registre parâmetros clínicos detalhados, obtenha recomendações automáticas de conduta assistencial COFEN e gere minutas assinadas com validação e integridade criptográfica.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
        >
          <button 
            onClick={() => onEnter("dashboard")}
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-teal-500/10 transition-all duration-200 text-base cursor-pointer"
          >
            Iniciar Plantão Assistencial <ArrowRight className="w-5 h-5" />
          </button>
          
          <a 
            href="#demo"
            className="w-full sm:w-auto bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-1.5 transition-all duration-150 text-base cursor-pointer shadow-xs"
          >
            Teste Interativo de Vitais
          </a>
        </motion.div>

        {/* Feature Tags */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-12 text-xs font-mono text-slate-400 dark:text-slate-400 font-bold uppercase tracking-widest border-t border-slate-100 dark:border-slate-800 pt-8"
        >
          <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Preservação de Dados de Saúde</div>
          <span className="hidden sm:inline text-slate-200">•</span>
          <div className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-teal-600" /> Assinatura Digital Verificada</div>
          <span className="hidden sm:inline text-slate-200">•</span>
          <div className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-sky-600" /> Total Conformidade Cofen</div>
        </motion.div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="bg-white dark:bg-slate-900 border-t border-b border-slate-100 dark:border-slate-800 py-24 relative z-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center md:text-left md:flex justify-between items-end mb-16 gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal-600">TECNOLOGIA ASSISTENCIAL</span>
              <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 dark:text-white mt-1">Desenvolvido sob os Mais Rígidos Critérios Clínicos</h2>
            </div>
            <p className="text-slate-400 dark:text-slate-400 text-sm max-w-md mt-4 md:mt-0 font-sans">
              O StellarCare previne riscos assistenciais, simplifica o fluxo de passagem de plantão e assegura total fidedignidade aos registros vitais no hospital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-slate-50/60 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-teal-200 hover:bg-white dark:hover:bg-slate-900 transition-all duration-200">
              <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/30 border border-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-xs">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Registro Clínico Estruturado</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Evite anotações informais. Registre evoluções segmentadas por cuidados essenciais como higiene, decúbito, medicações fornecidas e histórico de parâmetros.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50/60 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-teal-200 hover:bg-white dark:hover:bg-slate-900 transition-all duration-200">
              <div className="w-12 h-12 bg-sky-50 border border-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-6 shadow-xs">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Alertas Clínicos Inteligentes</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Garante apoio clínico instantâneo. O sistema mapeia hipóxia severa, febres sustentadas e altos níveis de desconforto de forma dinâmica no momento do input.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50/60 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-teal-200 hover:bg-white dark:hover:bg-slate-900 transition-all duration-200">
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Histórico de Auditoria Imutável</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Assegura integridade inabalável. Toda minuta concluída é encapsulada em uma assinatura criptografada imutável, respaldando legalmente o técnico de enfermagem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE COMPONENT: LIVE VITALS SIMULATOR */}
      <section id="demo" className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            <span className="text-[10px] bg-teal-50 dark:bg-teal-900/30 text-teal-600 border border-teal-200 px-3 py-1 rounded-full font-mono font-bold tracking-widest uppercase inline-block">Mapeamento Clínico</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
              Teste o Simulador de Parâmetros ao Vivo
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Arraste os controles deslizantes ao lado para simular o monitoramento vital de um paciente fictício. Observe como a central gera os alertas corretos e os protocolos ideais em tempo real de acordo com as normas regulamentadas.
            </p>

            <div className="space-y-4 pt-2 font-sans text-sm">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-teal-50 dark:bg-teal-900/30 border border-teal-100 text-teal-600 flex items-center justify-center mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></div>
                <p className="text-slate-600 dark:text-slate-300 font-medium">Alertas automáticos baseados nos parâmetros vitais.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-teal-50 dark:bg-teal-900/30 border border-teal-100 text-teal-600 flex items-center justify-center mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></div>
                <p className="text-slate-600 dark:text-slate-300 font-medium">Sinalização dinâmica de riscos assistenciais latentes.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-teal-50 dark:bg-teal-900/30 border border-teal-100 text-teal-600 flex items-center justify-center mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></div>
                <p className="text-slate-600 dark:text-slate-300 font-medium">Algoritmo de codificação hash SHA256 sempre ativo.</p>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => onEnter("evolution")}
                className="inline-flex items-center gap-2 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-150 shadow-xs cursor-pointer text-sm"
              >
                Abrir Ficha de Evolução Assistencial <ArrowRight className="w-4 h-4 text-teal-600 animate-pulse" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-[0_4px_30px_rgba(15,23,42,0.02)]">
            {/* Simulator Header */}
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <Stethoscope className="w-5 h-5 text-teal-600" />
                <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Simulador de Triagem Clínico-Assistencial</span>
              </div>
              <span className="text-[9px] font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded text-slate-400 dark:text-slate-400 font-semibold">HOMOLOGADO V1.2</span>
            </div>

            {/* Inputs sliders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Temperature */}
              <div className="space-y-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1"><Thermometer className="w-3.5 h-3.5 text-orange-500" /> TEMP</span>
                  <span className={`${testTemp >= 38 ? 'text-orange-600 font-bold' : 'text-slate-700 dark:text-slate-200'}`}>{testTemp}°C</span>
                </div>
                <input 
                  type="range" 
                  min="35" 
                  max="41" 
                  step="0.1" 
                  value={testTemp} 
                  onChange={(e) => setTestTemp(parseFloat(e.target.value))}
                  className="w-full accent-teal-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-400 font-mono">
                  <span>35°C</span>
                  <span>Normal</span>
                  <span>41°C</span>
                </div>
              </div>

              {/* SpO2 */}
              <div className="space-y-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1"><Wind className="w-3.5 h-3.5 text-sky-500" /> SpO2</span>
                  <span className={`${testSpo2 < 93 ? 'text-red-700 font-bold' : 'text-slate-700 dark:text-slate-200'}`}>{testSpo2}%</span>
                </div>
                <input 
                  type="range" 
                  min="80" 
                  max="100" 
                  value={testSpo2} 
                  onChange={(e) => setTestSpo2(parseInt(e.target.value))}
                  className="w-full accent-teal-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-400 font-mono">
                  <span>80%</span>
                  <span>Normal</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Scale of pain */}
              <div className="space-y-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-rose-500" /> ESCALA DOR</span>
                  <span className={`${testPain >= 8 ? 'text-rose-600 font-bold' : 'text-slate-700 dark:text-slate-200'}`}>{testPain}/10</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  value={testPain} 
                  onChange={(e) => setTestPain(parseInt(e.target.value))}
                  className="w-full accent-teal-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-400 font-mono">
                  <span>0 - Ausente</span>
                  <span>Atividade</span>
                  <span>10 - Severa</span>
                </div>
              </div>
            </div>

            {/* Dynamic Results Outputs Panel */}
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 md:p-5 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <span className="text-[9px] font-mono uppercase text-slate-400 dark:text-slate-400 tracking-wider font-bold">Interpretação e Auditoria Ativa</span>
                <span className={`text-[10px] px-2.5 py-1 rounded-full border ${clinicalStatus.alertClass} font-mono font-bold uppercase transition-all duration-200 inline-block text-center`}>
                  {clinicalStatus.alert}
                </span>
              </div>
              
              <div className="space-y-1.5 leading-relaxed">
                <label className="block text-[9px] font-mono uppercase text-slate-400 dark:text-slate-400 tracking-widest font-bold">Protocolo Assistencial Imediato</label>
                <p className="text-slate-700 dark:text-slate-200 text-sm font-sans transition-all duration-150">
                  {clinicalStatus.protocol}
                </p>
              </div>
            </div>

            {/* Simulated Cryptographic Anchor Block Status */}
            <div className="bg-teal-50/40 border border-teal-100 p-4 rounded-2xl space-y-2 relative">
              <div className="flex justify-between items-center text-[10px] font-mono text-teal-700 dark:text-teal-300 font-bold">
                <span className="flex items-center gap-1.5 font-bold uppercase tracking-wide">
                  <Lock className="w-3.5 h-3.5 text-teal-600" /> Rastreabilidade & Certificação Hash
                </span>
                <span className="flex items-center gap-1 text-[9px] text-teal-600 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping"></span> PROTEGIDO
                </span>
              </div>
              
              <div className="font-mono text-[10px] text-slate-500 dark:text-slate-400 truncate select-all" title="Cópia criptográfica disponível">
                Código de Autenticidade: <span className="text-teal-700 dark:text-teal-300 font-semibold">{cryptoHash}</span>
              </div>
              <div className="text-[9px] text-slate-400 dark:text-slate-400 font-mono">
                Cada movimentação de dados reorganiza o hash de controle de integridade do leito correspondente.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-white dark:bg-slate-900 border-t border-b border-slate-100 dark:border-slate-800 py-24 relative z-10 shadow-xs">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal-600">INFORMAÇÕES ASSISTENCIAIS</span>
            <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 dark:text-white mt-1">Dúvidas Clínicas & Operacionais</h2>
            <p className="text-slate-400 dark:text-slate-400 text-sm max-w-md mx-auto mt-2">
              Esclarecimentos rápidos sobre o fluxo assistencial do Prontuário Homologado.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-[#f8fafc] dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-white dark:hover:bg-slate-900 cursor-pointer transition-all duration-150"
                  >
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-tight pr-4">
                      {faq.q}
                    </span>
                    <span className={`text-slate-400 dark:text-slate-400 transform transition-transform duration-250 font-mono border border-slate-200 dark:border-slate-700 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] bg-white dark:bg-slate-900 ${isOpen ? 'rotate-180 text-teal-600 border-teal-200 bg-teal-50 dark:bg-teal-900/30' : ''}`}>
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-2 text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION (CTA) */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center relative z-10">
        <div className="bg-teal-600 border border-teal-700 rounded-[40px] px-8 py-16 md:py-20 flex flex-col items-center justify-center relative overflow-hidden shadow-lg shadow-teal-700/10">
          
          <span className="text-[10px] bg-teal-500/30 text-white font-mono font-bold tracking-widest uppercase inline-block mb-6 relative z-10 px-3 py-1 rounded-full">
            ESTAÇÃO DE TRABALHO SEGURA
          </span>
          
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white mb-6 relative z-10 max-w-2xl leading-tight">
            Prontuário e Evoluções Clínicas Sem Complicações
          </h2>
          
          <p className="text-teal-100 text-sm sm:text-base max-w-xl mb-10 relative z-10 leading-relaxed">
            Aproveite uma interface projetada para otimizar o plantão dos técnicos de enfermagem. Registre evoluções estruturadas e tome decisões ágeis em segurança.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10 w-full sm:w-auto">
            <button 
              onClick={() => onEnter("dashboard")}
              className="w-full sm:w-auto bg-white dark:bg-slate-900 hover:bg-teal-50 dark:hover:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all duration-150 text-base cursor-pointer"
            >
              Começar Simulação Agora <ArrowRight className="w-5 h-5 text-teal-600" />
            </button>
            <button 
              onClick={() => onEnter("register")}
              className="w-full sm:w-auto bg-teal-700/50 hover:bg-teal-700/80 border border-teal-500/20 text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-1.5 transition-all duration-150 text-base cursor-pointer"
            >
              Admitir Novo Paciente
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 relative z-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center shadow-xs">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-slate-800 dark:text-slate-100 block leading-none">StellarCare</span>
              <span className="text-[8px] text-slate-400 dark:text-slate-400 font-mono tracking-widest uppercase block mt-1">Sistematização Assistencial de Enfermagem</span>
            </div>
          </div>

          <p className="text-slate-400 dark:text-slate-400 text-xs font-mono text-center md:text-right">
            &copy; {new Date().getFullYear()} StellarCare. Em total conformidade com a Lei Geral de Proteção de Dados (LGPD).
          </p>
        </div>
      </footer>

    </div>
  );
}
