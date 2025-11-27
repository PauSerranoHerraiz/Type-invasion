
let score = 0;
let lives = 3;
let difficulty = 0;
const soundCorrect = new Audio("./sound/sound2.mp3");
const soundFail = new Audio("./sound/sound-fail.mp3");
const soundLevelUp = new Audio("./sound/coin.wav")
const minFontSize = 35;
const maxFontSize = 100;
const colors = ["#513578", "#35786B", "#787635", "#01F5DF"]
soundCorrect.volume = 0.5;
soundFail.volume = 0.5;
soundLevelUp.volume = 0.5;
let gameSpeed = 0.2;
let updateDifficulty = 50;
let nextDifficultyAt = 50;

class Word {
    constructor() {
        this.text = this.getRandomWord()
        this.positionX = Math.floor(Math.random() * 60)
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
        const parentElm = document.getElementById("board")
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
        const words = ["cat", "dog", "sun", "moon", "star", "tree", "car", "bus", "ball", "book", "fish", "bird", "milk", "cake", "shoe", "rain", "snow",
            "wind", "apple", "bread", "house", "chair", "table", "water", "hand", "door", "light", "grass", "cloud", "rock", "cup", "map",
            "hat", "toy", "phone", "game", "school", "street", "music", "color", "train", "plane", "mouse", "cheese", "beach", "sand",
            "river", "baby", "leaf", "wood", "salt", "fire", "ice", "coat", "bag", "key", "note", "soap", "bed", "room", "jump", "run",
            "fast", "slow", "happy", "sad", "open", "close", "blue", "red", "green", "yellow", "day", "night", "long", "short", "bridge", "silver", "ocean", "forest", "castle", "planet", "shadow", "marble", "lantern", "thunder", "harbor", "feather",
            "canyon", "galaxy", "whisper", "meadow", "dolphin", "granite", "voyage", "captain", "compass", "rocket", "island", "mirror",
            "tunnel", "winter", "summer", "spring", "autumn", "valley", "timber", "dragon", "crystal", "hunter", "ranger", "sailor",
            "mountain", "pocket", "travel", "signal", "engine", "thunder", "stormy", "purple", "golden", "silver", "fabric", "copper",
            "branch", "spider", "falcon", "tiger", "lion", "rabbit", "castle", "pirate", "singer", "artist", "window", "curtain",
            "pillow", "helmet", "basket", "planet", "camera", "ticket", "market", "winter", "forest", "desert", "blossom", "branch", "ember", "glimmer", "crimson", "horizon", "echo", "willow", "rift", "tidal", "solstice", "hollow", "pinnacle", "twilight",
            "spark", "wander", "quartz", "harvest", "mystic", "lumen", "velvet", "cinder", "lizard", "mariner", "thicket", "emberfall",
            "brook", "clover", "frost", "sundrop", "meadowlight", "stormfall", "starlight", "fable", "cinderleaf", "moonstone",
            "bramble", "evergreen", "gale", "dusk", "tremor", "blizzard", "drift", "voyager", "silent", "lighthouse", "orchard",
            "harvest", "timber", "pebble", "cobalt", "quiver", "strider", "shadowed", "misty", "foggy", "tideless", "drifter",
            "starling", "swift", "crown", "emberwind", "starborn", "silverleaf", "brightwood", "lonebird", "whirl", "mariner",
            "boulder", "riftwood", "longbow", "skylight", "northwind", "stormwind", "nightfall", "sunstone", "ironwood", "signal", "castleway", "overland", "journey", "pathway", "cargo", "barrel", "string", "hollowtree", "raindrop", "sunbeam",
            "petal", "breeze", "mint", "pepper", "silentwood", "rose", "bridgeway", "harvestor", "bluebird", "greensong", "candle",
            "lanternwood", "tigerfall", "springwater", "shadowrun", "moonriver", "ironhand", "windmill", "raindance", "goldfish",
            "butterfly", "snowflake", "wildflower", "pinecone", "backpack", "footstep", "laneside", "bookstore", "playground",
            "sunshine", "evening", "morning", "midday", "shoreline", "sandstone", "seabird", "nightbird", "wildwind", "brightfall", "jazz", "blues", "music"]

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
                location.href = "./gameover.html";
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
            wordInstance.domElement.classList.add("explode");
            setTimeout(() => {
                wordInstance.domElement.remove();
            }, 300);
            const index = wordInstancesArr.indexOf(wordInstance);
            wordInstancesArr.splice(index, 1);
            typedWord.value = "";

            score += 10
            updateScore()
        }

    });
});


function updateScore() {
    document.getElementById("score").textContent = "POINTS: " + score;

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
    document.getElementById("difficulty").textContent = "DIFFICULTY: " + difficulty;
    if (updateDifficulty) {
        difficulty += 1
        updateDifficulty = false;
    }

}



function updateLives() {
    document.getElementById("lives").textContent = "LIVES: " + lives
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

