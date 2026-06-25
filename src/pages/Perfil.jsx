import Avatar from '../components/common/Avatar.jsx';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';

const userBooks = ['Bisa Bia, Bisa Bel', 'Quarto de Despejo'];

function Perfil() {
  return (
    <section className="section page-section">
      <div className="profile-layout">
        <aside className="profile-card">
          <Avatar name="Marina Souza" />
          <h1>Marina Souza</h1>
          <p>Santos, SP</p>
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
              <strong>12</strong>
              <span>livros cadastrados</span>
            </div>
            <div>
              <strong>7</strong>
              <span>trocas concluidas</span>
            </div>
            <div>
              <strong>5</strong>
              <span>doacoes realizadas</span>
            </div>
          </div>

          <div className="list-panel">
            <h3>Meus livros ativos</h3>
            {userBooks.map((book) => (
              <div className="list-row" key={book}>
                <span>{book}</span>
                <Badge tone="blue">Publicado</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Perfil;
