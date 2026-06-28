import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';
import { getUser } from '../services/authService.js';
import { concludeBook, deleteBook, getBookById } from '../services/booksService.js';

function DetalhesLivro() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const me = getUser();
  const isOwner = me && book && me.id === book.ownerId;

  async function handleDelete() {
    if (!confirm('Tem certeza que deseja excluir este livro?')) return;
    await deleteBook(bookId);
    navigate('/feed');
  }

  async function handleConclude() {
    if (!confirm('Marcar este livro como concluido?')) return;
    const updated = await concludeBook(bookId);
    setBook(updated);
  }

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
            style={{ objectFit: 'contain', width: '100%', maxWidth: '320px', maxHeight: '420px', borderRadius: '12px', background: '#f5f5f5' }}
          />
        ) : (
          <div className="details-cover book-card__cover--green">
            <span>{book.title.slice(0, 2)}</span>
          </div>
        )}

        <article className="details-content">
          <Badge tone={book.type === 'Troca' ? 'blue' : 'green'}>{book.type}</Badge>
          {book.status === 'concluido' && <Badge tone="green" style={{ marginLeft: 8 }}>Concluido</Badge>}
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
            {isOwner ? (
              <>
                {book.status !== 'concluido' && (
                  <Button onClick={handleConclude} style={{ background: '#7c5cbf', color: '#fff', borderColor: '#7c5cbf' }}>Marcar como concluido</Button>
                )}
                <Button onClick={handleDelete} style={{ background: '#c0392b', color: '#fff', borderColor: '#c0392b' }}>Excluir livro</Button>
              </>
            ) : (
              <Button as={Link} to={`/chat?userId=${book.ownerId}`}>Conversar com o proprietario</Button>
            )}
            <Button as={Link} to="/feed" variant="ghost">Voltar ao feed</Button>
          </div>
        </article>
      </div>
    </section>
  );
}

export default DetalhesLivro;
