import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button.jsx';
import Input from '../components/common/Input.jsx';
import { login } from '../services/authService.js';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email: form.email, password: form.password });
      navigate('/feed');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">Acesso a comunidade</span>
        <h1>Entrar na EcoLivros</h1>
        <p>Use sua conta para acompanhar livros cadastrados, trocas e doacoes.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <Input id="email" label="E-mail" placeholder="seuemail@exemplo.com" type="email" value={form.email} onChange={handleChange} />
          <Input id="password" label="Senha" placeholder="Digite sua senha" type="password" value={form.password} onChange={handleChange} />

          {error && <p style={{ color: 'red', fontSize: '0.875rem' }}>{error}</p>}

          <Button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
        </form>

        <p className="auth-card__footer">
          Ainda nao tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
