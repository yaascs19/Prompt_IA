import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';
import { getBookById } from '../services/booksService.js';

function DetalhesLivro() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookById(bookId).then(setBook).catch(() => setBook(null)).finally(() => setLoading(false));
  }, [bookId]);

  if (loading) return <section className="section page-section"><p>Carregando...</p></section>;

  if (!book) {
    return (
      <section className="section page-section">
        <div className="empty-state">
          <h1>Livro nao encontrado</h1>
          <p>O livro solicitado nao esta disponivel no acervo atual.</p>
          <Button as={Link} to="/feed">Voltar ao feed</Button>
        </div>
      </section>
    );
  }

  return (
    <section className="section page-section">
      <div className="details-layout">
        {book.imageUrl ? (
          <img
            src={book.imageUrl}
            alt={book.title}
            className="details-cover"
            style={{ objectFit: 'cover', width: '220px', height: '300px', borderRadius: '12px' }}
          />
        ) : (
          <div className="details-cover book-card__cover--green">
            <span>{book.title.slice(0, 2)}</span>
          </div>
        )}

        <article className="details-content">
          <Badge tone={book.type === 'Troca' ? 'blue' : 'green'}>{book.type}</Badge>
          <h1>{book.title}</h1>
          <p className="details-content__author">{book.author}</p>
          <p>{book.description}</p>

          <dl className="details-list">
            <div><dt>Categoria</dt><dd>{book.category}</dd></div>
            <div><dt>Estado</dt><dd>{book.condition}</dd></div>
            <div><dt>Localizacao</dt><dd>{book.location}</dd></div>
            <div><dt>Responsavel</dt><dd>{book.ownerName}</dd></div>
          </dl>

          <div className="details-actions">
            <Button as={Link} to="/chat">Conversar no chat</Button>
            <Button as={Link} to="/feed" variant="ghost">Voltar ao feed</Button>
          </div>
        </article>
      </div>
    </section>
  );
}

export default DetalhesLivro;
