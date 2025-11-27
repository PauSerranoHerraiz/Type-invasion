
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
        const words = ["gato", "perro", "pato", "lobo", "cabra", "vaca", "pato", "puma", "foca", "rana",
            "coche", "cama", "capa", "casa", "copa", "taza", "silla", "mesa", "tubo", "cubo",
            "mar", "rio", "lago", "cima", "cima", "cola", "pico", "pelo", "mano", "dado",
            "caja", "vela", "sol", "luna", "cielo", "humo", "piedra", "metal", "papel", "techo",
            "bosque", "campo", "arena", "sal", "pan", "leche", "uva", "tela", "toro", "pez",
            "arbol", "barco", "carro", "robot", "lagarto", "tigre", "zorro", "liebre", "canguro", "camello",
            "hielo", "fuego", "vapor", "planta", "flor", "figura", "colina", "valle", "costa", "playa",
            "faro", "torre", "castillo", "cueva", "camino", "sendero", "carreta", "caravana", "ventana", "puerta",
            "cuadro", "cuerda", "bote", "lancha", "circulo", "triangulo", "cuadro", "pieza", "roca", "truco",
            "carpeta", "bolsillo", "sombrero", "armario", "botella", "cuchara", "cuchillo", "pincel", "cable", "motor", "brisa", "tormenta", "viento", "trueno", "tempestad", "marea", "orilla", "oceano", "ribera", "matorral",
            "pastor", "piloto", "marino", "capitan", "viajero", "ruta", "mapa", "viaje", "barista", "carnicero",
            "pescador", "alumno", "profesor", "director", "autor", "actor", "cantor", "poeta", "cartero", "doctor",
            "avion", "nave", "saturno", "solar", "orbita", "cometa", "galaxia", "sistema", "valvula", "estructura",
            "madera", "hormiga", "abeja", "laguna", "pantano", "volcan", "desierto", "colina", "cascada", "glaciar",
            "acero", "cobre", "carbon", "diamante", "cristal", "plata", "oro", "hierro", "roble", "sauce",
            "marea", "portal", "ciervo", "caballo", "camino", "sendero", "carreta", "tormenta",
            "lavabo", "espejo", "armario", "cocina", "patio", "garaje", "tejado", "grada", "estadio", "puente",
            "carretera", "trafico", "barrio", "pueblo", "villa", "ciudad", "campo", "parcela", "jardin", "huerto",
            "magia", "hechizo", "pocion", "runas", "cristal", "bruja", "mago", "hada"]

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
    document.getElementById("score").textContent = "PUNTOS: " + score;

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
    document.getElementById("difficulty").textContent = "DIFICULTAD: " + difficulty;
    if (updateDifficulty) {
        difficulty += 1
        updateDifficulty = false;
    }

}



function updateLives() {
    document.getElementById("lives").textContent = "VIDAS: " + lives
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
