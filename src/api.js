import axios from "axios";

const BASE_URL = "https://todo-backend-1-fo7n.onrender.com"; // meine Backend-URL

export async function ladeTodos() {
  const res = await fetch(`${BASE_URL}/api/todos`);
  if (!res.ok) throw new Error("Fehler beim Laden der Todos");
  return res.json();
}
