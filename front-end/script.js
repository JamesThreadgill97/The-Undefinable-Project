const startButton = document.getElementById("start")
const introPara = document.getElementById("siteIntro")
const strtbtn = document.getElementById("StartButton")
const underscores = document.getElementById("HiddenWord")
const hints = document.getElementById("hint")
const hintText = document.getElementById("hintText")
const createForm =document.querySelector("#create-form");
const vicLos = document.getElementById("winLose")
const lettersUsed = document.getElementById("letterBank")
const graphic = document.getElementById("hangmanGraphic")
const counter = document.getElementById("WinLossCounter")
const link = document.getElementById("hyperlink")
//const { Console } = require("console")
const boardKey = document.getElementById("keyboard")


console.log(counter)

link.setAttribute("target", "")
let letter_bank = []
let noHints = 2
let lives = 8
let wins = 0
let losses = 0

startButton.addEventListener("click", startGame)
hints.addEventListener("click", provideHint)
createForm.addEventListener("submit", createNewFigure);
boardKey.addEventListener("click", KeyboardGuess)

function youWin(){
    console.log("You win!")
    wins++
    vicLos.textContent = `Congratulations! You win! Did you know...${hist["funFact"]}`

}    
function endGame(){
    createForm.style.display = "inline"
    strtbtn.style.display = "inline";
    introPara.style.display = "inline";
    hints.style.display = "none";
    lettersUsed.textContent = ""
    underscores.textContent = hist["name"]
    underscores.style.fontWeight = "bold"
    graphic.src = `./Images/${hist["name"]}.png`
    graphic.style.borderRadius = "8px"
    graphic.style.width = "200px"
    graphic.style.width = "200px"
    graphic.onmouseover = "scale: 1.2"
    boardKey.style.display = "none"
    counter.textContent = `Wins: ${wins}, Losses:${losses}`
    let nom = hist["name"].split(' ')
    nom = nom.join('_')
    if (hist["name"] == "King Sweyn Forkbeard"){
        nom = "Sweyn_Forkbeard"
    }
    link.setAttribute("href", `https://en.wikipedia.org/wiki/${nom}`)
    link.setAttribute("alt", `A picture of ${nom}`)
    link.setAttribute("target", "_blank")
    letter_bank = []
    lives = 8
    noHints = 2
    hintText.textContent = ""

}

function youLose(){
    console.log("You lose!")
    losses++
    vicLos.textContent = `I'm sorry, you're out of lives! Did you know...${hist["funFact"]}`
    
}

async function startGame(){
    try{
        const repsData = await fetch(`https://backendfigures.onrender.com/`)
        if (repsData.ok){
            const data = await repsData.json()
            window.hist = {
                name: data.name,
                hint1: data.hint1,
                hint2: data.hint2,
                funFact: data.funFact
            }
            console.log(hist)
            link.setAttribute("href", "javascript: void(0)")
            link.setAttribute("target", "")

            strtbtn.style.display = "none";
            introPara.style.display = "none";
            hints.style.display = "inline";
            //guesses.style.display = "inline";
            createForm.style.display = "none";
            vicLos.textContent = "";
            graphic.src = "./Images/Hangman_0.png";
            graphic.style.borderRadius = "0px"
            boardKey.style.display = "flex"
            counter.textContent = `Wins: ${wins}, Losses:${losses}`



            window.word = Array.from(new Array(1), _ => Array(hist["name"].length).fill(" _ "))
            for (let hs = 0; hs < hist["name"].length; hs++){
                if (hist["name"][hs] == " "){
                    word[0][hs] = "/"
                }
            }

            underscores.textContent = word[0].join("")
            lettersUsed.textContent = "Letters used: "
            const buttons = document.querySelectorAll('.key');
            buttons.forEach(button => {
                button.removeAttribute('disabled');
            });
        }else{
            throw "Something has gone wrong with the API request"
        }
    }catch (e){
        console.log(e)
    }
}


function provideHint(){
    if (noHints > 0){
        if (noHints == 2){
            hintText.textContent = hist["hint1"]
        }else{
            hintText.textContent = hist["hint2"]
        }
        noHints--
    }else{
        hintText.textContent = "You're out of hints!"
    }
    console.log(hintText.textContent)
}


function KeyboardGuess(e){
    data = e.target.value
    console.log(data)
    if(data != undefined){
        let name = hist["name"]
    e.target.disabled = true

    if (letter_bank.includes(data)){
        alert(`You've already used "${data.toUpperCase()}"!`)

    }else{letter_bank.push(data)
        lettersUsed.textContent = `Letters used: ${letter_bank.join(", ")}`
        if (name.toLowerCase().includes(data.toLowerCase())){
            for(let j = 0; j < name.length; j++){
                if (name[j].toLowerCase() == data.toLowerCase()){
                    if (j == 0 || (j > 0 && word[0][j - 1] == "/")){
                        word[0][j] = data.toUpperCase()
                    }else{
                        word[0][j] = data.toLowerCase()
        
                    }
                }
            }
            underscores.textContent = word[0].join("")
            console.log(underscores.textContent)
            console.log(underscores.textContent.includes(" _ "))
            if (underscores.textContent.includes("_") == false){
                youWin()
                endGame()
            }
        
        }else{
            lives--
            console.log(`You have ${lives} lives remaining!`)
            n = 8 - lives
            console.log(lives)
            string = `./Images/Hangman_${n}.png`
            graphic.src = string

            if (lives == 0){
                youLose()
                endGame()
            }
        }
    } 
    }
       
}

async function createNewFigure(e) {
    e.preventDefault();
    //// The ^ and $ symbols ensure that the entire string is composed of letters and/or spaces only
    const TestString=/^[A-Za-z\s]+$/;

    if (e.target.name.value == "" ||e.target.hint1.value == "" ||e.target.hint2.value == "" ||e.target.funFact.value == "" ){
        alert("Fill out all the boxes.");
    }

    else if (TestString.test(e.target.name.value)== false || TestString.test(e.target.hint1.value)== false ||TestString.test(e.target.hint2.value)== false ||TestString.test(e.target.funFact.value)== false ){
        alert("Please Enter Only Letters");
    }
    
    else{
        
        const data = {
            name: e.target.name.value,
            hint1: e.target.hint1.value,
            hint2: e.target.hint2.value ,
            funFact: e.target.funFact.value 
    
        }
        console.log(data)
        
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    
        const response = await fetch("https://backendfigures.onrender.com/Create", options);
        console.log(response)
        if (response.status == 201) {
            e.target.name.value = ''
            e.target.hint1.value = ''
            e.target.hint2.value = ''
            e.target.funFact.value  = ''
            alert("Figure added.")
            }
        else{
            alert("Something is wrong")
        }
  }
}
//module.exports={youWin,youLose,startGame,provideHint,submitGuess,createNewFigure,testEnvironment: 'jsdom'}
//export default youWin; youLose; startGame; provideHint; submitGuess; createNewFigure; testEnvironment: 'jsdom'

