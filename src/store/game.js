import {defineStore} from "pinia";

export const useGameStore = defineStore({
  id: "gameStore",
  state: () => ({
    gameStarted: false,
    gameMode: null,
    gameMap: null,
    userMap: null,
    gameTime: null,
    bombsCount: null,
    bombsFound: null,
    gameResult: null,
    gameInterval: null,
  }),
  getters: {
    getUserMap: (state) => state.userMap,
    getGameMap: (state) => state.gameMap,
    checkWin: (state) => {
      let openCellsCount = 0;
      for (let i = 0; i < state.userMap.length; i++) {
        for (let j = 0; j < state.userMap[i].length; j++) {
          if (state.userMap[i][j] !== ' ' && state.userMap[i][j] !== '!') {
            openCellsCount++;
          }
        }
      }
      return state.userMap.length * state.userMap.length - openCellsCount === state.bombsCount;
    },
    getFormattedTime: (state) => {
      const time = state.gameTime;
      if (time < 10)
        return `00:0${time}`;
      if (time < 60)
        return `00:${time}`;
      return `${(time / 60 < 10 ? '0' : '') + Math.floor(time / 60)}:${(time % 60 < 10 ? '0' : '') + time % 60}`;
    },
  },
  actions: {
    startGame(newGameMode) {
      this.bombsFound = 0;
      if (newGameMode === "easy") {
        this.gameMode = "easy"
        this.bombsCount = 10;
        this.generateMap(8, 8, 10);
      } else if (newGameMode === "medium") {
        this.gameMode = "medium";
        this.bombsCount = 20;
        this.generateMap(10, 10, 20);
      } else if (newGameMode === "hard") {
        this.gameMode = "hard";
        this.bombsCount = 30;
        this.generateMap(12, 12, 30);
      }
      this.gameTime = 0;
      this.gameStarted = true;
      this.gameInterval = setInterval(() => {
        this.gameTime++;
      }, 1000);
    },
    generateMap(n, m, k) {
      this.gameMap = [];
      this.userMap = [];
      for (let i = 0; i < n; i++) {
        const mapLine = [];
        const userMapLine = [];
        for (let j = 0; j < m; j++) {
          mapLine.push(0);
          userMapLine.push(" ");
        }
        this.gameMap.push(mapLine);
        this.userMap.push(userMapLine);
      }
      while (k > 0) {
        let x = Math.floor(Math.random() * n % n);
        let y = Math.floor(Math.random() * m % m);
        if (this.gameMap[x][y] === 0) {
          this.gameMap[x][y] = -1;
          k--;
        }
      }
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (this.gameMap[i][j] === -1)
            continue;
          if (i - 1 >= 0 && j - 1 >= 0 && this.gameMap[i - 1][j - 1] === -1)
            this.gameMap[i][j]++;
          if (i - 1 >= 0 && j >= 0 && this.gameMap[i - 1][j] === -1)
            this.gameMap[i][j]++;
          if (i >= 0 && j - 1 >= 0 && this.gameMap[i][j - 1] === -1)
            this.gameMap[i][j]++;
          if (i + 1 < n && j - 1 >= 0 && this.gameMap[i + 1][j - 1] === -1)
            this.gameMap[i][j]++;
          if (i - 1 >= 0 && j + 1 < m && this.gameMap[i - 1][j + 1] === -1)
            this.gameMap[i][j]++;
          if (i + 1 < n && j + 1 < m && this.gameMap[i + 1][j + 1] === -1)
            this.gameMap[i][j]++;
          if (i + 1 < n && j >= 0 && this.gameMap[i + 1][j] === -1)
            this.gameMap[i][j]++;
          if (i >= 0 && j + 1 < m && this.gameMap[i][j + 1] === -1)
            this.gameMap[i][j]++;
        }
      }
    },
    openCell(x, y) {
      if (this.gameResult !== null)
        return;
      if (this.gameMap[x][y] === 0) {
        this.userMap[x][y] = "-";
        if (x - 1 >= 0 && this.gameMap[x - 1][y] !== -1 && (this.userMap[x - 1][y] === " " || this.userMap[x - 1][y] === "!"))
          this.openCell(x - 1, y);
        if (x + 1 < this.gameMap.length && this.gameMap[x + 1][y] !== -1 && (this.userMap[x + 1][y] === " " || this.userMap[x + 1][y] === "!"))
          this.openCell(x + 1, y);
        if (y - 1 >= 0 && this.gameMap[x][y - 1] !== -1 && (this.userMap[x][y - 1] === " " || this.userMap[x][y - 1] === "!"))
          this.openCell(x, y - 1);
        if (y + 1 < this.gameMap[x].length && this.gameMap[x][y + 1] !== -1 && (this.userMap[x][y + 1] === " " || this.userMap[x][y - 1] === "!"))
          this.openCell(x, y + 1);
      } else if (this.gameMap[x][y] === -1) {
        this.userMap[x][y] = "#";
        this.userLost();
      } else {
        this.userMap[x][y] = this.gameMap[x][y].toString();
      }
      if (this.checkWin)
        this.userWon();
    },
    markCell(x, y) {
      if (this.gameResult !== null)
        return;
      if (this.userMap[x][y] === " ") {
        this.userMap[x][y] = '!';
      }
    },
    showBombs() {
      for (let i = 0; i < this.gameMap.length; i++) {
        for (let j = 0; j < this.gameMap.length; j++) {
          if (this.gameMap[i][j] === -1)
            this.userMap[i][j] = "#";
        }
      }
    },
    userLost() {
      this.showBombs();
      clearInterval(this.gameInterval);
      this.gameResult = false;
    },
    userWon() {
      this.showBombs();
      clearInterval(this.gameInterval);
      this.gameResult = true;
    },
  },
});
