// ---- Settings ----
const COLS = 15;       // must be ODD
const ROWS = 15;       // must be ODD
const TILE = 30;       // pixel size of each tile
const PLAYER_COLOR = "#00ff41";
const WALL_COLOR = "#003a10";
const EXIT_COLOR = "#ffdd00";
const PATH_COLOR = "#0a0a0a";

// ---- Generate a random maze using recursive backtracking ----
// 1. Fill grid with walls (1s)
// 2. Starting at (1,1), carve open paths by jumping 2 cells at a time
// 3. Shuffle directions each time so the maze is different every game
function generateMaze(cols, rows) {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    grid.push(new Array(cols).fill(1));
  }

  function carve(col, row) {
    grid[row][col] = 0;

    const directions = [[0,-2],[2,0],[0,2],[-2,0]];
    directions.sort(() => Math.random() - 0.5); // shuffle

    for (let i = 0; i < directions.length; i++) {
      const nextCol = col + directions[i][0];
      const nextRow = row + directions[i][1];

      // Check bounds FIRST, then check if the cell is unvisited
      const insideGrid = nextRow > 0 && nextRow < rows - 1 && nextCol > 0 && nextCol < cols - 1;
      if (insideGrid && grid[nextRow][nextCol] === 1) {
        // Carve through the wall between current and next cell
        grid[row + directions[i][1] / 2][col + directions[i][0] / 2] = 0;
        carve(nextCol, nextRow);
      }
    }
  }

  carve(1, 1);
  return grid;
}

// ---- Game state variables ----
let maze, playerCol, playerRow;
let gameOver = false;
let paused = false;

// Exit is always at the bottom-right
const exitCol = COLS - 2;
const exitRow = ROWS - 2;

// ---- Canvas setup ----
const canvas = document.getElementById("canvas");
canvas.width = COLS * TILE;
canvas.height = ROWS * TILE;
const ctx = canvas.getContext("2d");

// ---- Drawing functions ----
function drawMaze() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      ctx.fillStyle = maze[row][col] === 1 ? WALL_COLOR : PATH_COLOR;
      ctx.fillRect(col * TILE, row * TILE, TILE, TILE);
    }
  }
}

function drawExit() {
  ctx.fillStyle = EXIT_COLOR;
  ctx.fillRect(exitCol * TILE, exitRow * TILE, TILE, TILE);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("★", exitCol * TILE + TILE / 2, exitRow * TILE + TILE / 2);
}

function drawPlayer() {
  ctx.fillStyle = PLAYER_COLOR;
  ctx.beginPath();
  ctx.arc(
    playerCol * TILE + TILE / 2,
    playerRow * TILE + TILE / 2,
    TILE / 2 - 4,
    0, Math.PI * 2
  );
  ctx.fill();
}

function render() {
  drawMaze();
  drawExit();
  drawPlayer();
}

// ---- Move the player ----
function movePlayer(colChange, rowChange) {
  if (gameOver || paused) return; // stop movement when game is over or paused

  const newCol = playerCol + colChange;
  const newRow = playerRow + rowChange;

  if (maze[newRow][newCol] === 1) return; // hit a wall

  playerCol = newCol;
  playerRow = newRow;
  render();

  // Check if player reached the exit
  if (playerCol === exitCol && playerRow === exitRow) {
    win();
  }
}

// ---- Pause / resume ----
function togglePause() {
  if (gameOver) return; // can't pause when the game is already over

  paused = !paused;

  if (paused) {
    stopTimer();
    // Draw a dark overlay with "[ PAUSED ]" text on the canvas
    ctx.fillStyle = "rgba(0, 10, 0, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff41";
    ctx.font = "bold 28px 'Share Tech Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("[ PAUSED ]", canvas.width / 2, canvas.height / 2);
    document.getElementById("pause-btn").textContent = "▶ RESUME";
  } else {
    startTimer();
    render(); // redraw the maze, removing the pause overlay
    document.getElementById("pause-btn").textContent = "⏸ PAUSE";
  }
}

// ---- Win ----
function win() {
  gameOver = true;
  stopTimer();

  // Show the popup with the final time
  document.getElementById("popup-time").textContent = document.getElementById("time").textContent;
  document.getElementById("popup-overlay").classList.add("visible");
}

// ---- Restart the game ----
function restartGame() {
  // Hide popup if visible
  document.getElementById("popup-overlay").classList.remove("visible");

  // Reset game state
  gameOver = false;
  paused = false;
  document.getElementById("pause-btn").textContent = "⏸ PAUSE";
  playerCol = 1;
  playerRow = 1;
  maze = generateMaze(COLS, ROWS);
  maze[exitRow][exitCol] = 0;

  // Reset and restart timer
  resetTimer();
  startTimer();

  render();
}

// ---- Timer ----
let seconds = 0;
let timerInterval = null;

function startTimer() {
  timerInterval = setInterval(function() {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById("time").textContent = minutes + ":" + String(secs).padStart(2, "0");
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  document.getElementById("time").textContent = "0:00";
}

// ---- Keyboard controls ----
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp"    || event.key === "w") movePlayer(0, -1);
  if (event.key === "ArrowDown"  || event.key === "s") movePlayer(0, 1);
  if (event.key === "ArrowLeft"  || event.key === "a") movePlayer(-1, 0);
  if (event.key === "ArrowRight" || event.key === "d") movePlayer(1, 0);
  if (event.key === "p" || event.key === "P")          togglePause();
});

// ---- Button listeners ----
document.getElementById("pause-btn").addEventListener("click", togglePause);
document.getElementById("restart-btn").addEventListener("click", restartGame);
document.getElementById("popup-restart-btn").addEventListener("click", restartGame);

// ---- Start the game for the first time ----
restartGame();
