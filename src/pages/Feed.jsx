import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/books/BookCard.jsx';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';
import { getBooks } from '../services/booksService.js';

function Feed() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks().then(setBooks).finally(() => setLoading(false));
  }, []);

  const donations = books.filter((b) => b.type === 'Doacao').length;
  const exchanges = books.filter((b) => b.type === 'Troca').length;

  return (
    <section className="section page-section">
      <div className="section__header">
        <div>
          <span className="eyebrow">Feed da comunidade</span>
          <h1>Livros disponiveis agora</h1>
        </div>
        <Button as={Link} to="/livros/novo" variant="secondary">
          Publicar livro
        </Button>
      </div>

      <div className="feed-summary" aria-label="Resumo do feed">
        <div><strong>{books.length}</strong><span>livros no feed</span></div>
        <div><strong>{donations}</strong><span>doacoes</span></div>
        <div><strong>{exchanges}</strong><span>trocas</span></div>
      </div>

      <div className="feed-toolbar">
        <Badge>Atualizado hoje</Badge>
        <span>Ordenado por publicacoes mais recentes</span>
      </div>

      {loading ? (
        <p>Carregando livros...</p>
      ) : (
        <div className="book-grid book-grid--feed">
          {books.map((book) => (
            <BookCard key={book.id} {...book} owner={book.ownerName} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Feed;
