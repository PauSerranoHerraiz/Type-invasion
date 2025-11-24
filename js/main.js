class Word {
    constructor() {
        this.text = this.getRandomWord()
        this.positionX = Math.floor (Math.random() * 95)
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
        const words = ["hello", "world", "table", "sea", "home", "sun", "pen", "cry", "beef", "quiet", "shock", "order", 
            "bubble", "beetle", "basketball", "rule"]
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
    })
}, 40)




document.addEventListener("keydown", (e) => {
    typed += e.key.toLowerCase()

    if (typed === typedWord.textContent.toLowerCase()) {
        typedWord.classList.add("hidden")
        typed = ""
        setTimeout(getRandomWord, 300)
    }
})






