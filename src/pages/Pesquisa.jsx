import { useEffect, useState } from 'react';
import BookCard from '../components/books/BookCard.jsx';
import SearchBar from '../components/common/SearchBar.jsx';
import { searchBooks } from '../services/booksService.js';

function Pesquisa() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    searchBooks(searchTerm).then((data) => setResults(Array.isArray(data) ? data : [])).finally(() => setLoading(false));
  }, [searchTerm]);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="section page-section">
      <div className="search-page__header">
        <span className="eyebrow">Pesquisa</span>
        <h1>Encontre livros por titulo, autor, categoria ou cidade.</h1>
        <SearchBar
          onChange={(event) => setSearchTerm(event.target.value)}
          onSubmit={handleSubmit}
          value={searchTerm}
        />
      </div>

      <div className="results-heading">
        <h2>{results.length} resultado(s) encontrado(s)</h2>
        <span>{searchTerm ? `Busca por "${searchTerm}"` : 'Mostrando todos os livros'}</span>
      </div>

      {loading ? (
        <p>Buscando...</p>
      ) : results.length > 0 ? (
        <div className="book-grid book-grid--feed">
          {results.map((book) => (
            <BookCard key={book.id} {...book} owner={book.ownerName} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Nenhum livro encontrado</h2>
          <p>Tente buscar por outro titulo, autor, categoria ou cidade.</p>
        </div>
      )}
    </section>
  );
}

export default Pesquisa;
