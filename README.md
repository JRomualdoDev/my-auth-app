<a id="readme-top"></a>

[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]

<br />
<div align="center">
  <a href="https://github.com/JRomualdoDev/my-auth-app">
    <img src="https://raw.githubusercontent.com/JRomualdoDev/my-auth-app/refs/heads/master/public/screen.png?raw=true" alt="Logo" width="880" height="480">
  </a>

  <h3 align="center">My auth App</h3>

  <p align="center">
    App para autenticação com Next.js Prisma, Zod, Tailwind e Postgres.
    <br />
    <a href="https://github.com/JRomualdoDev/my-auth-app"><strong>Explore »</strong></a>
    <br />
  </p>
</div>

<details>
  <summary>Itens</summary>
  <ol>
    <li>
      <a href="#about-the-project">Sobre o Projeto</a>
      <ul>
        <li><a href="#built-with">Construido com </a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Conhecimentos</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Sobre o Projeto

Projeto de um login e cadastro de usuário com nextjs, prisma, zod, tailwind e postgres.
Utilizando o Next.js como framework, Prisma como ORM, Zod para validação de dados, Tailwind para estilização e Postgres como banco de dados.
Utilizado também o Zustand para gerenciamento de estado. Jsonwebtoken para autenticação.

O projeto conta com seguintes exemplos:
* Criação de usuário.
* Login do usuário.
* Armazenamento token no zustand.
* Armazenamento cookie para segurança.
* Logout do usuário.
* Verificação de token.
* Verificação de usuário.
* Autenticação de rotas.
* Autenticação de rotas com middleware.
* Utilização do CSRF token.

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>


### Construido com 

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Prisma][Prisma.js]][Prisma-url]
* [![Zod][Zod]][Zod-url]
* [![Tailwind][Tailwind]][Tailwind-url]
* [![Postgres][Postgres]][Postgres-url]

## Getting Started

Este é um exemplo de como você pode rodar o projeto local.
Para rodar local apenas copie e siga estes simples passos.

### Instalação

1. Clone o repositório
   ```sh
        git clone https://github.com/JRomualdoDev/my-auth-app
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Configure o arquivo .env
   ```sh
   DATABASE_URL=
   JWT_SECRET=
   ```
4. Execute o projeto
   ```sh
   npm run dev
   ```

Caso utilize o docker para rodar o projeto:
1. Clone o repositório
   ```sh
        git clone https://github.com/JRomualdoDev/my-auth-app
   ```
2. Execute o docker-compose
   ```sh
   docker-compose up -d
   ```

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## License

Distributed under the Unlicense License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Contact

José Romualdo - jromualdo3@hotmail.com

Project Link: [https://github.com/JRomualdoDev/my-auth-app](https://github.com/JRomualdoDev/my-auth-app.git)

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

[stars-url]: https://github.com/JRomualdoDev/todo-list-app/stargazers
[stars-shield]: https://img.shields.io/github/stars/JRomualdoDev/todo-list-app?style=for-the-badge
[issues-url]: https://github.com/JRomualdoDev/todo-list-app/issues
[issues-shield]: https://img.shields.io/github/issues/JRomualdoDev/todo-list-app?style=for-the-badge
[license-url]: https://github.com/JRomualdoDev/todo-list-app/blob/main/LICENSE
[license-shield]: https://img.shields.io/github/license/JRomualdoDev/todo-list-app?style=for-the-badge

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Prisma.js]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=fff
[Prisma-url]: https://www.prisma.io/
[Zod]: https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=fff
[Zod-url]: https://www.prisma.io/
[Tailwind]: https://img.shields.io/badge/Tailwindcss-06B6D4?style=for-the-badge&logo=zod&logoColor=61DAFB
[Tailwind-url]: https://tailwindcss.com/
[Postgres]: https://img.shields.io/badge/Postgres-4169E1?style=for-the-badge&logo=postgresql&logoColor=fff
[Postgres-url]: https://www.postgresql.org/