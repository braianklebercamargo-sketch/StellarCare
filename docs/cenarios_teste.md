# Cenários de Teste e Limites (Sinais Vitais e Alertos IA)

**Objetivo:** Este documento lista os critérios absolutos e de fronteiras (boundaries) usados no sistema para classificar o paciente em status normal ou de alerta.

---

## 1. Mapeamento de Limites e Variações

| Sinal Vital | Padrão Normal | Alerta Baixo | Alerta Alto |
| :--- | :--- | :--- | :--- |
| **Temperatura (°C)** | `>= 35.5` e `< 38.0` | `< 35.5` (Hipotermia) | `>= 38.0` (Hipertermia/Febre) |
| **Saturação SpO2 (%)** | `>= 93%` | `< 93%` (Hipóxia Severa) | - |
| **Dor** | `< 8` | - | `>= 8` (Dor Severa) |

---

## 2. Cenários e Condutas Simuladas

### CT01: Estabilidade Clínica (Parâmetros Normais)
* **Condição:** Temp `36.5°C`, SpO2 `98%`, Dor `2`.
* **Retorno/Ação Esperada do Motor:** Nenhuma bandeira de risco. Mensagem _"Parâmetros Normais"_. Protocolo sugerido: _"Manter monitoramento de rotina e registrar periodicamente."_ Cor associada: **Verde** (Success).

### CT02: Limite para Hipotermia
* **Condição:** Temp = `35.4°C` (e SpO2 `> 92`, Dor `< 8`).
* **Retorno/Ação Esperada do Motor:** Bandeira de _"Alerta: Hipotermia"_. Protocolo Sugerido: _"Aplicar mantas de aquecimento passivo... evitar correntes"_. Cor associada: **Azul Informativo** (Info).

### CT03: Fronteira Térmica (Febre)
* **Condição:** Temp = `38.0°C` (e SpO2 `> 92`, Dor `< 8`).
* **Retorno/Ação Esperada do Motor:** Identificação de _"Alerta: Hipertermia / Febre"_. Protocolo sugestivo focado em resfriamento físico e antitérmicos. Cor associada: **Amarelo/Laranja** (Warning).

### CT04: Queda de Saturação (Hipóxia)
* **Condição:** Temp = `36°C`, Dor = `2`, SpO2 = `92%`.
* **Retorno/Ação Esperada do Motor:** O gatilho de oxigênio (`SpO2 < 93`) sobrepõe alertas leves. Categoria de risco imediato. Mensagem _"Gravidade: Hipóxia Clínico"_. Protocolo demanda elevar posição (Fowler) e acionar circuito O2. Cor associada: **Vermelho** (Danger - Background pulsante).

### CT05: Agravo Multiplicado (Febre + Hipóxia)
* **Condição:** Temp = `38.5°C` e SpO2 = `89%`.
* **Retorno/Ação Esperada do Motor:** Mensagem composta _"Gravidade: Febre + Queda de Saturação"_. Prioridade aos cuidados respiratórios e notificação de plantão. Cor: **Vermelho**.

### CT06: Pico de Dor Excruciante
* **Condição:** Temp `36°C`, SpO2 `99%`, Dor = `8`.
* **Retorno/Ação Esperada do Motor:** Reconhecimento do limiar. Causa de _"Queixa: Dor Severa (8/10)"_. Exige protocolo SOS de prescrição agressiva e acolhimento humano. Cor: Vermelho claro/Rosa (Danger level alterado).
