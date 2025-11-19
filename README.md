# 🌍 Geopedia

**Geopedia** é uma aplicação Full Stack desenvolvida para o gerenciamento e exploração de dados geográficos. O projeto permite o cadastro, edição, exclusão e visualização de **Continentes**, **Países** e **Cidades**, integrando-se a APIs externas para enriquecer a experiência do usuário com dados em tempo real.

## 🚀 Sobre o Projeto

O sistema foi construído com foco em performance e usabilidade, utilizando **React** com TypeScript no front-end e **Node.js/Express** no back-end, com persistência de dados em **PostgreSQL**.

A aplicação não se limita a um CRUD básico; ela enriquece os dados locais consumindo serviços externos para buscar bandeiras, informações demográficas e dados climáticos em tempo real.

## ✨ Funcionalidades Principais

* **CRUD Completo:** Gerenciamento de Continentes, Países e Cidades com relacionamentos no banco de dados.
* **Integração com APIs Externas:**
    * **REST Countries:** Busca automática de bandeiras e preenchimento de dados (população, idioma, moeda) ao cadastrar países.
    * **OpenWeatherMap:** Busca automática de coordenadas (latitude/longitude) e exibição do **clima em tempo real** (temperatura, umidade, vento) para as cidades.
* **Interface Rica:**
    * **Tabelas Dinâmicas:** Com suporte a ordenação por colunas e filtros de pesquisa (texto e por entidade pai).
    * **Paginação:** Implementação robusta para lidar com grandes volumes de dados.
    * **Modais Interativos:** Formulários e painéis laterais de detalhes com animações suaves.
* **Responsividade:** Layout adaptável para desktops, tablets e dispositivos móveis.

## 🛠️ Tecnologias Utilizadas

### Front-end
* React (Vite)
* TypeScript
* CSS3 (com animações e variáveis)
* Bootstrap Icons

### Back-end
* Node.js
* Express
* TypeScript
* pg (node-postgres)

### Banco de Dados
* PostgreSQL

## 🔌 APIs Externas
* [REST Countries](https://restcountries.com/)
* [OpenWeatherMap](https://openweathermap.org/)

---

## 🚀 Como Executar o Projeto

### 📦 Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

* **[Node.js](https://nodejs.org/)** (Versão 18 ou superior recomendada)
* **[PostgreSQL](https://www.postgresql.org/)** (Para o banco de dados)
* **[Git](https://git-scm.com/)** (Para clonar o repositório)
* Um editor de código, como o **[VSCode](https://code.visualstudio.com/)**

---

### 🎲 Rodando a Aplicação

Siga o passo a passo abaixo para configurar o ambiente localmente.

#### 1. Clone os Repositórios

Abra o seu terminal e execute:

```bash
git clone https://github.com/ViniElias/Geopedia-Frontend
git clone https://github.com/ViniElias/Geopedia-Backend
```

Abra-os em terminais separados:

```bash
cd Geopedia-Frontend
cd Geopedia-Backend
```

#### 2. Configurando as Variáveis de Ambiente

No backend, crie o arquivo de variáveis de ambiente:

```bash
cp .env.template .env
```

E substitua os valores genéricos no **.env** com seu **Nome de usuário e senha do PostgreSQL** (definidos na instalação) e **Chave da API.**
**Observação:** O usuário padrão de instalação é "postgres".

#### 3. Configurando o Banco de Dados

Certifique-se de que seu serviço PostgreSQL esteja em execução. Após isso, acesse seu terminal:

```bash
psql -U postgres
```

Crie o banco:
```sql
CREATE DATABASE geopedia;
```

Saia do psql:
```sql
\q
```

Acesse a pasta do Backend:
```bash
cd Geopedia-Backend/
```

Execute o comando de inicialização das tabelas:
```bash
psql -U postgres -d geopedia -f init.sql
```

Caso desejar, pode fechar esse terminal.

#### 4. Instalando Dependências

Tanto no Front quanto no Back, execute:
```sh
npm install
```

Execute com:

```sh
npm run dev
```

Acesse no navegador em **http://localhost:5173/**