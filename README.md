# SmartMonitor

Sistema de Monitoramento IoT em Tempo Real desenvolvido como projeto acadêmico da disciplina de Sistemas Distribuídos.

## Sobre o Projeto

O SmartMonitor é uma solução de monitoramento remoto composta por:

* Aplicativo Mobile (React Native + Expo)
* API Backend (Node.js + Express)
* Banco de Dados PostgreSQL
* Painel Administrativo Web

O sistema permite que dispositivos móveis enviem informações em tempo real para uma API centralizada, possibilitando o monitoramento remoto através de um painel web.

---

## Funcionalidades

### Aplicativo Mobile

* Monitoramento de bateria
* Monitoramento de conexão de internet
* Monitoramento de energia
* Monitoramento do sistema operacional
* Monitoramento do modelo do dispositivo
* Atualização automática dos dados
* Simulação de perda de conexão para fins acadêmicos

### Painel Web

* Visualização dos dispositivos conectados
* Status Online/Offline
* Última sincronização do dispositivo
* Visualização dos sensores cadastrados
* Login de usuário
* Atualização automática dos dados

### Backend

* API REST
* Cadastro de usuários
* Autenticação
* Atualização dos sensores
* Consulta dos dispositivos monitorados

---

## Arquitetura do Sistema

```text
Aplicativo Mobile
        |
        | HTTP/REST
        v
API Node.js (Render)
        |
        | SQL
        v
PostgreSQL (Supabase)
        |
        v
Painel Web Administrativo
```

---

## Tecnologias Utilizadas

### Mobile

* React Native
* Expo
* TypeScript

### Backend

* Node.js
* Express.js

### Banco de Dados

* PostgreSQL
* Supabase

### Frontend Web

* HTML
* CSS
* JavaScript
* Bootstrap

### Hospedagem

* Render
* Supabase

---

## Sistemas Distribuídos

### Comunicação

O sistema utiliza protocolo HTTP através de uma API REST para comunicação entre cliente e servidor.

### Concorrência

Múltiplos dispositivos podem enviar informações simultaneamente para a API, sendo processados de forma concorrente pelo servidor.

### Escalabilidade

A arquitetura permite expansão horizontal através da criação de múltiplas instâncias da API utilizando Load Balancer.

### Tolerância a Falhas

Caso um dispositivo perca conexão com a internet:

* O envio de dados é interrompido.
* O painel identifica automaticamente o dispositivo como Offline.
* Quando a conexão é restabelecida, o dispositivo volta a sincronizar normalmente.

### Atualização Assíncrona

O aplicativo envia informações periodicamente para a API sem bloquear a interface do usuário, utilizando operações assíncronas.

---

## Demonstração Acadêmica

Foi implementada uma funcionalidade de simulação de perda de conexão.

Observação:

Por questões de segurança dos sistemas Android e iOS, aplicativos não possuem permissão para desligar Wi-Fi ou dados móveis diretamente. Portanto, a funcionalidade foi simulada apenas para demonstração dos conceitos de sistemas distribuídos.

---

## Estrutura do Projeto

```text
smartmonitor/

├── mobile/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   └── services/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   └── database/
│
├── painel-web/
│   ├── css/
│   ├── js/
│   └── pages/
│
└── README.md
```

---

## Integrantes

* Davidson Augusto Pereira de Sousa - 12824126439
* João Paulo de Lima Félix - 12824127355
* Maurilio Fernando Pereira Araújo da Silva - 12824139124
* Jardeson Dhyego Borges de Sá - 12824126522
* Giovanne Batista da Silva - 12824125201
* Pedro Jorge Pontes Bandarrinha - 12825128079


---

## Disciplina

Sistemas Distribuídos

Projeto acadêmico desenvolvido para demonstração dos conceitos de:

* Sistemas Distribuídos
* Concorrência
* Escalabilidade
* Comunicação Cliente-Servidor
* Tolerância a Falhas
* APIs REST

