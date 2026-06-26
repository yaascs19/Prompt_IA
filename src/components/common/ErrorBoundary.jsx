import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="app-error">
          <h1>EcoLivros nao conseguiu carregar</h1>
          <p>Atualize a pagina. Se continuar, revise o deploy e tente publicar novamente.</p>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
