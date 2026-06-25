import { Link } from 'react-router-dom';
import Button from '../common/Button.jsx';
import Badge from '../common/Badge.jsx';

function BookCard({ author, category, condition, coverClass, id, location, owner, title, type }) {
  return (
    <article className="book-card">
      <div className={`book-card__cover ${coverClass}`} aria-hidden="true">
        <span>{title.slice(0, 2)}</span>
      </div>
      <div className="book-card__content">
        <Badge tone={type === 'Troca' ? 'blue' : 'green'}>{type}</Badge>
        <h3>{title}</h3>
        <p>{author}</p>
        <div className="book-card__meta">
          {category ? <span>{category}</span> : null}
          {condition ? <span>{condition}</span> : null}
        </div>
        <small>{location}</small>
        {owner ? <small>Responsavel: {owner}</small> : null}
        <Button as={Link} className="book-card__button" to={`/livros/${id}`} variant="ghost">
          Ver detalhes
        </Button>
      </div>
    </article>
  );
}

export default BookCard;
