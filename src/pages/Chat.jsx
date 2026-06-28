import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Avatar from '../components/common/Avatar.jsx';
import Button from '../components/common/Button.jsx';
import { getUser } from '../services/authService.js';
import { getContacts, getConversation, sendMessage } from '../services/chatService.js';
import API_URL from '../services/api.js';

async function getUserById(id) {
  const res = await fetch(`${API_URL}/api/users/${id}`);
  if (!res.ok) return null;
  return res.json();
}

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const bottomRef = useRef(null);
  const me = getUser();
  const isFirstLoad = useRef(true);
  const [searchParams] = useSearchParams();
  const targetUserId = searchParams.get('userId');

  // busca contatos existentes
  useEffect(() => {
    getContacts()
      .then((data) => setContacts(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  // quando vier userId na URL, busca o usuário e seleciona direto
  useEffect(() => {
    if (!targetUserId) return;
    getUserById(targetUserId).then((u) => {
      if (!u) return;
      const contact = { id: u.id, name: u.name, avatarUrl: u.token };
      setContacts((prev) => prev.find((c) => c.id === contact.id) ? prev : [contact, ...prev]);
      setSelected(contact);
    });
  }, [targetUserId]);

  useEffect(() => {
    if (!selected) return;
    getConversation(selected.id)
      .then((data) => setMessages(Array.isArray(data) ? data : []))
      .catch(() => setMessages([]));

    const interval = setInterval(() => {
      getConversation(selected.id)
        .then((data) => setMessages(Array.isArray(data) ? data : []))
        .catch(() => {});
    }, 3000);

    return () => clearInterval(interval);
  }, [selected]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
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
              <Avatar name={contact.name} src={contact.avatarUrl} />
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
                <Avatar name={selected.name} src={selected.avatarUrl} />
                <div>
                  <strong>{selected.name}</strong>
                </div>
              </header>

              <div className="chat-messages">
                {messages.length === 0 && (
                  <p style={{ padding: '1rem', color: 'var(--color-text-muted, #888)', fontSize: '0.875rem' }}>
                    Nenhuma mensagem ainda. Diga ola!
                  </p>
                )}
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
