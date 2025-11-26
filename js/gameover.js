const finalScore = localStorage.getItem("lastScore") || 0;
document.getElementById("final-score").textContent = "YOUR SCORE: " + finalScore;