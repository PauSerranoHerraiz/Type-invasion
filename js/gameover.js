const finalScore = localStorage.getItem("lastScore") || 0;
document.getElementById("final-score").textContent = "YOUR SCORE: " + finalScore;

const gameMusic = document.getElementById("gameover-music");
if (gameMusic) {
    const saved = localStorage.getItem('ti_volume');
    gameMusic.volume = saved !== null ? parseFloat(saved) : 0.2;

    document.addEventListener('click', () => {
        gameMusic.play().catch(() => { });
    }, { once: true });
}