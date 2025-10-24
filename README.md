# Projeto de Agendamento de Serviço no Petshop

`CURSO: RocketSeat - Full-Stack`

`DISCIPLINA: JavaScript`

Este projeto é uma aplicação web intuitiva e responsiva desenvolvida para otimizar o gerenciamento de agendamentos em clínicas veterinárias, pet shops e centros de estética animal. Com uma interface limpa e funcionalidades essenciais, o Agendamentos PetCare simplifica a vida de profissionais e tutores, garantindo que nenhum compromisso seja perdido e que seus clientes peludos recebam o cuidado no horário certo.

## Funcionalidades Principais

* **Visualização Dinâmica de Agendamentos:** Navegue facilmente pelos agendamentos diários. A lista é atualizada em tempo real com base na data selecionada, mostrando os compromissos organizados por períodos (manhã, tarde e noite).
* **Agendamento Simplificado:** Adicione novos agendamentos de forma rápida e eficiente através de um modal interativo. Insira detalhes como nome do cliente, nome do pet, descrição do serviço e selecione a data e hora disponíveis.
* **Gestão de Horários:** Horários já ocupados ou no passado são automaticamente desabilitados no formulário de agendamento, evitando conflitos e agilizando o processo.
* **Remoção de Agendamentos:** Cancele compromissos com facilidade através de um botão de remoção, com confirmação via modal para prevenir exclusões acidentais.
* **Feedback Visual Claro:** Receba notificações de sucesso ou erro (agendamento, exclusão) na interface, proporcionando uma experiência de usuário fluida e transparente.

## Linguagens e Tecnologias Utilizadas

Este projeto foi construído utilizando uma combinação moderna de tecnologias web para garantir robustez, manutenibilidade e uma excelente experiência de usuário:

* **Front-end:**
    <div style="display: inline_block"><br/>
        <code><img width="40px"  alig="center" alt="Html" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg"></code>
        <code><img width="40px" alig="center" alt="Css" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain-wordmark.svg"></code>
        <code><img width="40px" alig="center" alt="JavaScript" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"></code>
    </div>

* **Back-end:**
    <div style="display: inline_block"><br/>
        <code><img width="40px"  alig="center" alt="JavaScript" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg"></code>
        <code><img width="40px" alig="center" alt="json" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-plain.svg"></code>
    </div>

## Ferramentas de Desenvolvimento e Build (devDependencies):

* __@babel/core__, __@babel/preset-env__, __babel-loader__: Ferramentas para transpilar o JavaScript moderno (ES6+) para ser compatível com diversos navegadores.
* __webpack__, __webpack-cli__, __webpack-dev-server__: Empacotador de módulos JavaScript, linha de comando e servidor de desenvolvimento para construir, otimizar e servir a aplicação.
* __copy-webpack-plugin__: Copia arquivos ou diretórios para o diretório de build.
* __css-loader__, __style-loader__: Carregadores para o Webpack que permitem importar arquivos CSS em módulos JavaScript e injetá-los no DOM.
* __html-webpack-plugin__: Simplifica a criação de arquivos HTML para servir os bundles do Webpack.


## Como Rodar o Projeto (Instruções)
Para rodar este projeto localmente, siga os passos abaixo:

1. **Clone o repositório**
2. **Instale as dependências:** npm install (ou yarn install)
3. **Inicie o JSON-Server (Backend Simulado):** Abra um novo terminal e execute: (json-server --watch db.json --port [número da porta da sua API])
4. **Inicie o Frontend:** Abra outro terminal e execute: npm start (ou npm run dev, dependendo do seu package.json script)

O projeto deverá abrir automaticamente no seu navegador em http://localhost:8080 (ou outra porta configurada pelo Webpack Dev Server).

## Códigos do sistema agendamento

Abaixo estará o caminho para a pasta com a codificação do sistema

** [Código Sistema de agendamento](/src)

## Desenvolvido

* Thiago Ferreira de Oliveira

## Orientador

* Rodrigo Gonçalves - RocketSeat


