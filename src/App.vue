<script>
import TodoListe from './components/TodoListe.vue';

export default {
  name: 'App',
  components: { TodoListe }
};
</script>

<template>
  <div id="app">
    <h1>Willkommen zu meiner Vue-App!</h1>
    <TodoListe />
  </div>
</template>


<style scoped></style>
