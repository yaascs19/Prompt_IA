import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button.jsx';
import Input from '../components/common/Input.jsx';
import TextArea from '../components/common/TextArea.jsx';
import { createBook } from '../services/booksService.js';

function CadastroLivro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', author: '', category: '', location: '', type: 'Doacao', condition: 'Bom', description: '', imageUrl: '' });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.id.replace('book-', '')]: e.target.value }));
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setForm((prev) => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createBook(form);
      navigate('/feed');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section page-section">
      <div className="form-layout">
        <div>
          <span className="eyebrow">Cadastro de livro</span>
          <h1>Publique um livro para troca ou doacao.</h1>
          <p>Preencha os dados principais para que outros leitores entendam o estado do livro e como retirar ou negociar a troca.</p>
        </div>

        <form className="form-panel form-grid" onSubmit={handleSubmit}>
          <Input id="book-title" label="Titulo" placeholder="Nome do livro" type="text" value={form.title} onChange={handleChange} />
          <Input id="book-author" label="Autor" placeholder="Autor ou autora" type="text" value={form.author} onChange={handleChange} />
          <Input id="book-category" label="Categoria" placeholder="Ex.: Romance, Didatico" type="text" value={form.category} onChange={handleChange} />
          <Input id="book-location" label="Localizacao" placeholder="Cidade e estado" type="text" value={form.location} onChange={handleChange} />

          <div className="field">
            <label htmlFor="book-type">Tipo</label>
            <select id="book-type" value={form.type} onChange={handleChange}>
              <option>Doacao</option>
              <option>Troca</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="book-condition">Estado</label>
            <select id="book-condition" value={form.condition} onChange={handleChange}>
              <option>Excelente</option>
              <option>Muito bom</option>
              <option>Bom</option>
              <option>Usado</option>
            </select>
          </div>

          <div className="field form-grid__full">
            <label htmlFor="book-image">Foto do livro</label>
            <input id="book-image" type="file" accept="image/*" onChange={handleImage} />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{ marginTop: '0.75rem', width: '120px', height: '160px', objectFit: 'cover', borderRadius: '8px' }}
              />
            )}
          </div>

          <TextArea
            className="form-grid__full"
            id="book-description"
            label="Descricao"
            placeholder="Informe detalhes sobre capa, paginas, retirada e preferencia de troca."
            rows="5"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          />

          {error && <p className="form-grid__full" style={{ color: 'red', fontSize: '0.875rem' }}>{error}</p>}

          <Button className="form-grid__full" type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar livro'}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default CadastroLivro;
