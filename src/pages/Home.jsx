import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/books/BookCard.jsx';
import Button from '../components/common/Button.jsx';
import { getBooks } from '../services/booksService.js';

function Home() {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    getBooks().then((data) => setFeaturedBooks(Array.isArray(data) ? data.slice(0, 3) : []));
  }, []);

  return (
    <>
      <section className="hero-section">
        <div className="hero-section__content">
          <span className="eyebrow">Biblioteca circular para estudantes</span>
          <h1>Encontre, doe e troque livros em uma comunidade sustentavel.</h1>
          <p>
            A EcoLivros ajuda alunos e leitores a dar novo destino aos livros, reduzir desperdicio
            e facilitar o acesso a obras usadas em bom estado.
          </p>
          <div className="hero-section__actions">
            <Button as={Link} to="/feed">Ver livros disponiveis</Button>
            <Button as={Link} to="/livros/novo" variant="secondary">Cadastrar livro</Button>
          </div>
        </div>

        <aside className="impact-panel" aria-label="Resumo de impacto da plataforma">
          <div><strong>128</strong><span>livros cadastrados</span></div>
          <div><strong>43</strong><span>trocas realizadas</span></div>
          <div><strong>86kg</strong><span>de papel reaproveitado</span></div>
        </aside>
      </section>

      <section className="section">
        <div className="section__header">
          <div>
            <span className="eyebrow">Acervo em destaque</span>
            <h2>Livros recentes na comunidade</h2>
          </div>
          <Button as={Link} to="/pesquisa" variant="ghost">Explorar acervo</Button>
        </div>

        <div className="book-grid">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} {...book} owner={book.ownerName} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
