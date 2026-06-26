# Erro: React is not defined

## Descrição

Ao executar a aplicação React, o seguinte erro foi exibido no console:

```text
Download the React DevTools for a better development experience:
https://react.dev/link/react-devtools

App.jsx:5 Uncaught ReferenceError: React is not defined
    at App (App.jsx:5:3)
    at Object.react_stack_bottom_frame
    at renderWithHooks
    at updateFunctionComponent
    at beginWork
    at runWithFiberInDEV
    at performUnitOfWork
    at workLoopSync
    at renderRootSync
    at performWorkOnRoot

An error occurred in the <App> component.

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.
```

---

## Causa

O erro:

```text
ReferenceError: React is not defined
```

indica que o objeto `React` está sendo utilizado no arquivo `App.jsx`, mas não foi importado.

Isso geralmente acontece quando:

- O projeto utiliza a sintaxe antiga do JSX e o `React` não foi importado.
- O código faz chamadas como `React.useState`, `React.useEffect` ou `React.Fragment` sem importar `React`.
- A configuração do compilador (Babel/Vite) não está utilizando o *Automatic JSX Runtime*.

---

## Como corrigir

### Opção 1 — Importar React

```jsx
import React from "react";
```

Ou, caso utilize Hooks:

```jsx
import React, { useState, useEffect } from "react";
```

---

### Opção 2 — Importar apenas os Hooks

Antes:

```jsx
const [count, setCount] = React.useState(0);
```

Depois:

```jsx
import { useState } from "react";

const [count, setCount] = useState(0);
```

---

### Opção 3 — Verificar a configuração do Vite

No React 17+ com Vite, normalmente não é necessário importar `React` apenas para utilizar JSX.

Verifique se o projeto está utilizando:

- React 17+
- Plugin oficial do React para Vite
- Configuração correta do Babel/ESBuild

---

## Exemplo

### Antes

```jsx
function App() {
  return (
    <h1>Olá Mundo</h1>
  );
}

export default App;
```

Se houver chamadas como:

```jsx
React.useState(...)
```

ocorrerá o erro.

---

### Depois

```jsx
import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return <h1>{count}</h1>;
}

export default App;
```

---

## Observação

A mensagem:

```text
Download the React DevTools for a better development experience
```

não representa um erro. Trata-se apenas de uma recomendação para instalar a extensão **React DevTools** no navegador.

---

## Resumo

**Erro principal**

```text
ReferenceError: React is not defined
```

**Possíveis soluções**

- Importar `React`.
- Importar os Hooks corretamente (`useState`, `useEffect`, etc.).
- Verificar a configuração do Vite/Babel.
- Confirmar que não há chamadas a `React.*` sem importar o objeto `React`.

---

## Status

- **Erro:** `ReferenceError: React is not defined`
- **Arquivo afetado:** `App.jsx`
- **Linha indicada:** `5`
- **Prioridade:** Alta (impede a renderização da aplicação)
- **Solução recomendada:** Importar `React` ou corrigir os imports dos Hooks.