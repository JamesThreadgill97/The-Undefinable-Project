const startButton = document.getElementById("start")
const introPara = document.getElementById("siteIntro")
const strtbtn = document.getElementById("StartButton")
const underscores = document.getElementById("HiddenWord")
const hints = document.getElementById("hint")
const hintText = document.getElementById("hintText")
//const guessBox = document.getElementById("guessInput")
//const submit = document.getElementById("submitGuess")
const guesses = document.querySelector("#guess-form")
const createForm =document.querySelector("#create-form");
const vicLos = document.getElementById("winLose")
const lettersUsed = document.getElementById("letterBank")

console.log(guesses)

let letter_bank = []
let noHints = 2
let lives = 9

startButton.addEventListener("click", startGame)
hints.addEventListener("click", provideHint)
guesses.addEventListener("submit", submitGuess)
createForm.addEventListener("submit", createNewFigure);

function youWin(){
    console.log("You win!")
    vicLos.textContent = `Congratulations! You win! Did you know...${hist["funFact"]}`
}

function youLose(){
    console.log("You lose!")
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
            strtbtn.style.display = "none";
            introPara.style.display = "none";
            hints.style.display = "inline";
            guesses.style.display = "inline";
            createForm.style.display = "none";

            window.word = Array.from(new Array(1), _ => Array(hist["name"].length).fill(" _ "))
            for (let hs = 0; hs < hist["name"].length; hs++){
                if (hist["name"][hs] == " "){
                    word[0][hs] = "/"
                }
            }
            underscores.textContent = word[0].join("")
            lettersUsed.textContent = "Letters used: "

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

function submitGuess(e){
    
    e.preventDefault();
    const data = e.target.guessInput.value
    let name = hist["name"]
    e.target.guessInput.value = ""
    
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
            }
        
        }else{
            lives--
            console.log(`You have ${lives} lives remaining!`)
            if (lives == 0){
                youLose()
                
            }
        }

    }
    
    

    
    
}

async function createNewFigure(e) {

    e.preventDefault();
  
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

