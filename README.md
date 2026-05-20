# StellarCare 🏥

Um sistema avançado de Sistematização da Assistência de Enfermagem (SAE) e Prontuário Eletrônico do Paciente (PEP). Focado em fornecer monitoramento clínico em tempo real e evoluções de enfermagem estruturadas e seguras.

## 🚀 Funcionalidades

- **Monitoramento Clínico**: Acompanhe os sinais vitais dos pacientes em tempo real em um dashboard intuitivo, com gráficos históricos e status unificado.
- **Evolução de Enfermagem Estruturada**: Formulário automatizado para preenchimento ágil de parâmetros vitais, controles, ações de intervenção (curativos, medicação) e anotações abertas.
- **Inteligência Assistencial**: Simulação de um motor inteligente que avalia parâmetros (febre, hipotermia, queda de saturação, dor) fornecendo alertas proativos e protocolos de conduta imediatos.
- **Assinatura Eletrônica e Auditoria**: Cada evolução assistencial assinada digitalmente gera um registro com timestamp e simulação de hash SHA256 criptográfico, garantindo imutabilidade para rastreabilidade de auditoria.
- **Modo Escuro (Dark Mode)**: Tema cuidadosamente planejado com alta legibilidade (Dark Slate & Teal) voltado para uso noturno seguro em unidades de internação.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18, Vite, Typecript e Tailwind CSS com utilitários avançados de responsividade.
- **Gráficos**: Recharts para plotagem de sinais vitais.
- **Design/UI**: Telas modernas com bordas responsivas, cantos arredondados, fontes padronizadas ("Inter" para UI, "JetBrains Mono" para métricas clínicas) e iconografia via Lucide-React.

## 📦 Como Executar

1. Clone o repositório
2. Instale as dependências com `npm install`
3. Execute o servidor de desenvolvimento com `npm run dev`
4. Acesse o IP gerado na porta padrão via navegador.

## 🛡️ Segurança

Foi projetado tendo em mente as normas contemporâneas do COFEN para garantia técnica da anotação, prevenindo adulterações retrospectivas.
