<script setup>
import {ref, watch} from "vue";
import {useGameStore} from "@/store/game";

const game = useGameStore();
const gameDif = ref("easy");
function startGame() {
  game.startGame(gameDif.value);
}
</script>

<template>
  <div class="start-screen">
    <h1>Web Игра сапер</h1>
    <h1>Выберите сложность игры и нажмите начать!</h1>
    <select name="gameDifficultySelect" id="gDSelect" v-model="gameDif">
      <option value="easy" selected>Легко</option>
      <option value="medium">Средне</option>
      <option value="hard">Сложно</option>
    </select>
    <button class="start-btn" @click="startGame">Начать</button>
  </div>
</template>

<style scoped>
.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#gDSelect {
  margin-bottom: 1rem;
  padding: 0.5rem 0.5rem;
  font-size: 20px;
  border-radius: 5px;
}
.start-btn {
  cursor: pointer;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  color: white;
  background: dodgerblue;
}
</style>