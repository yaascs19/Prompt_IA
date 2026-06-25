import { Link } from 'react-router-dom';
import Button from '../components/common/Button.jsx';
import Input from '../components/common/Input.jsx';

function Cadastro() {
  return (
    <section className="auth-page">
      <div className="auth-card auth-card--wide">
        <span className="eyebrow">Nova conta</span>
        <h1>Criar cadastro</h1>
        <p>Cadastre-se para doar, trocar e salvar livros de interesse na plataforma.</p>

        <form className="auth-form auth-form--grid">
          <Input id="name" label="Nome completo" placeholder="Seu nome" type="text" />
          <Input id="phone" label="Telefone" placeholder="(00) 00000-0000" type="tel" />
          <Input id="register-email" label="E-mail" placeholder="seuemail@exemplo.com" type="email" />
          <Input id="city" label="Cidade" placeholder="Cidade e estado" type="text" />
          <Input id="register-password" label="Senha" placeholder="Crie uma senha" type="password" />
          <Input id="confirm-password" label="Confirmar senha" placeholder="Repita sua senha" type="password" />

          <label className="check-field auth-form__full" htmlFor="terms">
            <input id="terms" type="checkbox" />
            <span>Aceito participar da comunidade EcoLivros com dados corretos.</span>
          </label>

          <Button className="auth-form__full" type="submit">
            Criar conta
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
