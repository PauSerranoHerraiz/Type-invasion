class Word {
    constructor() {
        this.text = this.getRandomWord()
        this.positionX = Math.floor(Math.random() * 90)
        this.positionY = 0
        this.domElement = null
        this.speed = 0.2 + (Math.random() * 0.3)
        this.createDomElement()
        this.updateUi()
    }
    createDomElement() {
        this.domElement = document.createElement("div")
        this.domElement.className = "word"
        this.domElement.innerText = this.text;
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
// console.log(typedWord.value);



const wordInstancesArr = []

// generate new words
setInterval(() => {
    const newWordInstance = new Word()
    wordInstancesArr.push(newWordInstance)
}, 5000)

setInterval(() => {
    wordInstancesArr.forEach((element, i, arr) => {
        element.moveDown()

       /* if (element.positionY > 100) {
            location.href = "gameover.html";
        } */

    })
}, 40)



typedWord.addEventListener("input", () => {
    const userText = typedWord.value.toLowerCase();

    wordInstancesArr.forEach((wordInstance) => {

        if (wordInstance.text.startsWith(userText) && userText.length > 0) {
            wordInstance.domElement.style.color = "green";
        } else {
            wordInstance.domElement.style.color = "black";
        }

        if (wordInstance.text === userText) {
            wordInstance.domElement.remove();
            const index = wordInstancesArr.indexOf(wordInstance);
            wordInstancesArr.splice(index, 1);
            typedWord.value = "";
        }
    });
});

let score = 0;
function updateScore()

