<template>
  <div class="page">
    <!-- Kopf  -->
    <div class="top-bar">
      <div class="head-left">
        <h1>Willkommen zu deiner To-Do Liste!</h1>
        <p class="subtitle">
          Hier kannst du deine To-Do's hinzufügen, als erledigt markieren und wieder zurückholen.
        </p>
      </div>

      <div class="search-box">
        <input
          type="text"
          v-model="suchbegriff"
          placeholder="Aufgabe suchen..."
        />
      </div>
    </div>

    <!-- Eingabe -->
    <div id="eingabe" class="header">
      <img src="https://cdn-icons-png.flaticon.com/512/2387/2387635.png" />
      <input
        type="text"
        v-model="neueAufgabe"
        @keypress.enter="neueAufgabeHinzufuegen"
        placeholder="Neue Aufgabe..."
      />
      <button class="btn" type="button" @click="neueAufgabeHinzufuegen">
        Hinzufügen
      </button>
    </div>

    <!-- Offen -->
    <div class="list-box">
      <h2>Noch zu erledigen:</h2>
      <ul>
        <li v-for="todo in offen" :key="todo.id" class="todo-item">
          <label class="todo-left">
            <input type="checkbox" @change="aufgabeErledigt(todo)" />
            <span class="todo-text" v-html="markiereText(todo.task)"></span>
          </label>

          <div class="todo-actions">
            <span class="dringendBtn" @click="inDringend(todo)">!</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- Dringend -->
    <div class="list-box dringend-box">
      <h2 class="dringend-title">Dringend:</h2>
      <ul>
        <li v-for="todo in dringend" :key="todo.id" class="todo-item">
          <label class="todo-left">
            <input type="checkbox" @change="aufgabeErledigt(todo)" />
            <span class="todo-text" v-html="markiereText(todo.task)"></span>
          </label>

          <div class="todo-actions">
            <span class="zurueck" @click="ausDringend(todo)">↺</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- Erledigt -->
    <div class="list-box done-box">
      <h2>Erledigt:</h2>
      <ul>
        <li v-for="todo in erledigt" :key="todo.id" class="todo-item done-item">
          <span class="todo-text" v-html="markiereText(todo.task)"></span>

          <div class="todo-actions">
            <span class="zurueck" @click="zurueck(todo)">↺</span>
            <button class="deleteBtn" @click="loeschen(todo)">Löschen</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  name: "TodoListe",
  data() {
    return {
      neueAufgabe: "",
      suchbegriff: "",
      todos: []
    };
  },
  computed: {
    gefiltert() {
      if (!this.suchbegriff) return this.todos;
      const q = this.suchbegriff.toLowerCase();
      return this.todos.filter(t => (t.task || "").toLowerCase().includes(q));
    },
    offen() {
      return this.gefiltert.filter(t => !t.done && !t.urgent);
    },
    dringend() {
      return this.gefiltert.filter(t => t.urgent && !t.done);
    },
    erledigt() {
      return this.gefiltert.filter(t => t.done);
    }
  },
  mounted() {
    this.ladeAufgaben();
  },
  methods: {
    async ladeAufgaben() {
      const res = await api.get("/api/todos");
      this.todos = res.data;
    },

    async neueAufgabeHinzufuegen() {
      const text = this.neueAufgabe.trim();
      if (!text) return;

      const res = await api.post("/api/todos", { task: text });
      this.todos.push(res.data);
      this.neueAufgabe = "";
    },

    async aufgabeErledigt(todo) {
      const res = await api.put(`/api/todos/${todo.id}`, { done: true, urgent: false });
      Object.assign(todo, res.data);
    },

    async zurueck(todo) {
      const res = await api.put(`/api/todos/${todo.id}`, { done: false });
      Object.assign(todo, res.data);
    },

    async inDringend(todo) {
      const res = await api.put(`/api/todos/${todo.id}`, { urgent: true, done: false });
      Object.assign(todo, res.data);
    },

    async ausDringend(todo) {
      const res = await api.put(`/api/todos/${todo.id}`, { urgent: false });
      Object.assign(todo, res.data);
    },

    async loeschen(todo) {
      await api.delete(`/api/todos/${todo.id}`);
      this.todos = this.todos.filter(t => t.id !== todo.id);
    },

    markiereText(text) {
      if (!this.suchbegriff) return text;

      const escaped = this.suchbegriff.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const r = new RegExp(`(${escaped})`, "gi");
      return String(text).replace(r, "<mark>$1</mark>");
    }
  }
};
</script>

<style scoped>
.page {
  background-color: #ffefd5;
  font-family: Copper, sans-serif;
  margin: 40px;
}

h1 {
  color: #4682b4;
  text-align: center;
  font-family: Copperplate, sans-serif;
  border: solid;
  text-decoration-style: wavy;
  padding: 8px;
}

h2,
h3 {
  color: #4682b4;
  font-family: "Arial", monospace;
}

p {
  color: #4682b4;
  text-align: center;
  font-size: 14px;
}

.subtitle {
  margin-top: 8px;
}

/* Bild */
img {
  width: 160px;
  height: auto;
  display: block;
  margin: 0 auto;
}

/* Suche */
.bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1px;
}

.head-left {
  flex: 1;
}

.search-box {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.search-box input {
  padding: 6px 10px;
  width: 240px;
  max-width: 90%;
}

/* Eingabe */
#eingabe {
  text-align: center;
  margin-bottom: 20px;
}

/* Listen-Boxen  */
.list-box {
  border: 2px solid #4682b4;
  border-radius: 10px;
  padding: 12px;
  max-width: 600px;
  margin: 0 auto 18px auto;
  background: rgba(255, 255, 255, 0.25);
}

.list-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Dringend */
.dringend-box {
  border-color: red;
}

.dringend-title {
  color: red;
}

/* Todo Zeilen / Buttons  */
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 6px 0;
}

.todo-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.todo-text {
  flex: 1;
}

.todo-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Erledigt Optik */
.done-item .todo-text {
  color: gray;
  text-decoration: line-through;
}

/* Minus */
.zurueck {
  cursor: pointer;
  color: #4682b4;
  font-weight: bold;
  font-size: 20px;
  display: inline-block;
  transition: transform 0.25s ease, color 0.25s ease;
}

.zurueck:hover {
  color: #4682b4;
  transform: rotate(-180deg);
}

/* ! Button */
.dringendBtn {
  cursor: pointer;
  font-weight: bold;
  color: red;
  font-size: 25px;
  transition: all 0.2s ease;
}

.dringendBtn:hover {
  color: white;
  background-color: red;
  padding: 2px 6px;
  border-radius: 4px;
}

/* Löschen Button */
.deleteBtn {
  cursor: pointer;
  background-color: red;
  color: white;
  border: none;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.deleteBtn:hover {
  background-color: darkred;
  transform: scale(1.05);
}

/* Such-Highlight */
mark {
  background-color: yellow;
  padding: 0 2px;
  border-radius: 3px;
}
</style>