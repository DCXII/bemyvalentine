function checkName() {
    const nameInput = document.getElementById('nameInput').value.trim();
    const errorMessage = document.getElementById('errorMessage');
    
    if (nameInput.toLowerCase() === "anna shaji") {
        localStorage.setItem('isLoggedIn', true);
        window.location.href = "index.html";
    } else {
        errorMessage.textContent = "Nope, only my Valentine can enter!";
        errorMessage.style.display = "block";
    }
}

// Prevent access to the game if not logged in
window.addEventListener('load', () => {
    if (window.location.pathname.endsWith('index.html') && localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = "login.html";
    }
});

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.6;

const music = document.getElementById('bg-music');
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        music.pause();
    } else {
        music.play();
    }
    isPlaying = !isPlaying;
}

let hearts = [];
let basket = { x: canvas.width / 2 - 50, y: canvas.height - 70, width: 100, height: 50 };
let score = 0;
let gameInterval;

class Heart {
    constructor() {
        this.x = Math.random() * (canvas.width - 50);
        this.y = -50;
        this.width = 50;
        this.height = 50;
        this.speed = 2 + Math.random() * 3;
    }

    draw() {
        const img = new Image();
        img.src = './images/heart.png';
        ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
    }
}

function drawBasket() {
    const img = new Image();
    img.src = './images/basket.png';
    ctx.drawImage(img, basket.x, basket.y, basket.width, basket.height);
}

function startGame() {
    document.getElementById('startButton').style.display = 'none';
    gameInterval = setInterval(updateGame, 20);
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.02) {
        hearts.push(new Heart());
    }

    hearts.forEach((heart, index) => {
        heart.update();
        heart.draw();
        if (
            heart.x < basket.x + basket.width &&
            heart.x + heart.width > basket.x &&
            heart.y < basket.y + basket.height &&
            heart.y + heart.height > basket.y
        ) {
            hearts.splice(index, 1);
            score++;
            document.getElementById('score').innerText = score;
            if (score >= 10) {
                clearInterval(gameInterval);
                window.location.href = "yes.html";
            }
        }
    });

    drawBasket();
}

canvas.addEventListener('touchmove', (e) => {
    basket.x = e.touches[0].clientX - basket.width / 2;
});
