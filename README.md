# 💡 SmartHub - Sistema de Lâmpadas Inteligentes

Projeto de automação residencial utilizando **React Native**, **ESP32** e **MQTT (HiveMQ)** para controlar lâmpadas de forma remota e em tempo real.

---

## 🚀 Tecnologias Utilizadas

- **React Native com Expo** — Aplicativo mobile
- **ESP32** — Microcontrolador para controle físico das lâmpadas
- **MQTT (HiveMQ)** — Protocolo de comunicação leve e eficiente
- **JavaScript / C++** — Lógica de controle no app e firmware
- **WebSocket (quando necessário)** — Alternativa em ambientes mobile

---

## 📱 Funcionalidades

- Controle de múltiplas lâmpadas pelo app (quarto, sala, cozinha, etc.)
- Feedback visual no app ao acionar uma lâmpada
- Comunicação em tempo real entre o app e o ESP32
- Scroll e organização por cômodos
- Conexão segura via HiveMQ (WebSocket MQTT Broker)

---

## 🧠 Como Funciona

1. O app envia comandos via MQTT para o tópico `SmartHub`.
2. O ESP32, conectado ao mesmo broker, escuta esse tópico.
3. Ao receber o comando, ele aciona o relé da lâmpada correspondente.
4. O app atualiza a interface para refletir o status (ex: muda a cor do botão).

---


## 🧪 Testar Localmente

### 📦 Instalação

```bash
git clone https://github.com/seu-usuario/TrabalhoIOT.git
cd TrabalhoIOT/SmartHub APP
npm install
npx expo start
