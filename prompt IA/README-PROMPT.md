# EcoLivros — Prompt Mestre

> Documento de referência para qualquer agente de IA recriar a aplicação EcoLivros do zero, com frontend, backend e banco de dados, exatamente como está hoje.

---

# Missão

Desenvolver a plataforma **EcoLivros** completa: uma aplicação web para doação e troca de livros entre estudantes e leitores.

A aplicação é composta por:

- **Frontend:** React + Vite, hospedado na Vercel
- **Backend:** Java Spring Boot com autenticação JWT, hospedado no Render
- **Banco de dados:** PostgreSQL

---

# Papel do Agente

- Arquiteto de Software Sênior
- Tech Lead Full Stack
- Responsável por frontend, backend, banco de dados e deploy

Prioridades:

1. Código limpo e mínimo
2. Componentização
3. Escalabilidade
4. Responsividade
5. Segurança (JWT, CORS)
6. Boa experiência do usuário

---

# Stack

## Frontend
- React 18
- Vite
- JavaScript
- React Router DOM
- CSS puro (sem frameworks)

## Backend
- Java 17
- Spring Boot 3.2
- Spring Security
- Spring Data JPA
- JWT (jjwt 0.11.5)
- Lombok

## Banco de dados
- PostgreSQL

## Deploy
- Frontend: Vercel
- Backend + Banco: Render

---

# Estrutura do Frontend

```
src/
├── assets/
├── components/
│   ├── common/
│   │   ├── Avatar.jsx
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── Input.jsx
│   │   ├── SearchBar.jsx
│   │   └── TextArea.jsx
│   ├── layout/
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   └── books/
│       └── BookCard.jsx
├── layouts/
│   └── MainLayout.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Cadastro.jsx
│   ├── Feed.jsx
│   ├── Pesquisa.jsx
│   ├── CadastroLivro.jsx
│   ├── DetalhesLivro.jsx
│   ├── Perfil.jsx
│   ├── Chat.jsx
│   └── NotFound.jsx
├── routes/
│   └── AppRoutes.jsx
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── booksService.js
│   ├── profileService.js
│   └── chatService.js
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

# Estrutura do Backend

```
src/main/java/com/ecolivros/
├── EcolivrosApplication.java
├── config/
│   └── SecurityConfig.java
├── controller/
│   ├── AuthController.java
│   ├── BookController.java
│   ├── ChatController.java
│   ├── GlobalExceptionHandler.java
│   ├── ProfileController.java
│   └── UserController.java
├── dto/
│   ├── AuthDTO.java
│   ├── BookDTO.java
│   ├── MessageDTO.java
│   └── ProfileDTO.java
├── entity/
│   ├── Book.java
│   ├── Message.java
│   └── User.java
├── repository/
│   ├── BookRepository.java
│   ├── MessageRepository.java
│   └── UserRepository.java
├── security/
│   ├── JwtFilter.java
│   ├── JwtUtil.java
│   └── UserDetailsServiceImpl.java
└── service/
    ├── AuthService.java
    ├── BookService.java
    ├── ChatService.java
    └── ProfileService.java
```

---

# Banco de dados — Entidades

## User
| Campo | Tipo |
|---|---|
| id | Long (PK) |
| name | String |
| email | String (unique) |
| password | String (BCrypt) |
| phone | String |
| city | String |
| avatarUrl | TEXT (Base64) |

## Book
| Campo | Tipo |
|---|---|
| id | Long (PK) |
| title | String |
| author | String |
| category | String |
| location | String |
| type | String (Doacao/Troca) |
| condition | String |
| description | TEXT |
| imageUrl | TEXT (Base64) |
| owner | FK → User |
| createdAt | LocalDateTime |

## Message
| Campo | Tipo |
|---|---|
| id | Long (PK) |
| sender | FK → User |
| receiver | FK → User |
| text | TEXT |
| sentAt | LocalDateTime |

---

# Endpoints do Backend

## Auth (público)
| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/auth/register` | Cadastro de usuário |
| POST | `/api/auth/login` | Login, retorna JWT |

## Books
| Método | Rota | Acesso |
|---|---|---|
| GET | `/api/books` | Público |
| GET | `/api/books?search=termo` | Público |
| GET | `/api/books/{id}` | Público |
| GET | `/api/books/my` | Autenticado |
| POST | `/api/books` | Autenticado |
| DELETE | `/api/books/{id}` | Autenticado (só dono) |

## Perfil
| Método | Rota | Acesso |
|---|---|---|
| GET | `/api/profile` | Autenticado |

## Usuários
| Método | Rota | Acesso |
|---|---|---|
| GET | `/api/users/{id}` | Público |
| PUT | `/api/users/me` | Autenticado |

## Chat
| Método | Rota | Acesso |
|---|---|---|
| GET | `/api/chat/contacts` | Autenticado |
| GET | `/api/chat/{userId}` | Autenticado |
| POST | `/api/chat` | Autenticado |

---

# Telas e Comportamentos

## Navbar
- Logo "E" com gradiente lilás
- Links: Home, Feed, Pesquisa, Chat, Perfil
- Se **não logado**: botões "Entrar" e "Cadastrar"
- Se **logado**: botão "Sair" que faz logout e redireciona para Home

## Home
- Hero com título, descrição e dois botões (Ver livros / Cadastrar livro)
- Painel de impacto com números da plataforma
- Grid com 3 livros mais recentes do banco

## Login
- Formulário com e-mail e senha
- Ao autenticar, salva token e dados do usuário no localStorage
- Redireciona para Feed após login

## Cadastro
- Campos: nome, telefone, e-mail, cidade, senha, confirmar senha
- Checkbox de termos
- Redireciona para Feed após cadastro

## Feed
- Resumo: total de livros, doações e trocas
- Grid de cards de livros buscados da API
- Botão "Publicar livro"

## Pesquisa
- Barra de busca por título, autor ou categoria
- Resultados em tempo real via API com debounce pelo useEffect

## Cadastro de Livro
- Campos: título, autor, categoria, localização, tipo (select), estado (select), foto (upload → Base64), descrição
- Preview da foto antes de salvar
- Salva no banco via API autenticada

## Detalhes do Livro
- Foto do livro (se tiver) ou placeholder colorido
- Informações: tipo, título, autor, descrição, categoria, estado, localização, responsável
- Se o livro **for do usuário logado**: botão vermelho "Excluir livro" com confirmação
- Se for de outro: botão "Conversar com o proprietario" que leva para `/chat?userId={ownerId}`

## Perfil
- Foto de perfil (avatar com iniciais ou imagem)
- Nome, cidade, badge "Leitora ativa"
- Botão "Editar perfil" abre modal com campos: nome, cidade, telefone, foto de perfil (upload → Base64)
- Resumo: livros cadastrados, trocas, doações
- Lista de livros ativos com link para detalhes

## Chat
- Sidebar com lista de contatos (quem enviou ou recebeu mensagens)
- Ao vir de `/chat?userId=X`, busca o usuário pelo ID e abre a conversa automaticamente
- Histórico de mensagens com polling de 3 segundos para atualização em tempo real
- Mensagens enviadas alinhadas à direita (gradiente lilás), recebidas à esquerda (fundo claro)
- Campo de texto + botão enviar

## 404
- Página de erro com botão para voltar ao Feed

---

# Design System — Tema Lilás

## Variáveis CSS
```css
--lilac-900: #2d1f4e   /* footer, dark */
--lilac-700: #5b3fa6   /* primary dark */
--lilac-600: #7c5cbf   /* primary */
--lilac-500: #9b7dd4   /* primary light */
--lilac-300: #c4aff0
--lilac-100: #ede8fb   /* badges, hover */
--lilac-50:  #f5f2fd   /* backgrounds suaves */
--pink-500:  #c45eb0   /* secondary */
--pink-100:  #fce8f8
--text-dark: #1a1030
--text-mid:  #3d2f60
--text-muted:#6b5a8a
--border:    #ddd5f5
--surface:   #ffffff
--bg:        #f7f5fd
```

## Botões
- **Primary:** gradiente lilás-700 → lilás-500, sombra lilás
- **Secondary:** gradiente pink-500 → rosa claro
- **Ghost:** fundo branco, borda lilás ao hover
- Todos com `transform: translateY(-1px)` no hover

## Cards
- Background branco, borda `--border`, border-radius 12px
- Sombra suave, hover eleva com `translateY(-2px)`

## Inputs
- Fundo `--bg`, borda `--border`
- Focus com borda lilás e `box-shadow` lilás translúcido

## Responsividade
- Mobile first
- Breakpoints: 920px (tablet) e 640px (mobile)
- Grid de livros: 3 colunas → 1 coluna no mobile
- Navbar: links em linha separada no mobile

---

# Serviços do Frontend

## api.js
```js
const API_URL = import.meta.env.VITE_API_URL || 'https://sua-url-backend.onrender.com';
export default API_URL;
```

## authService.js
- `register(data)` → POST `/api/auth/register`
- `login(data)` → POST `/api/auth/login`
- `logout()` → limpa localStorage
- `getToken()` → retorna token do localStorage
- `getUser()` → retorna dados do usuário do localStorage
- `isLoggedIn()` → boolean

## booksService.js
- `getBooks()` → GET `/api/books`
- `getBookById(id)` → GET `/api/books/{id}`
- `searchBooks(term)` → GET `/api/books?search=term`
- `createBook(data)` → POST `/api/books` (autenticado)
- `deleteBook(id)` → DELETE `/api/books/{id}` (autenticado)
- `getMyBooks()` → GET `/api/books/my` (autenticado)

## profileService.js
- `getProfile()` → GET `/api/profile` (autenticado)
- `updateProfile(data)` → PUT `/api/users/me` (autenticado)

## chatService.js
- `getContacts()` → GET `/api/chat/contacts`
- `getConversation(userId)` → GET `/api/chat/{userId}`
- `sendMessage(receiverId, text)` → POST `/api/chat`

---

# Segurança do Backend

- Senhas hasheadas com BCrypt
- JWT com expiração de 24h
- Filtro JWT intercepta todas as requisições protegidas
- CORS liberado para `https://*.vercel.app` e `http://localhost:*`
- Rotas públicas: `/api/auth/**`, `GET /api/books`, `GET /api/books/{id}`, `GET /api/users/{id}`

---

# Variáveis de Ambiente do Backend

| Nome | Descrição |
|---|---|
| `DATABASE_URL` | `jdbc:postgresql://<host>/<db>` |
| `DATABASE_USERNAME` | usuário do banco |
| `DATABASE_PASSWORD` | senha do banco |
| `JWT_SECRET` | string longa e aleatória |
| `PORT` | porta (Render define automaticamente) |

---

# Deploy

## Backend (Render)
- Runtime: **Docker**
- O `Dockerfile` faz build multi-stage: Maven → JRE 17
- O JPA cria as tabelas automaticamente (`ddl-auto=update`)

## Frontend (Vercel)
- Framework: **Vite**
- Build command: `npm run build`
- Output: `dist`
- Usa `HashRouter` para evitar tela branca em SPA

---

# Convenções de Código

## Commits
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `refactor:` refatoração
- `style:` mudança visual
- `docs:` documentação

## Componentes
- PascalCase, um por arquivo
- Props explícitas, sem spread desnecessário

## CSS
- Sem frameworks, CSS puro com variáveis
- Classes BEM-like (`.block__element--modifier`)
- Responsivo com media queries no final do arquivo

## Serviços
- Nunca acessar API diretamente nos componentes
- Toda chamada passa por um service em `src/services/`
- Token JWT injetado via header `Authorization: Bearer <token>`

---

# Como executar localmente

## Frontend
```bash
npm install
npm run dev
```

## Backend
```bash
# Configure as variáveis de ambiente e execute:
mvn spring-boot:run
```

---

# Checklist de entrega

- [ ] Frontend rodando na Vercel
- [ ] Backend rodando no Render
- [ ] Banco PostgreSQL conectado
- [ ] Login e cadastro funcionando
- [ ] Feed carregando livros do banco
- [ ] Cadastro de livro com foto salvando no banco
- [ ] Detalhes com excluir (dono) ou conversar (outro)
- [ ] Chat com contatos e polling de mensagens
- [ ] Perfil com edição e foto de perfil
- [ ] Navbar dinâmica (logado/deslogado)
- [ ] Responsivo em mobile, tablet e desktop
- [ ] 404 configurada
