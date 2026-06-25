import Button from '../components/common/Button.jsx';
import Input from '../components/common/Input.jsx';
import TextArea from '../components/common/TextArea.jsx';

function CadastroLivro() {
  return (
    <section className="section page-section">
      <div className="form-layout">
        <div>
          <span className="eyebrow">Cadastro de livro</span>
          <h1>Publique um livro para troca ou doacao.</h1>
          <p>
            Preencha os dados principais para que outros leitores entendam o estado do livro e como
            retirar ou negociar a troca.
          </p>
        </div>

        <form className="form-panel form-grid">
          <Input id="book-title" label="Titulo" placeholder="Nome do livro" type="text" />
          <Input id="book-author" label="Autor" placeholder="Autor ou autora" type="text" />
          <Input id="book-category" label="Categoria" placeholder="Ex.: Romance, Didatico" type="text" />
          <Input id="book-location" label="Localizacao" placeholder="Cidade e estado" type="text" />

          <div className="field">
            <label htmlFor="book-type">Tipo</label>
            <select id="book-type">
              <option>Doacao</option>
              <option>Troca</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="book-condition">Estado</label>
            <select id="book-condition">
              <option>Excelente</option>
              <option>Muito bom</option>
              <option>Bom</option>
              <option>Usado</option>
            </select>
          </div>

          <TextArea
            className="form-grid__full"
            id="book-description"
            label="Descricao"
            placeholder="Informe detalhes sobre capa, paginas, retirada e preferencia de troca."
            rows="5"
          />

          <Button className="form-grid__full" type="submit">
            Salvar livro
          </Button>
        </form>
      </div>
    </section>
  );
}

export default CadastroLivro;
