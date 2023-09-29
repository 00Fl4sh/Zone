const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const snake = [{ x: 5, y: 5 }];
const apple = { x: 10, y: 10 };
let direction = "right";
let score = 0;
let gameInterval; 
let gameRunning = false; // Track if the game is running

// Speed levels (time intervals in milliseconds)
const speedLevels = {
  slow: 300,
  medium: 200,
  fast: 100,
};
// Add event listeners for arrow buttons
document.getElementById("upButton").addEventListener("click", () => {
  if (direction !== "down") direction = "up";
});

document.getElementById("leftButton").addEventListener("click", () => {
  if (direction !== "right") direction = "left";
});

document.getElementById("rightButton").addEventListener("click", () => {
  if (direction !== "left") direction = "right";
});

document.getElementById("downButton").addEventListener("click", () => {
  if (direction !== "up") direction = "down";
});


// Default speed level
let currentSpeed = speedLevels.medium;

// Function to update the game loop interval
function setGameSpeed(speed) {
  clearInterval(gameInterval);
  currentSpeed = speed;
  if (gameRunning) {
    // If the game is running, restart it with the new speed
    gameInterval = setInterval(gameLoop, currentSpeed);
  }
}

// Speed buttons click event listeners
document.getElementById("slowSpeed").addEventListener("click", () => {
  setGameSpeed(speedLevels.slow);
  startGame();
});

document.getElementById("mediumSpeed").addEventListener("click", () => {
  setGameSpeed(speedLevels.medium);
  startGame();
});

document.getElementById("fastSpeed").addEventListener("click", () => {
  setGameSpeed(speedLevels.fast);
  startGame();
});

function updateScore() {
  score++;
  document.getElementById("score").textContent = "Score: " + score;
}

function endGame() {
  clearInterval(gameInterval);
  document.getElementById("finalScore").textContent = score;
  document.getElementById("gameOver").style.display = "block";
  gameRunning = false; // Stop the game
}

function resetGame() {
  snake.length = 1;
  snake[0] = { x: 5, y: 5 };
  direction = "right";
  score = 0;
  document.getElementById("score").textContent = "Score: 0";
  document.getElementById("gameOver").style.display = "none";
  if (gameRunning) {
    // If the game is running, restart it with the current speed
    gameInterval = setInterval(gameLoop, currentSpeed);
  }
}

document.getElementById("playAgain").addEventListener("click", resetGame);

document.getElementById("resetGame").addEventListener("click", resetGame);

function drawSnake() {
  ctx.fillStyle = "black";
  snake.forEach((segment, index) => {
    if (index === 0) {
      // Draw the snake's head as a circle
      const radius = gridSize / 2;
      const x = segment.x * gridSize + gridSize / 2;
      const y = segment.y * gridSize + gridSize / 2;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Draw the body segments as squares
      ctx.fillRect(
        segment.x * gridSize,
        segment.y * gridSize,
        gridSize,
        gridSize
      );
    }
  });
}

function drawApple() {
  ctx.fillStyle = "#f00";
  ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
}

function update() {
  const head = { ...snake[0] };

  if (direction === "right") head.x++;
  if (direction === "left") head.x--;
  if (direction === "up") head.y--;
  if (direction === "down") head.y++;

  snake.unshift(head);

  if (head.x === apple.x && head.y === apple.y) {
    // Snake ate the apple
    apple.x = Math.floor(Math.random() * (canvas.width / gridSize));
    apple.y = Math.floor(Math.random() * (canvas.height / gridSize));
    updateScore(); // Update the score when the snake eats the apple
  } else {
    // Remove the tail segment
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];
  if (
    head.x < 0 ||
    head.x >= canvas.width / gridSize ||
    head.y < 0 ||
    head.y >= canvas.height / gridSize
  ) {
    endGame();
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawApple();
  update();
  checkCollision();
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") direction = "up";
      break;
    case "ArrowDown":
      if (direction !== "up") direction = "down";
      break;
    case "ArrowLeft":
      if (direction !== "right") direction = "left";
      break;
    case "ArrowRight":
      if (direction !== "left") direction = "right";
      break;
  }
});


function startGame() {
    gameRunning = true; 
    clearInterval(gameInterval); 
    gameInterval = setInterval(gameLoop, currentSpeed);
  }
  
  
