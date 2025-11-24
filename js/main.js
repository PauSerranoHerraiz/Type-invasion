const words = ["hello", "world", "javascript", "mesa", "casa", "luz", "sol"]
const typedWord = document.getElementById("word");
let typed = ""

function randomWord() {
    const newWord = words[Math.floor(Math.random() * words.length)]
    typedWord.textContent = newWord;
    typedWord.classList.remove("hidden");
    typed = "";
}

setInterval(randomWord, 5000)
randomWord();


document.addEventListener("keydown", (e) => {
    typed += e.key.toLowerCase()

    if (typed === typedWord.textContent.toLowerCase()) {
        typedWord.classList.add("hidden")
        typed = ""
        setTimeout (randomWord, 300)
    }
})
/*
const input = document.getElementById("word")

input.addEventListener("input", function () {
    if(input.value === newWord) {
    words.style.display = "none"
}
}) */





