import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../common/Button.jsx';
import { isLoggedIn, logout } from '../../services/authService.js';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Feed', path: '/feed' },
  { label: 'Pesquisa', path: '/pesquisa' },
  { label: 'Chat', path: '/chat' },
  { label: 'Perfil', path: '/perfil' },
];

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="navbar">
      <NavLink className="navbar__brand" to="/" aria-label="EcoLivros - inicio">
        <span className="navbar__logo" aria-hidden="true">E</span>
        <span>EcoLivros</span>
      </NavLink>

      <nav className="navbar__links" aria-label="Navegacao principal">
        {navItems.map((item) => (
          <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} to={item.path} key={item.path}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="navbar__actions">
        {loggedIn ? (
          <Button variant="ghost" onClick={handleLogout}>Sair</Button>
        ) : (
          <>
            <Button as={NavLink} to="/login" variant="ghost">Entrar</Button>
            <Button as={NavLink} to="/cadastro">Cadastrar</Button>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
