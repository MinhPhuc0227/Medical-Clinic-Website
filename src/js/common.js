export async function loadComponent(id, file) {
  const response = await fetch(file);

  if (!response.ok) {
    throw new Error(`Cannot load ${file}`);
  }

  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

export async function fetchJson(path) {
  const response = await fetch(path);
  return await response.json();
}
