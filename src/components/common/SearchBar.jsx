import Button from './Button.jsx';

function SearchBar({ onChange, onSubmit, placeholder = 'Pesquisar livro, autor ou cidade', value }) {
  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <input
        aria-label="Pesquisar livros"
        onChange={onChange}
        placeholder={placeholder}
        type="search"
        value={value}
      />
      <Button type="submit">Pesquisar</Button>
    </form>
  );
}

export default SearchBar;
