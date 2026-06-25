import Avatar from '../components/common/Avatar.jsx';
import Button from '../components/common/Button.jsx';

const messages = [
  { author: 'Bianca Lima', text: 'Ola! O livro ainda esta disponivel?', type: 'received' },
  { author: 'Marina Souza', text: 'Sim, posso entregar na escola amanha.', type: 'sent' },
  { author: 'Bianca Lima', text: 'Perfeito. Tenho interesse na doacao.', type: 'received' },
];

function Chat() {
  return (
    <section className="section page-section">
      <div className="chat-layout">
        <aside className="chat-sidebar">
          <span className="eyebrow">Conversas</span>
          <h1>Chat</h1>
          {['Bianca Lima', 'Lucas Pereira', 'Rafael Nunes'].map((name) => (
            <div className="chat-contact" key={name}>
              <Avatar name={name} />
              <div>
                <strong>{name}</strong>
                <span>Interesse em livro</span>
              </div>
            </div>
          ))}
        </aside>

        <div className="chat-panel">
          <header className="chat-panel__header">
            <Avatar name="Bianca Lima" />
            <div>
              <strong>Bianca Lima</strong>
              <span>Olhos d Agua</span>
            </div>
          </header>

          <div className="chat-messages">
            {messages.map((message) => (
              <div className={`chat-message chat-message--${message.type}`} key={message.text}>
                <span>{message.author}</span>
                <p>{message.text}</p>
              </div>
            ))}
          </div>

          <form className="chat-compose">
            <input aria-label="Mensagem" placeholder="Digite sua mensagem" type="text" />
            <Button type="submit">Enviar</Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Chat;
