# Documento de Requisitos do Produto (PRD)

## 1. Visão Geral
Este PRD rege a construção da aplicação Nexura Care (StellarCare). O sistema atua como o prontuário eletrônico primário do posto de enfermagem hospitalar. Foca na usabilidade para uso recorrente e agilidade analítica. 

## 2. Requisitos Funcionais

- **RF01 - Admssão:** Permite admitir e cadastrar novos pacientes informando queixa principal, leito e dados pessoais.
- **RF02 - Painel Administrativo:** Exibe um Dashboard analítico e limpo com listagem de pacientes, status consolidado, tendências recentes de sinais vitais e os sinais numéricos na interface.
- **RF03 - Ficha de Evolução:** Formulário estruturado para preenchimento ágil. Deve registrar higiene, medicações de horário e os parâmetros pontuais de forma controlada.
- **RF04 - Motor de Regras e Alertas:** A plataforma deve avaliar constantemente via inteligência clínica:
  - Temperatura.
  - Saturação de Oxigênio (SpO2).
  - Dor subjetiva (0 a 10).
- **RF05 - Criptologia Ativa (Auditoria):** As evoluções submetidas geram um carimbo de tempo combinado a um Hash SHA-256 usando os dados clínicos + usuário, servindo como assinatura jurídica simulada imutável.

## 3. Requisitos Não Funcionais

- **RNF01 (Desempenho e Ferramental):** A ser construído sob ambiente React (Vite) / TypeScript, estilizado com Tailwind CSS e utilitários da biblioteca Recharts.
- **RNF02 (Identidade Clean UI):** Aplicação compulsória do Nexura Care Design System. As interfaces não podem possuir modos dark vibrantes, devendo utilizar o tema claro e clínico, focando-se em `--bg-page` de `#F5F8FF`.
- **RNF03 (Escalabilidade Tipográfica):** O espaçamento obedece à escala base multi-step (base de 4px) e apenas será aceita a família de fontes estrita **Manrope**.

## 4. Regras de Avaliação Semântica (Business Logic)
1. **Regra de Estabilidade Imutável:** Registros gravados no Dashboard assumem caráter jurídico; não existe operação de 'edição' ou 'delete' na interface de evolução após sua assinatura.
2. **Prioridade de Agravamento Clínico:** Quando a saturação estiver muito baixa, o sistema unifica alertas, suprimindo o alerta normal e priorizando gravidade extrema (Ex: "Gravidade: Hipóxia Clínico").
