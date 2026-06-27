import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button.jsx';
import Input from '../components/common/Input.jsx';
import { register } from '../services/authService.js';

function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('As senhas não conferem');
      return;
    }
    setLoading(true);
    try {
      await register({ name: form.name, phone: form.phone, email: form.email, city: form.city, password: form.password });
      navigate('/feed');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card auth-card--wide">
        <span className="eyebrow">Nova conta</span>
        <h1>Criar cadastro</h1>
        <p>Cadastre-se para doar, trocar e salvar livros de interesse na plataforma.</p>

        <form className="auth-form auth-form--grid" onSubmit={handleSubmit}>
          <Input id="name" label="Nome completo" placeholder="Seu nome" type="text" value={form.name} onChange={handleChange} />
          <Input id="phone" label="Telefone" placeholder="(00) 00000-0000" type="tel" value={form.phone} onChange={handleChange} />
          <Input id="email" label="E-mail" placeholder="seuemail@exemplo.com" type="email" value={form.email} onChange={handleChange} />
          <Input id="city" label="Cidade" placeholder="Cidade e estado" type="text" value={form.city} onChange={handleChange} />
          <Input id="password" label="Senha" placeholder="Crie uma senha" type="password" value={form.password} onChange={handleChange} />
          <Input id="confirm" label="Confirmar senha" placeholder="Repita sua senha" type="password" value={form.confirm} onChange={handleChange} />

          <label className="check-field auth-form__full" htmlFor="terms">
            <input id="terms" type="checkbox" required />
            <span>Aceito participar da comunidade EcoLivros com dados corretos.</span>
          </label>

          {error && <p className="auth-form__full" style={{ color: 'red', fontSize: '0.875rem' }}>{error}</p>}

          <Button className="auth-form__full" type="submit" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </form>

        <p className="auth-card__footer">
          Ja possui conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </section>
  );
}

export default Cadastro;
