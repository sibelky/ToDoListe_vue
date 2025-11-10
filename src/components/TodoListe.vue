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
      <li v-for="(todo, index) in offen" :key="index">
        <label>
          <input type="checkbox" @change="aufgabeErledigt(index)" />
          <span>{{ todo }}</span>
        </label>
      </li>
    </ul>

    <h2>Erledigt:</h2>
    <ul id="Erledigt">
      <li v-for="(todo, index) in erledigt" :key="index">
        {{ todo }}
        <span class="zurueck" @click="zurueck(index)">−</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TodoListe",
  data() {
    return {
      neueAufgabe: "",
      offen: [],
      erledigt: []
    };
  },
  mounted() {
    this.ladeAufgaben();
  },
  methods: {
    speichereAufgaben() {
      localStorage.setItem(
        "todoDaten",
        JSON.stringify({ offen: this.offen, erledigt: this.erledigt })
      );
    },
    ladeAufgaben() {
      const daten = JSON.parse(localStorage.getItem("todoDaten"));
      if (daten) {
        this.offen = daten.offen;
        this.erledigt = daten.erledigt;
      } else {
        // Beispielaufgaben wie im alten HTML
        this.offen = [
          "Wocheneinkauf erledigen",
          "Oma anrufen",
          "Termin beim Zahnarzt vereinbaren",
          "Zum Fitness gehen",
          "Webtechnologien M1 erledigen",
          "Zimmer streichen"
        ];
      }
    },
    neueAufgabeHinzufuegen() {
      const text = this.neueAufgabe.trim();
      if (!text) return;
      this.offen.push(text);
      this.neueAufgabe = "";
      this.speichereAufgaben();
    },
    aufgabeErledigt(index) {
      const item = this.offen.splice(index, 1)[0];
      this.erledigt.push(item);
      this.speichereAufgaben();
    },
    zurueck(index) {
      const item = this.erledigt.splice(index, 1)[0];
      this.offen.push(item);
      this.speichereAufgaben();
    }
  }
};
</script>

<style scoped>
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
