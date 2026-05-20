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
  MousePointerClick,
  UserCheck
} from "lucide-react";
import { motion } from "motion/react";
import { ViewState } from "../types";

interface LandingPageProps {
  onEnter: (view: ViewState) => void;
}

export function LandingPage({ onEnter }: LandingPageProps) {
  // Interactive Simulator State
  const [testTemp, setTestTemp] = useState(36.5);
  const [testSpo2, setTestSpo2] = useState(98);
  const [testPain, setTestPain] = useState(2);
  const [simulatingTx, setSimulatingTx] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Dynamic Clinical Guidelines
  const clinicalStatus = useMemo(() => {
    let alert = "Estável e Normal";
    let alertClass = "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    let protocol = "Manter monitoramento de rotina e registrar evolução.";

    if (testTemp >= 38) {
      alert = "Alerta: Febre / Hipertermia";
      alertClass = "text-orange-400 bg-orange-500/10 border-orange-500/30";
      protocol = "Comunicar enfermeiro supervisor, aplicar compressas frias e verificar prescrição de antitérmicos.";
    } else if (testTemp < 35.5) {
      alert = "Alerta: Hipotermia";
      alertClass = "text-sky-400 bg-sky-500/10 border-sky-500/30";
      protocol = "Aquecer paciente com mantas adicionais e monitorar temperatura a cada 1 hora.";
    }

    if (testSpo2 < 93) {
      alert = testTemp >= 38 ? "Alerta Crítico: Febre + Hipóxia" : "Alerta Crítico: Desaturação / Hipóxia";
      alertClass = "text-red-400 bg-red-500/10 border-red-500/35 animate-pulse";
      protocol = "Posicionar paciente em Fowler, avisar equipe médica e preparar oxigenoterapia de emergência.";
    }

    if (testPain >= 8) {
      alert = "Alerta: Dor Intensa (" + testPain + "/10)";
      alertClass = "text-purple-400 bg-purple-500/10 border-purple-500/30";
      protocol = "Protocolo de manejo de dor severa: avaliar analgesia prescrita, posicionar confortavelmente e registrar escala de dor.";
    }

    return { alert, alertClass, protocol };
  }, [testTemp, testSpo2, testPain]);

  // Simulated Web3 Cryptographic Hash of Vitals
  const cryptoHash = useMemo(() => {
    const rawData = `temp:${testTemp}|spo2:${testSpo2}|pain:${testPain}|tech:RobertoSilva|timestamp:${Date.now()}`;
    // Simple hash generator for illustration
    let hash = 0;
    for (let i = 0; i < rawData.length; i++) {
      hash = (hash << 5) - hash + rawData.charCodeAt(i);
      hash |= 0;
    }
    return "0x7f" + Math.abs(hash).toString(16).padStart(12, "0") + "d81c4e8f99ad";
  }, [testTemp, testSpo2, testPain]);

  const faqs = [
    {
      q: "O que é a simulação Web3/Blockchain no StellarCare?",
      a: "Para garantir absolute segurança e integridade de prontuários, simulamos o registro de informações de evolução em blocos criptográficos imutáveis. Cada assinatura do técnico gera uma ID de Transação criptográfica única que impede a adulteração histórica de registros clínicos."
    },
    {
      q: "Como a IA auxilia o Técnico de Enfermagem?",
      a: "A IA processa instantaneamente os parâmetros vitais inseridos, os cuidados fornecidos e as observações textuais da enfermagem para gerar um resumo coeso, estruturado, além de identificar alertas clínicos e apontar os melhores protocolos de ação imediatamente."
    },
    {
      q: "O sistema funciona em dispositivos móveis?",
      a: "Sim! Desenvolvemos o StellarCare com um ecossistema bento-grid modular totalmente responsivo, ideal para smartphones, tablets instalados em postos de enfermagem ou desktops."
    },
    {
      q: "Por que não é recomendado salvar a evolução diretamente na Blockchain pública?",
      a: "Informações de saúde são extremamente sensíveis. Nossa abordagem Web3 foca na imutabilidade estrutural através de armazenamento off-chain com ancoragem criptográfica on-chain, protegendo dados sensíveis do paciente enquanto mantém a pista de auditoria inalterável."
    }
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen font-sans overflow-x-hidden relative selection:bg-indigo-600/30 selection:text-indigo-200">
      
      {/* Decorative Aurora Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-violet-900/10 blur-[150px] pointer-events-none" />

      {/* Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-zinc-900 sticky top-0 bg-zinc-950/85 backdrop-blur-md z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)]">
            <Activity className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-white block">StellarCare</span>
            <span className="text-[9px] text-indigo-400 font-mono tracking-widest uppercase block">Blockchain Assist</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onEnter("dashboard")} 
            className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors duration-200 px-3 py-1 cursor-pointer"
          >
            Dashboard
          </button>
          <button 
            onClick={() => onEnter("register")} 
            className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-200 cursor-pointer hidden sm:block"
          >
            Cadastrar Paciente
          </button>
          
          <button 
            onClick={() => onEnter("dashboard")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_4px_25px_rgba(79,70,229,0.5)] transition-all duration-300 cursor-pointer"
          >
            Acessar Sistema <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full mb-8"
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-mono font-semibold tracking-wider text-indigo-300 uppercase">Simulador de Assistência de Alta Fidelidade</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none"
        >
          Sistematização de Enfermagem <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-300">Confiável e Criptografada</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-400 text-sm sm:text-lg max-w-2xl mx-auto mt-6 leading-relaxed font-sans"
        >
          Desenvolvido sob medida para Técnicos de Enfermagem. Registre evoluções médicas estruturadas, monitore parâmetros vitais, gere resumos automatizados inteligentes e registre cada alteração em Blockchain criptográfica imutável.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
        >
          <button 
            onClick={() => onEnter("dashboard")}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(79,70,229,0.35)] hover:shadow-[0_10px_35px_rgba(79,70,229,0.55)] transition-all duration-300 text-base cursor-pointer"
          >
            Iniciar Simulação de Posto <ArrowRight className="w-5 h-5 animate-pulse" />
          </button>
          
          <a 
            href="#demo"
            className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-1.5 transition-all duration-200 text-base cursor-pointer"
          >
            Testar Parâmetros ao Vivo
          </a>
        </motion.div>

        {/* Feature Tags/Metrics Pills */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-12 text-xs font-mono text-zinc-500 uppercase tracking-widest border-t border-zinc-900 pt-8"
        >
          <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500/80" /> Sem vazamento de dados</div>
          <span className="hidden sm:inline text-zinc-800">•</span>
          <div className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-indigo-500/80" /> Chaves de Transação Web3</div>
          <span className="hidden sm:inline text-zinc-800">•</span>
          <div className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-violet-500/80" /> Offline-First State Engine</div>
        </motion.div>
      </section>

      {/* CORE CAPABILITIES (BENTO GRID STYLE) */}
      <section className="bg-zinc-950/40 border-t border-b border-zinc-900 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center md:text-left md:flex justify-between items-end mb-16 gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-indigo-400">Funcionalidades Principais</span>
              <h2 className="text-3xl font-bold tracking-tight text-white mt-1">Desenvolvido com Rigor para a Jornada Clínica</h2>
            </div>
            <p className="text-zinc-500 text-sm max-w-md mt-4 md:mt-0 font-sans">
              O StellarCare resolve a falta de padronização, os erros de digitação e a fragilidade na auditoria de prontuários médicos através de um design modular focado no técnico de plantão.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1 */}
            <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-100">Registro Clínico Estruturado</h3>
                <p className="text-sm text-zinc-500 mt-2 font-sans leading-relaxed">
                  Substitua anotações manuscritas ou textões bagunçados por formulários categorizados de cuidados (higiene, curativos, medicações administradas) e parâmetros vitais detalhados.
                </p>
              </div>
            </div>

            {/* Bento Card 2 */}
            <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-2xl flex items-center justify-center mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-100">Alertas Clínicos Imediatos</h3>
                <p className="text-sm text-zinc-500 mt-2 font-sans leading-relaxed">
                  Avaliação automatizada instantânea ao digitar os dados. O sistema sinaliza desaturações criticas de SpO2, picos febris altos e alterações perigosas na escala visual de dor.
                </p>
              </div>
            </div>

            {/* Bento Card 3 */}
            <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-100">Auditoria Web3 Prontuário Limpo</h3>
                <p className="text-sm text-zinc-500 mt-2 font-sans leading-relaxed">
                  Cada assinatura clínica salva garante a proteção de autoria com hash de transação criptografado único, impedindo modificações e gerando segurança jurídica intransponível para o hospital.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE COMPONENT: LIVE VITALS SIMULATOR & BLOCKCHAIN ANCHOR */}
      <section id="demo" className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-mono font-bold tracking-widest uppercase inline-block">Módulo Interativo</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              Experimente a Tecnologia em Tempo Real
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
              Utilize os controles ao lado para simular o estado clínico de um paciente fictício. Observe como o sistema detecta alterações críticas, sugere as condutas ideais baseadas em protocolos do COFEN e atualiza a criptografia hash imediatamente.
            </p>

            <div className="space-y-4 pt-2 font-sans text-sm">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-indigo-500/10 text-indigo-400 flex items-center justify-center mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></div>
                <p className="text-zinc-300 font-medium">Alertas automáticos baseados nos parâmetros vitais.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-indigo-500/10 text-indigo-400 flex items-center justify-center mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></div>
                <p className="text-zinc-300 font-medium">Protocolos assistenciais sugeridos dinamicamente.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-indigo-500/10 text-indigo-400 flex items-center justify-center mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></div>
                <p className="text-zinc-300 font-medium">Rastreabilidade Web3 simulada em tempo de execução real.</p>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => onEnter("evolution")}
                className="inline-flex items-center gap-2 border border-indigo-500/30 hover:border-indigo-400 hover:bg-indigo-500/5 text-zinc-100 hover:text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-200 font-sans cursor-pointer text-sm"
              >
                Abrir Ficha de Evolução Completa <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-7 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl shadow-black/80">
            {/* Simulator Header */}
            <div className="flex justify-between items-center border-b border-zinc-800/80 pb-4">
              <div className="flex items-center gap-2.5">
                <Stethoscope className="w-5 h-5 text-indigo-400" />
                <span className="font-mono text-xs font-bold text-zinc-300">SIMULADOR DE RECEPÇÃO CLÍNICA</span>
              </div>
              <span className="text-[9px] font-mono bg-zinc-950 border border-zinc-850 px-2 py-1 rounded text-zinc-500">STABLE V1.0</span>
            </div>

            {/* Inputs sliders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Temperature */}
              <div className="space-y-2 bg-zinc-950/40 border border-zinc-800/40 p-4 rounded-2xl">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-500 flex items-center gap-1"><Thermometer className="w-3.5 h-3.5 text-orange-400" /> TEMP</span>
                  <span className={`${testTemp >= 38 ? 'text-orange-400 font-bold' : 'text-zinc-300'}`}>{testTemp}°C</span>
                </div>
                <input 
                  type="range" 
                  min="35" 
                  max="41" 
                  step="0.1" 
                  value={testTemp} 
                  onChange={(e) => setTestTemp(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-zinc-600 font-mono">
                  <span>35°C</span>
                  <span>Normal</span>
                  <span>41°C</span>
                </div>
              </div>

              {/* SpO2 */}
              <div className="space-y-2 bg-zinc-950/40 border border-zinc-800/40 p-4 rounded-2xl">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-500 flex items-center gap-1"><Wind className="w-3.5 h-3.5 text-sky-400" /> SpO2</span>
                  <span className={`${testSpo2 < 93 ? 'text-red-400 font-bold' : 'text-zinc-300'}`}>{testSpo2}%</span>
                </div>
                <input 
                  type="range" 
                  min="80" 
                  max="100" 
                  value={testSpo2} 
                  onChange={(e) => setTestSpo2(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-zinc-600 font-mono">
                  <span>80%</span>
                  <span>Normal</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Scale of pain */}
              <div className="space-y-2 bg-zinc-950/40 border border-zinc-800/40 p-4 rounded-2xl">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-500 flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-red-500" /> ESCALA DE DOR</span>
                  <span className={`${testPain >= 8 ? 'text-purple-400 font-bold' : 'text-zinc-300'}`}>{testPain}/10</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  value={testPain} 
                  onChange={(e) => setTestPain(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-zinc-600 font-mono">
                  <span>0 - Sem</span>
                  <span>Atividade</span>
                  <span>10 - Severo</span>
                </div>
              </div>
            </div>

            {/* Dynamic Results Outputs Panel */}
            <div className="bg-zinc-950/70 border border-zinc-850 rounded-2xl p-4 md:p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">MÓDULO DE INTERPRETAÇÃO DE ALERTA (COFEN)</span>
                <span className={`text-[10px] px-2.5 py-1 rounded-full border ${clinicalStatus.alertClass} font-mono font-bold uppercase transition-all duration-300`}>
                  {clinicalStatus.alert}
                </span>
              </div>
              
              <div className="space-y-1.5 leading-relaxed">
                <label className="block text-[9px] font-mono uppercase text-zinc-500 tracking-widest">Protocolo Sugerido de Assistência</label>
                <p className="text-zinc-300 text-sm font-sans transition-all duration-300">
                  {clinicalStatus.protocol}
                </p>
              </div>
            </div>

            {/* Simulated Web3 Block Status */}
            <div className="bg-indigo-950/10 border border-indigo-950/50 p-4 rounded-2xl space-y-2 relative">
              <div className="flex justify-between items-center text-[10px] font-mono text-indigo-400">
                <span className="flex items-center gap-1.5 font-bold uppercase tracking-wide">
                  <Lock className="w-3.5 h-3.5 text-indigo-400" /> Blockchain Cryptographic Anchor
                </span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> CONECTADO EM RUNTIME</span>
              </div>
              
              <div className="font-mono text-[11px] text-zinc-500 truncate select-all" title="Clique para copiar">
                Dados Estruturados Hash: <span className="text-indigo-300/80">{cryptoHash}</span>
              </div>
              <div className="text-[9px] text-zinc-500 font-mono">
                Cada modificação nos parâmetros de entrada recria dinamicamente a assinatura MD5/SHA do Bloco correspondente.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-zinc-950/40 border-t border-b border-zinc-900 py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-indigo-400">Dúvidas Clínicas & Tecnológicas</span>
            <h2 className="text-3xl font-bold tracking-tight text-white mt-1">Perguntas Frequentes</h2>
            <p className="text-zinc-500 text-sm max-w-md mx-auto mt-2 font-sans">
              Saiba tudo sobre segurança da informação, usabilidade hospitalar e nossa arquitetura Web3 de simulação.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-zinc-850/20 cursor-pointer"
                  >
                    <span className="font-bold text-zinc-200 text-sm sm:text-base leading-tight pr-4">
                      {faq.q}
                    </span>
                    <span className={`text-zinc-500 transform transition-transform duration-200 font-mono border border-zinc-800 w-6 h-6 rounded-lg flex items-center justify-center text-xs ${isOpen ? 'rotate-180 text-white border-zinc-700 bg-zinc-800' : ''}`}>
                      v
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-zinc-400 font-sans leading-relaxed border-t border-zinc-800/40 animate-in fade-in duration-300">
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
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-[40px] px-8 py-16 md:py-20 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
          {/* Inner Light Glow */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-600/5 blur-[80px] pointer-events-none" />

          <span className="text-[10px] bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-mono font-bold tracking-widest uppercase inline-block mb-6 relative z-10">
            Posto de Enfermagem Inteligente
          </span>
          
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 relative z-10 max-w-2xl leading-tight">
            Pronto para Elevar Seus Registros Clínicos?
          </h2>
          
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mb-10 relative z-10 leading-relaxed font-sans">
            Experimente gratuitamente a simulação estruturada no StellarCare sandbox. Acesse o painel, adicione pacientes e controle o registro assistencial com total tranquilidade.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10 w-full sm:w-auto">
            <button 
              onClick={() => onEnter("dashboard")}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_10px_35px_rgba(79,70,229,0.5)] transition-all duration-300 text-base cursor-pointer"
            >
              Começar Simulação Agora <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onEnter("register")}
              className="w-full sm:w-auto bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-1.5 transition-all duration-200 text-base cursor-pointer"
            >
              Cadastrar Primeiro Paciente
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block leading-none">StellarCare</span>
              <span className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase block mt-1">Sistematização Assistencial Web3</span>
            </div>
          </div>

          <p className="text-zinc-600 text-xs font-mono text-center md:text-right">
            &copy; {new Date().getFullYear()} StellarCare. Desenvolvido com React, Tailwind e Criptografia Web3 Simulada.
          </p>
        </div>
      </footer>

    </div>
  );
}
