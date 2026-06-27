import { getToken } from './authService.js';
import API_URL from './api.js';

async function authFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
      ...options.headers,
    },
  });
  if (res.status === 204) return null;
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Erro');
  return json;
}

export function getContacts() {
  return authFetch('/api/chat/contacts');
}

export function getConversation(userId) {
  return authFetch(`/api/chat/${userId}`);
}

export function sendMessage(receiverId, text) {
  return authFetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ receiverId, text }),
  });
}
