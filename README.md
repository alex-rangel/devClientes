# 🖥️ devClientes (App Desktop com Electron)

Aplicativo desktop simples para cadastro e gerenciamento de clientes, desenvolvido com foco em aprendizado prático de **Electron.js**, a tecnologia que permite criar aplicações desktop com HTML, CSS e JavaScript/TypeScript.

## 🎯 Objetivo do Projeto

Este projeto foi criado com o propósito principal de entender como criar, estruturar e empacotar uma aplicação desktop com Electron, além de treinar conceitos de organização de arquivos e manipulação local de dados com Node.js.

## 🚀 Funcionalidades

- Cadastro de clientes com nome, e-mail e telefone
- Listagem e visualização dos dados
- Armazenamento local (JSON)
- Interface simples com prompts no terminal
- Empacotamento em app desktop com Electron

## 🧰 Tecnologias Utilizadas

- **Electron.js** (estruturação do app desktop)
- **Node.js** + **TypeScript**
- `fs` (manipulação de arquivos)
- `inquirer` (interface CLI)
- `uuid` (geração de IDs únicos)

## 💻 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/alex-rangel/devClientes.git
cd devClientes

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
