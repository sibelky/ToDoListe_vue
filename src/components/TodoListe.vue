<template>
  <div>
    <h2>Meine To-Do-Liste</h2>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        {{ todo }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TodoListe",
  data() {
    return {
      todos: ["Einkaufen gehen", "Vue lernen", "Projekt starten"]
    };
  }
};
</script>

<style scoped>
h2 {
  color: #42b983;
}
li {
  margin: 5px 0;
}
</style>
