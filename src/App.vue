<template>
  <div id="app">
    <DrawingBoard />
  </div>
</template>

<script>
import DrawingBoard from './components/drawingBoard.vue';

export default {
  name: 'App',
  components: {
    DrawingBoard,
  },
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
</style>
