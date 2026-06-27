import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../components/common/Avatar.jsx';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';
import { getProfile } from '../services/profileService.js';

function Perfil() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then(setProfile).catch(() => {});
  }, []);

  if (!profile) return <p style={{ padding: '2rem' }}>Carregando perfil...</p>;

  return (
    <section className="section page-section">
      <div className="profile-layout">
        <aside className="profile-card">
          <Avatar name={profile.name} />
          <h1>{profile.name}</h1>
          <p>{profile.city}</p>
          <Badge>Leitora ativa</Badge>
          <Button variant="ghost">Editar perfil</Button>
        </aside>

        <div className="profile-content">
          <div className="section__header">
            <div>
              <span className="eyebrow">Perfil</span>
              <h2>Resumo da sua participacao</h2>
            </div>
          </div>

          <div className="feed-summary">
            <div>
              <strong>{profile.totalBooks}</strong>
              <span>livros cadastrados</span>
            </div>
            <div>
              <strong>0</strong>
              <span>trocas concluidas</span>
            </div>
            <div>
              <strong>0</strong>
              <span>doacoes realizadas</span>
            </div>
          </div>

          <div className="list-panel">
            <h3>Meus livros ativos</h3>
            {profile.books.length === 0 && <p>Nenhum livro cadastrado ainda.</p>}
            {profile.books.map((book) => (
              <div className="list-row" key={book.id}>
                <Link to={`/livros/${book.id}`}>{book.title}</Link>
                <Badge tone="blue">{book.type}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Perfil;
