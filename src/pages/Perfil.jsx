import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../components/common/Avatar.jsx';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';
import Input from '../components/common/Input.jsx';
import { getProfile, updateProfile } from '../services/profileService.js';

function EditModal({ profile, onClose, onSave }) {
  const [form, setForm] = useState({ name: profile.name, city: profile.city || '', phone: profile.phone || '', avatarUrl: profile.avatarUrl || '' });
  const [preview, setPreview] = useState(profile.avatarUrl || null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setForm((prev) => ({ ...prev, avatarUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await updateProfile(form);
      onSave(updated);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '480px', boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }}>
        <h2 style={{ margin: '0 0 24px', color: 'var(--text-dark)' }}>Editar perfil</h2>

        <form style={{ display: 'grid', gap: '16px' }} onSubmit={handleSubmit}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Avatar name={form.name} src={preview} />
            <div className="field" style={{ flex: 1 }}>
              <label htmlFor="avatarFile">Foto de perfil</label>
              <input id="avatarFile" type="file" accept="image/*" onChange={handleImage} />
            </div>
          </div>

          <Input id="name"  label="Nome"     value={form.name}  onChange={handleChange} placeholder="Seu nome" type="text" />
          <Input id="city"  label="Cidade"   value={form.city}  onChange={handleChange} placeholder="Cidade e estado" type="text" />
          <Input id="phone" label="Telefone" value={form.phone} onChange={handleChange} placeholder="(00) 00000-0000" type="tel" />

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Perfil() {
  const [profile, setProfile] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    getProfile().then(setProfile).catch(() => {});
  }, []);

  if (!profile) return <p style={{ padding: '2rem' }}>Carregando perfil...</p>;

  return (
    <section className="section page-section">
      {editOpen && (
        <EditModal
          profile={profile}
          onClose={() => setEditOpen(false)}
          onSave={(updated) => {
            setProfile((prev) => ({ ...prev, ...updated }));
            setEditOpen(false);
          }}
        />
      )}

      <div className="profile-layout">
        <aside className="profile-card">
          <Avatar name={profile.name} src={profile.avatarUrl} />
          <h1>{profile.name}</h1>
          <p>{profile.city}</p>
          <Badge>Leitora ativa</Badge>
          <Button variant="ghost" onClick={() => setEditOpen(true)}>Editar perfil</Button>
        </aside>

        <div className="profile-content">
          <div className="section__header">
            <div>
              <span className="eyebrow">Perfil</span>
              <h2>Resumo da sua participacao</h2>
            </div>
          </div>

          <div className="feed-summary">
            <div><strong>{profile.totalBooks}</strong><span>livros cadastrados</span></div>
            <div><strong>0</strong><span>trocas concluidas</span></div>
            <div><strong>0</strong><span>doacoes realizadas</span></div>
          </div>

          <div className="list-panel">
            <h3>Meus livros ativos</h3>
            {profile.books.length === 0 && <p>Nenhum livro cadastrado ainda.</p>}
            {profile.books.map((book) => (
              <div className="list-row" key={book.id}>
                <Link to={`/livros/${book.id}`}>{book.title}</Link>
                <Badge tone={book.status === 'concluido' ? 'green' : 'blue'}>
                  {book.status === 'concluido' ? 'Concluido' : book.type}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Perfil;
