<h1>
	Gerenciador de usuários
</h1>
<p align="center">
	Criação de um gerenciador para a realização das operações de CRUD (Create, Read, Update, Delete).
</p>
<p align="center">
<h4 align="center">   :computer: Gerenciador de usuários 🚀 Concluído ✔️ :computer:</h4></p>
<p align="center">

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/nancyuzawa/Gerenciador-de-usuarios-com-CRUD?color=%2304D361">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/nancyuzawa/Gerenciador-de-usuarios-com-CRUD">
  <a href="https://github.com/tgmarinho/nlw1/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/nancyuzawa/Gerenciador-de-usuarios-com-CRUD">
  </a>
</p>


<p align="center">  
	<a href="#sobre">Sobre</a> • <a href="#demo">Demonstração da aplicação</a> • <a href="#tecnologias">Tecnologias</a> 
</p>

<h2 id="sobre">
	Sobre o projeto
</h2>
<p>
  É um sistema simples desenvolvido com Vite, para gerenciar os usuários do sistema por meio das operações de CRUD (Criar, Ler, Atualizar e Excluir). Além disso, ele permite arquivar e desarquivar dados. Ademais, o sistema é integrado a um banco de dados que possibilita armazenar e manipular as informações.
</p>

<h2 id="demo">
	Demonstração da aplicação
<p>
  
https://github.com/user-attachments/assets/c4245ff6-6c16-4943-9e93-e652e188c7c3

</p>
	
</h2>
<h2 id="tecnologias">
	Tecnologias
</h2>
<h3>Ferramenta para desenvolvimento</h3>
  <ul>
    <li>Vite</li>
  </ul>
  <h3>Back-end</h3> 
  <ul>
    <li>Node.js – Ambiente de execução JavaScript no servidor.</li>
    <li>Express.js – Framework para criação de APIs e gerenciamento de rotas.</li>
    <li>dotenv – Carrega as configurações do arquivo `.env`.</li>
    <li>MySQL2 – Biblioteca para conectar e usar o banco de dados MySQL.</li>
    <li>Cors – Permite que a API receba requisições de outros domínios.</li>
    <li>RESTful API – Estrutura de endpoints para operações CRUD.</li>
  </ul>
  <h3>Front-end</h3>
  <ul>
    <li>React.js – Biblioteca para construção de interfaces dinâmicas.</li>
    <li>Axios – Ferramenta para fazer requisições HTTP à API.</li>
    <li>react-data-table-component – Componente para criação de tabelas interativas com paginação, ordenação e seleção de linhas.</li>
    <li>react-router-dom – Gerenciamento de rotas e navegação entre páginas.</li>
    <li>CSS – Estilização dos componentes.</li>
  </ul>

<h2>Inicializando o projeto na sua máquina</h2>
<h3>1. Clone o repositório</h3>

```bash
git clone https://github.com/nancyuzawa/Gerenciador-de-usuarios-com-CRUD.git
```

<h3>2. Instale as dependências</h3>
<p>
  O projeto possui dois arquivos <code>package.json</code>:
  </p> 
    <ul> 
      <li><code>./package.json</code> (projeto principal)</li> 
      <li><code>./backend/package.json</code> (back-end)</li> 
    </ul>
</p>

Navegue até cada pasta e execute o comando abaixo no terminal:
```bash
npm install
```

<h3>3. Configure o arquivo <code>.env</code>code></h3>

 <p>
   No diretório <code>backend</code>, crie um arquivo chamado <code>.env</code> e adicione as seguintes variáveis:
 </p>
 
 ```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=    #SUA SENHA DO BANCO DE DADOS
DB_NAME=meu_banco_teste    # NOME DO SEU BANCO
DB_PORT=3306    #GERALMENTE ESSA É A PORTA PADRÃO, AJUSTE SE NECESSÁRIO 
```

<h3>4. Inicializando a aplicação</h3>

Por fim, na raiz do projeto execute o código abaixo que iniciará o projeto em um navegador: 
```bash
npm run dev
```
</br>
</br>


<p align="center">
	Feito com ❤️ por Nancy Yuzawa. 
</p>
<p align="center">
	👋 <a href="https://www.linkedin.com/in/nancy-yuzawa">Entre em contato</a>
</p>
<div align = "center">🌿•₊✧💻⋆⭒˚☕️｡⋆</div>
