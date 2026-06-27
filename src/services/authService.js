import API_URL from './api.js';

export async function register(data) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Erro ao cadastrar');
  saveSession(json);
  return json;
}

export async function login(data) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'E-mail ou senha incorretos');
  saveSession(json);
  return json;
}

function saveSession(data) {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify({ id: data.id, name: data.name, email: data.email }));
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function isLoggedIn() {
  return !!getToken();
}
