import { Link } from 'react-router-dom';
import Button from '../components/common/Button.jsx';

function NotFound() {
  return (
    <section className="section page-section">
      <div className="empty-state">
        <span className="eyebrow">404</span>
        <h1>Pagina nao encontrada</h1>
        <p>A rota acessada nao existe no frontend atual da EcoLivros.</p>
        <Button as={Link} to="/">
          Voltar para Home
        </Button>
      </div>
    </section>
  );
}

export default NotFound;
