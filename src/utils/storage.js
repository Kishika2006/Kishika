export function loadStored(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function saveStored(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function nowDate() {
  return new Date().toISOString().slice(0, 10);
}
