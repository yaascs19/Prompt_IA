import { Link } from 'react-router-dom';
import Button from '../components/common/Button.jsx';
import Input from '../components/common/Input.jsx';

function Login() {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">Acesso a comunidade</span>
        <h1>Entrar na EcoLivros</h1>
        <p>Use sua conta para acompanhar livros cadastrados, trocas e doacoes.</p>

        <form className="auth-form">
          <Input id="email" label="E-mail" placeholder="seuemail@exemplo.com" type="email" />
          <Input id="password" label="Senha" placeholder="Digite sua senha" type="password" />

          <div className="auth-form__row">
            <label className="check-field" htmlFor="remember">
              <input id="remember" type="checkbox" />
              <span>Lembrar acesso</span>
            </label>
            <a href="/">Esqueci minha senha</a>
          </div>

          <Button type="submit">Entrar</Button>
        </form>

        <p className="auth-card__footer">
          Ainda nao tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
