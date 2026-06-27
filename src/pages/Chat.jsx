import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Avatar from '../components/common/Avatar.jsx';
import Button from '../components/common/Button.jsx';
import { getUser } from '../services/authService.js';
import { getContacts, getConversation, sendMessage } from '../services/chatService.js';

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const bottomRef = useRef(null);
  const me = getUser();
  const [searchParams] = useSearchParams();
  const targetUserId = searchParams.get('userId');

  useEffect(() => {
    getContacts().then((data) => {
      const list = Array.isArray(data) ? data : [];
      setContacts(list);
      if (targetUserId) {
        const found = list.find((c) => String(c.id) === targetUserId);
        if (found) setSelected(found);
        else setSelected({ id: Number(targetUserId), name: 'Proprietario' });
      }
    });
  }, [targetUserId]);

  useEffect(() => {
    if (!selected) return;
    getConversation(selected.id).then((data) => setMessages(Array.isArray(data) ? data : []));
  }, [selected]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim() || !selected) return;
    const msg = await sendMessage(selected.id, text.trim());
    setMessages((prev) => [...prev, msg]);
    setText('');
  }

  return (
    <section className="section page-section">
      <div className="chat-layout">
        <aside className="chat-sidebar">
          <span className="eyebrow">Conversas</span>
          <h1>Chat</h1>
          {contacts.length === 0 && <p style={{ fontSize: '0.875rem' }}>Nenhuma conversa ainda.</p>}
          {contacts.map((contact) => (
            <div
              className="chat-contact"
              key={contact.id}
              onClick={() => setSelected(contact)}
              style={{ cursor: 'pointer', background: selected?.id === contact.id ? 'var(--color-surface)' : '' }}
            >
              <Avatar name={contact.name} />
              <div>
                <strong>{contact.name}</strong>
                <span>Interesse em livro</span>
              </div>
            </div>
          ))}
        </aside>

        <div className="chat-panel">
          {!selected ? (
            <div style={{ padding: '2rem' }}>Selecione uma conversa</div>
          ) : (
            <>
              <header className="chat-panel__header">
                <Avatar name={selected.name} />
                <div>
                  <strong>{selected.name}</strong>
                </div>
              </header>

              <div className="chat-messages">
                {messages.map((msg) => (
                  <div
                    className={`chat-message chat-message--${msg.senderId === me?.id ? 'sent' : 'received'}`}
                    key={msg.id}
                  >
                    <span>{msg.senderName}</span>
                    <p>{msg.text}</p>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <form className="chat-compose" onSubmit={handleSubmit}>
                <input
                  aria-label="Mensagem"
                  placeholder="Digite sua mensagem"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <Button type="submit">Enviar</Button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Chat;
