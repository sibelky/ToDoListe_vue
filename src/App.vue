<template>
  <div id="app">
    <TodoListe />
  </div>
</template>

<script>
import TodoListe from "./components/TodoListe.vue";

export default {
  name: "App",
  components: { TodoListe }
};
</script>
