// Get the canvas element and its context
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 400;

// Create the pong paddle
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

// Left paddle object
const leftPaddle = {
  x: 0,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  speed: 4,
  dy: 0
};

// Right paddle object
const rightPaddle = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  speed: 4,
  dy: 0
};

// Ball object
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: ballSize,
  speed: 4,
  dx: 4,
  dy: 4
};

// Draw the paddles and ball
function drawPaddle(x, y, width, height) {
  ctx.fillStyle = '#fff';
  ctx.fillRect(x, y, width, height);
}

function drawBall(x, y, radius) {
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

// Move paddles
function movePaddles() {
  leftPaddle.y += leftPaddle.dy;
  rightPaddle.y += rightPaddle.dy;

  // Prevent paddles from going out of bounds
  if (leftPaddle.y < 0) leftPaddle.y = 0;
  if (leftPaddle.y + leftPaddle.height > canvas.height) leftPaddle.y = canvas.height - leftPaddle.height;
  if (rightPaddle.y < 0) rightPaddle.y = 0;
  if (rightPaddle.y + rightPaddle.height > canvas.height) rightPaddle.y = canvas.height - rightPaddle.height;
}

// Move ball
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Ball collision with top and bottom walls
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.dy = -ball.dy;
  }

  // Ball collision with paddles
  if (
    ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
    ball.y > leftPaddle.y &&
    ball.y < leftPaddle.y + leftPaddle.height
  ) {
    ball.dx = -ball.dx;
  }
  if (
    ball.x + ball.radius > rightPaddle.x &&
    ball.y > rightPaddle.y &&
    ball.y < rightPaddle.y + rightPaddle.height
  ) {
    ball.dx = -ball.dx;
  }

  // Ball out of bounds (scoring)
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    resetBall();
  }
}

// Reset ball to the center
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = -ball.dx;
  ball.dy = 4;
}

// Update the game
function update() {
  movePaddles();
  moveBall();
  draw();
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
  drawPaddle(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
  drawBall(ball.x, ball.y, ball.radius);
}

// Control the paddles with keyboard
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp') rightPaddle.dy = -rightPaddle.speed;
  if (event.key === 'ArrowDown') rightPaddle.dy = rightPaddle.speed;
  if (event.key === 'w') leftPaddle.dy = -leftPaddle.speed;
  if (event.key === 's') leftPaddle.dy = leftPaddle.speed;
});

document.addEventListener('keyup', function(event) {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') rightPaddle.dy = 0;
  if (event.key === 'w' || event.key === 's') leftPaddle.dy = 0;
});

// Game loop
function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

gameLoop();
