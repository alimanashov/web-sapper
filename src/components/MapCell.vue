<script setup>
const props = defineProps({
  cell: String,
  odd: {
    default: false,
  },
});
</script>

<template>
  <div class="cell" :class="{'odd-cell': odd, 'open-cell': (cell !== ' ' && cell !== '!')}">
    <div v-if="cell !== '!' && cell !== '-' && cell !== '#'">{{ cell }}</div>
    <div v-else-if="cell === '!'" class="mark"></div>
    <div v-else-if="cell === '#'" class="bomb"></div>
  </div>
</template>

<style scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border: 1px solid black;
  font-size: 20px;
  font-weight: bold;
  background: rgb(179, 214, 101);
}
.odd-cell {
  background: rgb(172, 208, 4);
}
.open-cell {
  background: rgb(223, 195, 163);
}
.odd-cell.open-cell {
  background: rgb(210, 185, 157);
}
.mark {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: red;
}
.bomb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: black;
}
</style>
