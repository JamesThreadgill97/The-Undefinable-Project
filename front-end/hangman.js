
const prompt = require(`prompt-sync`)()
const history = require(`../back-end/historicalFigures.json`)

function isLetter(g){
    if (g.length > 1 || typeof(g) != "string"){
        console.log("ERR Please enter only one guess")
        return false
    }else{
        return true
    }
}

let lives = 8

let n = Math.floor(Math.random() * history.length)
let word = history[n].name



let matrix = Array.from(new Array(1), _ => Array(word.length).fill("_"))
let hasSpaces = true
for (let hs = 0; hs < word.length; hs++){
    if (word[hs] == " "){
        matrix[0][hs] = "/"
    }

}



let guess
let complete = false
console.log(matrix[0])
console.log(history[n].hint1)

while (complete == false){
guess = prompt("Guess a letter\n");
console.log("Checking")

if (word.toLowerCase().includes(guess)){
    for(let j = 0; j < word.length; j++){
        if (word[j].toLowerCase() == guess.toLowerCase()){
            if (j == 0 || (j > 0 && matrix[0][j - 1] == "/")){
                matrix[0][j] = guess.toUpperCase()
            }else{
                matrix[0][j] = guess.toLowerCase()

            }
        }
    }
    matrix[0].includes("_") ? complete = false : complete = true

}else{
    lives--
    console.log(`You have ${lives} lives remaining!`)
    if (lives == 0){
        complete = true
        console.log("You lose")
    }
}
console.log(matrix[0])

}

if (matrix[0].includes("_") == false){
    console.log("Congratulations! You win!")
    console.log(`Did you know...\n${history[n].hint2}`)
}

