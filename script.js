const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

let x = 100; // x position of the ball
let y = 100; // y position of the ball
let radius = 20; // radius of the ball
let dx = 5; // x velocity of the ball
let dy = 5; // y velocity of the ball
let rightRectangleX = canvas.width - 100;
let rightRectangleY = canvas.height / 2;
let leftRectangleX = 100;
let leftRectangleY = canvas.height / 2;
let rectangleSpeed = 5;
let keyState = {};
function moveRectangles() {
    if (keyState['ArrowUp']) {
        rightRectangleY -= rectangleSpeed;
    }
    if (keyState['ArrowDown']) {
        rightRectangleY += rectangleSpeed;
    }
    if (keyState['w']) {
        leftRectangleY -= rectangleSpeed;
    }
    if (keyState['s']) {
        leftRectangleY += rectangleSpeed;
    }

    // Prevent rectangles from moving out of bounds
    rightRectangleY = Math.max(0, Math.min(canvas.height - 0.287 * canvas.height, rightRectangleY));
    leftRectangleY = Math.max(0, Math.min(canvas.height - 0.287 * canvas.height, leftRectangleY));
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
}

function repositionRectangle() {
    rightRectangleX = canvas.width - 100;
    rightRectangleY = canvas.height / 2;
    leftRectangleX = 100;
    leftRectangleY = canvas.height / 2;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dx=0.004*canvas.width*Math.sign(dx);
    dy=0.007*canvas.height*Math.sign(dy);
    // Draw ball
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
    
    // Draw rectangles
    ctx.fillStyle = 'black'; // Change the color of rectangles for better visibility
    ctx.fillRect(rightRectangleX, rightRectangleY, 0.033 * canvas.width, 0.287 * canvas.height);
    ctx.fillRect(leftRectangleX, leftRectangleY, 0.033 * canvas.width, 0.287 * canvas.height);

    // Update ball position
    x += dx;
    y += dy;

    // Check for boundary collision with the canvas edges
    if (x + radius > canvas.width || x - radius < 0) {
        x = canvas.width / 2;
        y = canvas.height / 2; // Reset position if hitting left/right boundaries
    }
    if (y + radius > canvas.height || y - radius < 0) {
        dy = -dy; // Reverse the y velocity if hitting top/bottom boundaries
    }
    if (x + radius > rightRectangleX && x + radius<rightRectangleX+0.033*canvas.width && y > rightRectangleY && y < rightRectangleY + 0.287 * canvas.height) {
        dx = -dx; // Reverse the x velocity if hitting the right rectangle
        x-=10; // Move the ball back to prevent it from getting stuck
    }
    if (x - radius < leftRectangleX + 0.033 * canvas.width && x > leftRectangleX && y > leftRectangleY && y < leftRectangleY + 0.287 * canvas.height) {
        dx = -dx;
        x+=10;
    }
    moveRectangles();
    requestAnimationFrame(animate);
}

animate();
window.addEventListener('resize', resizeCanvas);
window.addEventListener('resize', repositionRectangle);
document.addEventListener('keydown', function(e) {
    keyState[e.key] = true;
});
document.addEventListener('keyup', function(e) {
    keyState[e.key] = false;
});


