
let score = 0;
let lives = 3;
let difficulty = 0;
const soundCorrect = new Audio("./sound/sound2.mp3");
const soundFail = new Audio("./sound/sound-fail.mp3");
const soundLevelUp = new Audio("./sound/coin.wav")
const minFontSize = 35;
const maxFontSize = 100;
 const colors = ["#00ffff", "#ff00ff", "#80ff00", "#ff0000"]
soundCorrect.volume = 0.7;
soundFail.volume = 0.7;
soundLevelUp.volume = 0.7;
let gameSpeed = 0.2;
let updateDifficulty = 50;
let nextDifficultyAt = 50;

class Word {
    constructor() {
        this.text = this.getRandomWord()
        this.positionX = Math.floor(Math.random() * 75)
        this.positionY = 0
        this.fontSize = Math.floor(Math.random() * (maxFontSize - minFontSize)) + minFontSize;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.domElement = null
        this.speed = gameSpeed + (Math.random() * 0.3)
        this.createDomElement()
        this.updateUi()
    }
    createDomElement() {
        this.domElement = document.createElement("div")
        this.domElement.className = "word"
        this.domElement.innerText = this.text;
        this.domElement.style.fontSize = this.fontSize + "px"
        this.domElement.style.color = this.color;
        const parentElm = document.getElementById("board-geek")
        parentElm.appendChild(this.domElement)
    }
    updateUi() {
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.top = this.positionY + "vh";
    }
    moveDown() {
        this.positionY += this.speed;
        this.updateUi()
    }
    getRandomWord() {
        const words = ["starwars", "darthvader", "skywalker", "yoda", "kenobi", "tatooine",
            "millenniumfalcon", "starfighter", "matrix", "neo", "trinity", "morpheus",
            "terminator", "skynet", "jurassicpark", "raptor", "godzilla", "kingkong",
            "predator", "alien", "ripley", "starlord", "groot", "thanos", "infinitygauntlet",
            "batman", "joker", "superman", "wonderwoman", "flash", "greenlantern",
            "aquaman", "spiderman", "venom", "ironman", "captainamerica", "thor",
            "hulk", "blackwidow", "hawkeye", "wolverine", "magneto", "deadpool",
            "mario", "luigi", "bowser", "zelda", "link", "metroid", "samus", "kirby",
            "pikachu", "charizard", "pokemon", "masterchief", "kratos", "atreus",
            "sonic", "tails", "knuckles", "minecraft", "creeper", "enderman",
            "fortnite", "overwatch", "tracer", "diablo", "starcraft", "warcraft",
            "geralt", "witcher", "cyberpunk", "doomguy", "pacman", "tetris",
            "megaman", "streetfighter", "ryu", "ken", "scorpion", "subzero", "raiden",
            "mandalorian", "grogu", "strangerthings", "demogorgon", "breakingbad",
            "heisenberg", "supernatural", "doctorwho", "tardis", "walkingdead",
            "rickgrimes", "gameofthrones", "winterfell", "dragonstone",
            "houseofdragon", "vampirediaries", "lost", "sherlock", "netflix", "hbo",
            "goku", "vegeta", "gohan", "freezer", "cell", "majinbuu", "luffy", "zoro",
            "sanji", "naruto", "sasuke", "kakashi", "itachi", "onepunchman",
            "saitama", "tanjiro", "nezuko", "eren", "mikasa", "levi", "akira", "totoro",
            "cosplay", "otaku", "manga", "comic", "easteregg", "trailer", "levelup",
            "respawn", "sidequest", "lootbox", "bossfight", "lanparty", "speedrun",
            "fandom", "crossover", "pixelart", "retro", "arcade", "eSports", "worldofwarcraft", "wookie", 
            "chihiro", "mononoke", "solidsnake", "cloud", "finalfantasy", "dungeon", "dungeonCrawlerCarl"]

        return words[Math.floor(Math.random() * words.length)]
    }
}


const typedWord = document.getElementById("user-input");


const wordInstancesArr = []

setInterval(() => {
    const newWordInstance = new Word()
    wordInstancesArr.push(newWordInstance)
}, 3000)


setInterval(() => {
    wordInstancesArr.forEach((element, i, arr) => {
        element.moveDown()

        if (element.positionY > 100) {
            element.domElement.remove()
            wordInstancesArr.splice(i, 1)
            soundFail.currentTime = 0;
            soundFail.play();
            lives -= 1;
            updateLives();

            if (lives <= 0) {
                localStorage.setItem("lastScore", score);
                location.href = "gameover.html";
            }

            if (lives <= 0) {
                location.href = "gameover.html";
            }
        }

    })
}, 40)

typedWord.addEventListener("input", () => {
    const userText = typedWord.value.toLowerCase();

    wordInstancesArr.forEach((wordInstance) => {

        if (wordInstance.text.startsWith(userText) && userText.length > 0) {
            wordInstance.domElement.style.color = "green";
        } else {
            wordInstance.domElement.style.color = wordInstance.color;;
        }

        if (wordInstance.text === userText) {

            soundCorrect.currentTime = 0;
            soundCorrect.play();
            wordInstance.domElement.remove();
            const index = wordInstancesArr.indexOf(wordInstance);
            wordInstancesArr.splice(index, 1);
            typedWord.value = "";

            score += 10
            updateScore()
        }

    });
});


function updateScore() {
    document.getElementById("xp").textContent = "PUNTOS: " + score;

    if (score >= nextDifficultyAt) {
        soundLevelUp.currentTime = 0;
        soundLevelUp.play();

        gameSpeed += 0.2;
        difficulty++;

        nextDifficultyAt += 50;

        difficultyCounter();
    }
}



function difficultyCounter() {
    document.getElementById("level").textContent = "DIFICULTAD: " + difficulty;
    if (updateDifficulty) {
        difficulty += 1
        updateDifficulty = false;
    }

}



function updateLives() {
    document.getElementById("hp").textContent = "VIDAS: " + lives
}

const indexMusic = document.getElementById("index-music")

/* document.addEventListener("click", () => {
    indexMusic.volume = 0.2; 
    indexMusic.play();
},);
*/

const gameMusic = document.getElementById("game-music")

document.addEventListener("click", () => {
    gameMusic.volume = 0.2;
    gameMusic.play();
},);
