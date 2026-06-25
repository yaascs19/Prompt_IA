const books = [
  {
    id: 1,
    author: 'Ana Maria Machado',
    category: 'Literatura brasileira',
    condition: 'Muito bom',
    coverClass: 'book-card__cover--green',
    description:
      'Edicao conservada, ideal para estudantes do ensino fundamental e leitores de literatura brasileira.',
    location: 'Santos, SP',
    owner: 'Marina Souza',
    publishedAt: 'Hoje',
    title: 'Bisa Bia, Bisa Bel',
    type: 'Doacao',
  },
  {
    id: 2,
    author: 'Machado de Assis',
    category: 'Classico',
    condition: 'Bom',
    coverClass: 'book-card__cover--blue',
    description:
      'Livro com marcas leves de uso, sem paginas faltando. Disponivel para troca por classicos nacionais.',
    location: 'Sao Vicente, SP',
    owner: 'Lucas Pereira',
    publishedAt: 'Ontem',
    title: 'Dom Casmurro',
    type: 'Troca',
  },
  {
    id: 3,
    author: 'Conceicao Evaristo',
    category: 'Contos',
    condition: 'Excelente',
    coverClass: 'book-card__cover--yellow',
    description:
      'Exemplar bem preservado para leitores interessados em contos contemporaneos brasileiros.',
    location: 'Praia Grande, SP',
    owner: 'Bianca Lima',
    publishedAt: '2 dias atras',
    title: 'Olhos d Agua',
    type: 'Doacao',
  },
  {
    id: 4,
    author: 'George Orwell',
    category: 'Ficcao politica',
    condition: 'Bom',
    coverClass: 'book-card__cover--red',
    description:
      'Livro usado em bom estado, recomendado para projetos escolares e debates sobre politica.',
    location: 'Santos, SP',
    owner: 'Rafael Nunes',
    publishedAt: '3 dias atras',
    title: 'A Revolucao dos Bichos',
    type: 'Troca',
  },
  {
    id: 5,
    author: 'Carolina Maria de Jesus',
    category: 'Memorias',
    condition: 'Muito bom',
    coverClass: 'book-card__cover--green',
    description:
      'Obra importante da literatura brasileira, com capa preservada e miolo em bom estado.',
    location: 'Cubatao, SP',
    owner: 'Leticia Alves',
    publishedAt: '4 dias atras',
    title: 'Quarto de Despejo',
    type: 'Doacao',
  },
  {
    id: 6,
    author: 'J. K. Rowling',
    category: 'Fantasia',
    condition: 'Usado',
    coverClass: 'book-card__cover--blue',
    description:
      'Exemplar com sinais de leitura, indicado para troca por livros de fantasia ou aventura.',
    location: 'Guaruja, SP',
    owner: 'Pedro Santos',
    publishedAt: '5 dias atras',
    title: 'Harry Potter e a Pedra Filosofal',
    type: 'Troca',
  },
];

export function getBooks() {
  return books;
}

export function getBookById(bookId) {
  return books.find((book) => book.id === Number(bookId));
}

export function searchBooks(searchTerm) {
  const normalizedTerm = searchTerm.trim().toLowerCase();

  if (!normalizedTerm) {
    return books;
  }

  return books.filter((book) =>
    [book.title, book.author, book.category, book.location, book.type]
      .join(' ')
      .toLowerCase()
      .includes(normalizedTerm),
  );
}
