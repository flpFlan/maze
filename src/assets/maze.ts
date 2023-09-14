import { ref } from "vue";

export const maze_w = ref(10);
export const maze_h = ref(10);

export function create_maze_map() {
  const map: [number, number][][][] = [];
  // initialize a raw map
  for (let i = 0; i < maze_w.value; i++) {
    map.push([]);
    for (let j = 0; j < maze_h.value; j++) {
      map[i].push([]);
    }
  }
  // deep first search
  let visited: boolean[][] = [];
  for (let i = 0; i < maze_w.value; i++) {
    visited.push([]);
    for (let j = 0; j < maze_h.value; j++) {
      visited[i].push(false);
    }
  }
  function dfs(x: number, y: number) {
    visited[x][y] = true;
    const directions = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ];
    directions.sort(() => Math.random() - 0.5);
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx >= 0 &&
        nx < maze_w.value &&
        ny >= 0 &&
        ny < maze_h.value &&
        !visited[nx][ny]
      ) {
        map[x][y].push([nx, ny]);
        dfs(nx, ny);
      }
    }
  }
  dfs(0, 0);
  return map;
}
