<template>
  <div>
    <h1>Willkommen zu deiner To-Do Liste!</h1>
    <p class="subtitle">
      Hier kannst du deine To-Do's hinzufügen, als erledigt markieren und wieder zurückholen.
    </p>

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

    <h2>Noch zu erledigen:</h2>
    <ul id="Nichterledigt">
      <li v-for="todo in offen" :key="todo.id">
        <label>
          <input type="checkbox" @change="aufgabeErledigt(todo)" />
          <span>{{ todo.task }}</span>
        </label>
      </li>
    </ul>

    <h2>Erledigt:</h2>
    <ul id="Erledigt">
      <li v-for="todo in erledigt" :key="todo.id">
        {{ todo.task }}
        <span class="zurueck" @click="zurueck(todo)">−</span>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "./api.js";

export default {
  name: "TodoListe",
  data() {
    return {
      neueAufgabe: "",
      todos: []
    };
  },
  computed: {
    offen() {
      return this.todos.filter(t => !t.done);
    },
    erledigt() {
      return this.todos.filter(t => t.done);
    }
  },
  mounted() {
    this.ladeAufgaben();
  },
  methods: {
    async ladeAufgaben() {
      try {
        const res = await api.get("/api/todos");
        this.todos = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async neueAufgabeHinzufuegen() {
      const text = this.neueAufgabe.trim();
      if (!text) return;
      try {
        const res = await api.post("/api/todos", { task: text });
        this.todos.push(res.data);
        this.neueAufgabe = "";
      } catch (err) {
        console.error(err);
      }
    },
    async aufgabeErledigt(todo) {
      try {
        const res = await api.put(`/api/todos/${todo.id}`, { done: true });
        todo.done = res.data.done;
      } catch (err) {
        console.error(err);
      }
    },
    async zurueck(todo) {
      try {
        const res = await api.put(`/api/todos/${todo.id}`, { done: false });
        todo.done = res.data.done;
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
/* ...dein bestehender Style bleibt unverändert... */
body {
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
}

h2,
h3 {
  color: #4682b4;
  font-family: Times New Roman, monospace;
}

p {
  color: #4682b4;
  text-align: center;
  font-size: 14px;
}

#eingabe {
  text-align: center;
  margin-bottom: 20px;
}

h1,
.subtitle {
  text-align: center;
  margin-bottom: 15px;
}

#Nichterledigt,
#Erledigt {
  list-style: none;
  padding: 0;
  max-width: 600px;
  margin: 0 auto;
}

#Erledigt li {
  color: gray;
  text-decoration: line-through;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.zurueck {
  cursor: pointer;
  color: red;
  font-weight: bold;
  margin-left: 10px;
}

#Nichterledigt li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

img {
  width: 160px;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>
