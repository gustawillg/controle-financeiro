## Controle Financeiro

Um aplicativo web para gerenciamento de finanças pessoais.

### Instalação

Para instalar e executar o aplicativo localmente, siga estas etapas:

1. Clone o repositório do projeto do GitHub:

```
git clone https://github.com/gustawillg/controle-financeiro
```

2. Navegue até o diretório do projeto:

```
cd controle-financeiro
```

3. Instale as dependências do projeto:

```
npm install
```

4. Inicie o servidor de desenvolvimento:

```
npm run serve
```

5. Acesse o aplicativo em seu navegador no endereço `http://localhost:8080`.

### Tecnologias Utilizadas

- Vue.js: Framework JavaScript para construção de interfaces de usuário.
- Node.js: Ambiente de tempo de execução JavaScript para o backend.
- Express: Framework web para Node.js.
- MongoDB: Banco de dados NoSQL para armazenamento de dados.
- Tailwind CSS: Framework CSS para estilização do aplicativo.

### Arquitetura do Projeto

O projeto Controle Financeiro segue uma arquitetura cliente-servidor, onde o frontend é construído com Vue.js e o backend é desenvolvido com Node.js e Express. O banco de dados MongoDB é utilizado para armazenar os dados das transações financeiras.

A comunicação entre o frontend e o backend é realizada por meio de requisições HTTP usando o protocolo RESTful.

### Funcionalidades Principais

O aplicativo Controle Financeiro oferece as seguintes funcionalidades principais:

- Registro e visualização de transações financeiras.
- Filtro de transações por data, tipo e categoria.
- Geração de relatórios mensais.
- Interface de usuário amigável e responsiva.

### Contribuição

Se deseja contribuir com o projeto, siga estas etapas:

1. Faça um fork do repositório.
2. Clone o repositório forkado em sua máquina local.
3. Crie uma branch para sua nova funcionalidade ou correção de bugs: `git checkout -b feature/nova-funcionalidade`.
4. Faça suas alterações e comite-as: `git commit -m 'Adiciona nova funcionalidade'`.
5. Faça push para a branch: `git push origin feature/nova-funcionalidade`.
6. Abra um Pull Request na branch principal do repositório.


