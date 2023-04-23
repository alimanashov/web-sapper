<script setup>
import {useGameStore} from "@/store/game";
import MapCell from "@/components/MapCell.vue";

const game = useGameStore();
</script>

<template>
  <div class="map" v-if="game.gameStarted">
    <div v-for="(line, ind) in game.getUserMap" :key="ind" class="line">
      <MapCell
        v-for="(cell, jnd) in line"
        :key="jnd"
        :cell="cell"
        :odd="(ind + jnd) % 2"
        @click="game.openCell(ind, jnd)"
        @contextmenu.prevent="game.markCell(ind, jnd)"
      />
    </div>
  </div>
</template>

<style scoped>
.line {
  display: flex;
  flex-direction: row;
}
</style>