import { getToken } from './authService.js';
import API_URL from './api.js';

async function authFetch(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Erro na requisição');
  return json;
}

export function getBooks() {
  return authFetch('/api/books');
}

export function getBookById(id) {
  return authFetch(`/api/books/${id}`);
}

export function searchBooks(term) {
  return authFetch(`/api/books?search=${encodeURIComponent(term)}`);
}

export function createBook(data) {
  return authFetch('/api/books', { method: 'POST', body: JSON.stringify(data) });
}

export function deleteBook(id) {
  return authFetch(`/api/books/${id}`, { method: 'DELETE' });
}

export function concludeBook(id) {
  return authFetch(`/api/books/${id}/conclude`, { method: 'PATCH' });
}

export function getMyBooks() {
  return authFetch('/api/books/my');
}
