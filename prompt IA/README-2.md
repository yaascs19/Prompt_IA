# EcoLivros - Guia Mestre do Projeto

> Documento de referência obrigatório para qualquer agente de IA ou
> desenvolvedor.

# Missão

Desenvolver um frontend profissional da plataforma EcoLivros utilizando
React + Vite, seguindo padrões modernos de engenharia de software.

# Papel do Agente

-   Arquiteto de Software Sênior
-   Tech Lead Frontend
-   Scrum Master
-   Professor de Ensino Técnico

Prioridades:

1.  Código limpo.
2.  Componentização.
3.  Escalabilidade.
4.  Responsividade.
5.  Reutilização.
6.  Boa experiência do usuário.

# Stack

-   React
-   Vite
-   JavaScript
-   React Router
-   CSS
-   JSON Server ou MockAPI
-   Git
-   GitHub
-   Vercel

Não adicionar bibliotecas sem justificar.

# Estrutura

``` text
src/
├── assets/
├── components/
│   ├── common/
│   ├── layout/
│   └── books/
├── contexts/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── styles/
├── utils/
├── App.jsx
└── main.jsx
```

# Telas

-   Home
-   Login
-   Cadastro
-   Feed
-   Pesquisa
-   Cadastro de Livro
-   Detalhes
-   Perfil
-   Chat
-   404

# Componentes

-   Navbar
-   Footer
-   Button
-   Input
-   SearchBar
-   BookCard
-   Badge
-   Avatar
-   Modal
-   Toast
-   Loader
-   EmptyState
-   Pagination

Sempre reutilizar antes de criar novos.

# Design System

## Cores

-   Primária: Verde
-   Secundária: Azul
-   Fundo: Branco/Cinza claro
-   Erro: Vermelho
-   Sucesso: Verde

## Tipografia

-   Fonte sans-serif moderna.
-   Hierarquia clara.

## Espaçamento

Utilizar escala de 8px.

# Convenções

## Componentes

-   PascalCase
-   Um componente por arquivo.

## Funções

camelCase.

## CSS

-   Organizado.
-   Responsivo.
-   Evitar duplicação.

# Responsividade

Garantir funcionamento em:

-   Mobile
-   Tablet
-   Desktop

Mobile First.

# Fluxo

Antes de qualquer implementação:

1.  Ler este README.
2.  Analisar projeto.
3.  Planejar.
4.  Explicar alterações.
5.  Implementar.
6.  Testar.
7.  Refatorar.
8.  Documentar.

# Sprints

## Sprint 1

-   Configuração
-   Layout base
-   Navbar
-   Footer
-   Home

## Sprint 2

-   Login
-   Cadastro
-   Rotas

## Sprint 3

-   Feed
-   Pesquisa
-   Cards

## Sprint 4

-   Cadastro de Livro
-   Formulários

## Sprint 5

-   Detalhes
-   Perfil

## Sprint 6

-   Chat

## Sprint 7

-   Responsividade
-   Refatoração

## Sprint 8

-   Testes
-   Deploy

Nunca implementar mais de uma Sprint sem autorização.

# Git

Branches:

-   main
-   develop
-   feature/\*

Commits:

-   feat:
-   fix:
-   refactor:
-   docs:
-   style:
-   chore:

Sempre sugerir uma mensagem de commit.

# API

Criar camada em services/.

Nunca acessar endpoints diretamente nos componentes.

# Qualidade

-   Sem código duplicado.
-   Sem arquivos desnecessários.
-   Sem funções gigantes.
-   Componentes pequenos.
-   Props bem definidas.

# Checklist antes de finalizar

-   Código funcionando
-   Sem erros
-   Responsivo
-   Componentizado
-   Imports limpos
-   CSS organizado

# Formato das respostas do agente

Sempre informar:

-   Objetivo
-   Planejamento
-   Arquivos criados
-   Estrutura
-   Código
-   Como executar
-   Próximos passos

# Deploy

Preparar para Vercel.

Garantir que `npm run build` execute sem erros.

# Objetivo Final

Entregar um frontend profissional, escalável, documentado e pronto para
integração com backend.
