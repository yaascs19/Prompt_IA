import { Link, useParams } from 'react-router-dom';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';
import { getBookById } from '../services/booksService.js';

function DetalhesLivro() {
  const { bookId } = useParams();
  const book = getBookById(bookId);

  if (!book) {
    return (
      <section className="section page-section">
        <div className="empty-state">
          <h1>Livro nao encontrado</h1>
          <p>O livro solicitado nao esta disponivel no acervo atual.</p>
          <Button as={Link} to="/feed">
            Voltar ao feed
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="section page-section">
      <div className="details-layout">
        <div className={`details-cover ${book.coverClass}`}>
          <span>{book.title.slice(0, 2)}</span>
        </div>

        <article className="details-content">
          <Badge tone={book.type === 'Troca' ? 'blue' : 'green'}>{book.type}</Badge>
          <h1>{book.title}</h1>
          <p className="details-content__author">{book.author}</p>
          <p>{book.description}</p>

          <dl className="details-list">
            <div>
              <dt>Categoria</dt>
              <dd>{book.category}</dd>
            </div>
            <div>
              <dt>Estado</dt>
              <dd>{book.condition}</dd>
            </div>
            <div>
              <dt>Localizacao</dt>
              <dd>{book.location}</dd>
            </div>
            <div>
              <dt>Responsavel</dt>
              <dd>{book.owner}</dd>
            </div>
          </dl>

          <div className="details-actions">
            <Button as={Link} to="/chat">
              Conversar no chat
            </Button>
            <Button as={Link} to="/feed" variant="ghost">
              Voltar ao feed
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}

export default DetalhesLivro;
