import { getToken } from './authService.js';
import API_URL from './api.js';

async function authFetch(path) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Erro');
  return json;
}

export function getProfile() {
  return authFetch('/api/profile');
}
