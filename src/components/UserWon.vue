<script setup>
import {useGameStore} from "@/store/game";

const game = useGameStore();
</script>

<template>
  <div class="user-won">
    <h1>Поздравляю вы выиграли!</h1>
    <h2>Вы выиграли за {{ game.getFormattedTime }}</h2>
  </div>
</template>

<style scoped></style>