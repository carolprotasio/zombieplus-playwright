![zombieplus](https://github.com/carolprotasio/zombieplus-playwright/blob/main/tests/assets/playwright-zombie.png)
# Projeto Zombie+ 

O Zombie+ é uma aplicação voltada para a automação de testes de regressão de uma plataforma web e API. Originalmente, os testes da aplicação eram realizados de forma manual, conforme documentado [aqui](https://qaxperience.notion.site/Zombie-Regression-Tests-5d726cfee1484a2e9ee177b9467cb00c). O objetivo deste projeto é automatizar esses testes, garantindo a cobertura e a confiabilidade dos principais cenários da aplicação.

## Testes de Regressão Automatizado com Playwright
A transição dos testes manuais para testes automatizados busca:
- Reduzir o tempo necessário para validar funcionalidades.
- Garantir maior cobertura de testes.
- Facilitar a execução de testes de regressão contínuos, assegurando que as funcionalidades principais da aplicação permaneçam intactas com o passar das mudanças.

<img src="https://github.com/carolprotasio/zombieplus-playwright/blob/main/tests/assets/home.png" alt="web" width="700"/>

## Tecnologias Utilizadas
- **Playwright**: Framework para testes automatizados, garantindo a simulação de interações com a interface e API.
- **Node.js**: Plataforma de execução JavaScript utilizada para rodar os testes.
- **PostgreSQL**: Banco de dados relacional para armazenamento de dados da aplicação.
- **pgAdmin**: Ferramenta de administração para o banco de dados PostgreSQL.
- **Docker**: Facilita a criação de ambientes isolados para testes e desenvolvimento.
  - **pgdb**: Container responsável pelo banco de dados.
  - **pgAdmin**: Container para administração do banco.
- **dotenv**: Gerenciamento de variáveis de ambiente, facilitando a configuração dos testes.
- **faker.js**: Biblioteca para geração de dados fictícios, utilizados nos cenários de testes.
  
## Arquitetura do Projeto
O projeto conta com duas camadas principais:
1. **API**: Executada na porta 3333, responsável por fornecer os dados necessários à aplicação.
2. **Interface Web**: A aplicação web opera na porta 3000, onde os testes de interface são executados.
3. **Project Playwright**: Onde foram realizados os testes automatizados 

O ambiente de desenvolvimento é configurado via Docker, utilizando containers tanto para o banco de dados quanto para a administração via pgAdmin.

<img src="https://github.com/carolprotasio/zombieplus-playwright/blob/main/tests/assets/docker.png" alt="web" width="700"/>
<img src="https://github.com/carolprotasio/zombieplus-playwright/blob/main/tests/assets/pgAdmin.png" alt="web" width="700"/>

## Cenários e Casos de Teste

Os testes end-to-end (E2E) são organizados de acordo com os cenários descritos nos testes manuais originais, e cada cenário cobre um conjunto de casos de testes específicos. Abaixo estão alguns dos principais cenários e seus respectivos casos:

#### Cenário 1: Fila de espera (Leads)
- **CT-001**: Deve cadastrar com sucesso um lead na fila de espera
  - **Ação**: Preencher todos os campos obrigatórios (nome e email) com informações válidas e clicar em "Cadastrar".
  - **Resultado esperado**: O lead é cadastrado com sucesso no sistema.
- **CT-002**: Não deve cadastrar um lead com email já cadastrado
  - **Ação**: Preencher todos os campos obrigatórios (nome e email) com email já cadastrado e clicar em "Cadastrar".
  - **Resultado esperado**: Uma mensagem de erro deve ser exibida, informando que o email já está cadastrado.
- **CT-003**: Não deve cadastrar um lead com email incorreto
  - **Ação**: Preencher todos os campos obrigatórios (nome e email) com formato incorreto e clicar em "Cadastrar".
  - **Resultado esperado**: Uma mensagem de erro deve ser exibida, informando que o email está incorreto.
- **CT-004**: Não deve cadastrar se campo "nome" não for preenchido
  - **Ação**: Deixar o campo de nome em branco e clicar em "Cadastrar".
  - **Resultado esperado**: Uma mensagem de erro deve ser exibida, informando que os campos obrigatórios devem ser preenchidos.
- **CT-005**: Não deve cadastrar se campo "email" não for preenchido
  - **Ação**: Deixar o campo de email em branco e clicar em "Cadastrar".
  - **Resultado esperado**: Uma mensagem de erro deve ser exibida, informando que os campos obrigatórios devem ser preenchidos.
- **CT-006**: Não deve cadastrar se os campos obrigatórios não forem preenchidos
  - **Ação**: Deixar os campos de nome e email em branco e clicar em "Cadastrar".
  - **Resultado esperado**: Uma mensagem de erro deve ser exibida, informando que os campos obrigatórios devem ser preenchidos.
  
  <img src="https://github.com/carolprotasio/zombieplus-playwright/blob/main/tests/assets/leads.png" alt="web" width="500"/>

#### Cenário 2: Autenticação de Usuário (Login)
- **CT-001**: Deve autenticar com sucesso usando as credenciais válidas
  - **Ação**: Preencher os campos de email e senha corretamente e clicar em "Login".
  - **Resultado esperado**: O usuário é autenticado com sucesso e redirecionado para a página principal.
- **CT-002**: Não deve autenticar com senha incorreta
  - **Ação**: Preencher o email correto e senha incorreta, clicar em "Login".
  - **Resultado esperado**: Uma mensagem de erro deve ser exibida, informando que as credenciais estão incorretas.
- **CT-003**: Não deve autenticar com email no formato incorreto
  - **Ação**: Preencher o email incorreto e senha válida, clicar em "Login".
  - **Resultado esperado**: Uma mensagem de erro deve ser exibida, informando que as credenciais estão incorretas.
- **CT-004**: Não deve autenticar se os campos obrigatórios não forem preenchidos
  - **Ação**: Deixar os campos de email e senha em branco e clicar em "Login".
  - **Resultado esperado**: Uma mensagem de erro deve ser exibida, informando que os campos obrigatórios devem ser preenchidos.

 <img src="https://github.com/carolprotasio/zombieplus-playwright/blob/main/tests/assets/login.png" alt="web" width="500"/>

#### Cenário 3: Gerenciamento de Filmes (Movie)
- **CT-001**: Deve adicionar um novo filme com sucesso
  - **Ação**: Preencher os campos obrigatórios (título, ano, gênero) e clicar em "Adicionar".
  - **Resultado esperado**: O filme é adicionado com sucesso à lista.
- **CT-002**: Não deve adicionar filme sem preencher os campos obrigatórios
  - **Ação**: Deixar os campos de título, ano ou gênero em branco e clicar em "Adicionar".
  - **Resultado esperado**: Uma mensagem de erro deve ser exibida, informando que os campos obrigatórios devem ser preenchidos.
- **CT-003**: Deve excluir um filme com sucesso
  - **Ação**: Selecionar um filme da lista e clicar em "Excluir".
  - **Resultado esperado**: O filme é removido da lista.
- **CT-004**: Deve editar as informações de um filme com sucesso
  - **Ação**: Selecionar um filme da lista, modificar os dados e clicar em "Salvar".
  - **Resultado esperado**: O filme é atualizado com sucesso na lista.

 <img src="https://github.com/carolprotasio/zombieplus-playwright/blob/main/tests/assets/movies.png" alt="web" width="500"/>

#### Cenário 4: Gerenciamento de Séries de TV (TvShow)
- **CT-001**: Deve adicionar uma nova série de TV com sucesso
  - **Ação**: Preencher os campos obrigatórios (título, ano, número de temporadas) e clicar em "Adicionar".
  - **Resultado esperado**: A série é adicionada com sucesso à lista.
- **CT-002**: Não deve adicionar série de TV sem preencher os campos obrigatórios
  - **Ação**: Deixar os campos de título, ano ou número de temporadas em branco e clicar em "Adicionar".
  - **Resultado esperado**: Uma mensagem de erro deve ser exibida, informando que os campos obrigatórios devem ser preenchidos.
- **CT-003**: Deve excluir uma série de TV com sucesso
  - **Ação**: Selecionar uma série da lista e clicar em "Excluir".
  - **Resultado esperado**: A série é removida da lista.
- **CT-004**: Deve editar as informações de uma série de TV com sucesso
  - **Ação**: Selecionar uma série da lista, modificar os dados e clicar em "Salvar".
  - **Resultado esperado**: A série é atualizada com sucesso na lista.

 <img src="https://github.com/carolprotasio/zombieplus-playwright/blob/main/tests/assets/tvshow.png" alt="web" width="500"/>

 ## Validação com Postman
Além dos testes automatizados desenvolvidos com o Playwright, as funcionalidades descritas acima foram validadas também utilizando o **Postman** para assegurar o comportamento correto das APIs. O Postman permitiu realizar chamadas diretas à API, simulando os cenários de cadastro, login e gerenciamento de filmes e séries, garantindo que os endpoints estavam respondendo conforme esperado.

<img src="https://github.com/carolprotasio/zombieplus-playwright/blob/main/tests/assets/postman.png" alt="web" width="700"/>
 

## Execução do Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado.
- [Docker](https://www.docker.com/) e Docker Compose instalados.

### Passos para executar
1. Clone o repositório:
 ```bash
 git clone https://github.com/carolprotasio/zombieplus-playwright.git
 ```

2. Instale as dependências:
```bash
npm install
```
3. Configure as variáveis de ambiente no arquivo .env com as informações do banco de dados e portas.
4. Suba os containers Docker:
```bash
docker-compose up
```
Execute os testes:
``` bash
npx playwright test
```
## Conclusão
Este projeto demonstrou a importância da automação de testes para garantir a qualidade e a estabilidade de uma aplicação em constante evolução. Com a utilização do Playwright para testes end-to-end e a validação das APIs com o Postman, conseguimos assegurar uma cobertura ampla das principais funcionalidades da aplicação.

## Créditos
Este projeto foi realizado como parte do curso oferecido pela [QA Xperience](https://cursos.qaxperience.com/pt/sobre), onde foram abordadas práticas avançadas de automação de testes e qualidade de software.
