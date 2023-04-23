<script setup>
import GameMap from "@/components/GameMap.vue";
import GameStartScreen from "@/components/GameStartScreen.vue";
import {useGameStore} from "@/store/game";
import UserLost from "@/components/UserLost.vue";
import UserWon from "@/components/UserWon.vue";

const game = useGameStore();
</script>

<template>
  <div class="game-wrapper">
    <GameStartScreen v-if="!game.gameStarted" />
    <div v-else class="game">
      <div class="game-controls">
        <div class="game-timer">
          {{ game.getFormattedTime }}
        </div>
      </div>
      <GameMap />
    </div>
    <div v-if="game.gameResult !== null">
      <UserLost v-if="game.gameResult === false" />
      <UserWon v-else/>
    </div>
  </div>
</template>

<style scoped>
.game-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.game-controls {
  display: flex;
}
</style>
