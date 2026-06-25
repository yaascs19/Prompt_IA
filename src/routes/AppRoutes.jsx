import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import CadastroLivro from '../pages/CadastroLivro.jsx';
import Cadastro from '../pages/Cadastro.jsx';
import Chat from '../pages/Chat.jsx';
import DetalhesLivro from '../pages/DetalhesLivro.jsx';
import Feed from '../pages/Feed.jsx';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import NotFound from '../pages/NotFound.jsx';
import Perfil from '../pages/Perfil.jsx';
import Pesquisa from '../pages/Pesquisa.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="feed" element={<Feed />} />
        <Route path="pesquisa" element={<Pesquisa />} />
        <Route path="livros/novo" element={<CadastroLivro />} />
        <Route path="livros/:bookId" element={<DetalhesLivro />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="chat" element={<Chat />} />
        <Route path="login" element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
