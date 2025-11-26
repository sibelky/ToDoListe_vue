import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-backend-1-fo7n.onrender.com"
});

export const ladeTodos = () => api.get("/api/todos");
export const neueTodo = (task) => api.post("/api/todos", { task });
export const updateTodo = (id, done) => api.put(`/api/todos/${id}`, { done });

export default api;
