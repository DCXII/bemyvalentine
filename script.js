// GSAP Animations
gsap.to('.animate-text', {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.3,
    ease: 'power2.out'
});

// Timeline Interactions
const memories = [
    { img: 'images/event1.jpg', text: 'Our first meeting... and everything changed.' },
    { img: 'images/event2.jpg', text: 'Long distance but closer hearts.' },
    { img: 'images/event3.jpg', text: 'Our first Valentine\'s Day!' }
];

function showMemory(index) {
    document.getElementById('memory-image').src = memories[index - 1].img;
    document.getElementById('memory-text').textContent = memories[index - 1].text;
    document.getElementById('memory-modal').style.display = 'block';
}

function closeMemory() {
    document.getElementById('memory-modal').style.display = 'none';
}

// Background Music Control
const music = document.getElementById('bg-music');
function toggleMusic() {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

// Love Notes Slider
document.addEventListener('DOMContentLoaded', () => {
    new Splide('.splide', {
        type: 'loop',
        autoplay: true,
        interval: 3000
    }).mount();
});
