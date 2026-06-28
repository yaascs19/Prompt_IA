import { getToken } from './authService.js';
import API_URL from './api.js';

async function authFetch(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...options.headers };
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Erro');
  return json;
}

export function getProfile() {
  return authFetch('/api/profile');
}

export function updateProfile(data) {
  return authFetch('/api/users/me', { method: 'PUT', body: JSON.stringify(data) });
}
