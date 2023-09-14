<script setup lang="ts">
import { onMounted } from 'vue';
import { create_maze_map, maze_w, maze_h } from './assets/maze';

const offset_x = 20;
const offset_y = 20;
const segment_len = 18;

const offseted = (point: [number, number]) => {
  return [point[0] * segment_len + offset_x, point[1] * segment_len + offset_y];
}

function paint() {
  const map = create_maze_map();
  const canvas = <HTMLCanvasElement>document.querySelector('#canvas');
  const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
  canvas.width = canvas.width;
  ctx.beginPath();
  for (let i = 0; i < maze_w.value; i++) {
    for (let j = 0; j < maze_h.value; j++) {
      const from = offseted([i, j]);
      for (const point of map[i][j]) {
        const to = offseted(point);
        ctx.moveTo(from[0], from[1]);
        ctx.lineTo(to[0], to[1]);
      }

    }
  }
  ctx.stroke();
}
onMounted(
  () => paint()
)

</script>

<template>
  <el-slider v-model="maze_w" :min="1" :max="80" @input="paint"/>
  <el-slider v-model="maze_h" :min="1" :max="40" @input="paint"/>
  <canvas id="canvas" width="1525" height="745"></canvas>
</template>

<style scoped>
#canvas {
  background-color: aquamarine;
}
</style>
