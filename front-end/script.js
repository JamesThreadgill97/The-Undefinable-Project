const startButton = document.getElementById("start")
const introPara = document.getElementById("siteIntro")
const strtbtn = document.getElementById("StartButton")
const underscores = document.getElementById("HiddenWord")
const hints = document.getElementById("hint")
const hintText = document.getElementById("hintText")
const guessBox = document.getElementById("guessInput")
const submit = document.getElementById("submitGuess")
const createForm =document.querySelector("#create-form");


let noHints = 2
console.log(hintText)

startButton.addEventListener("click", startGame)
hints.addEventListener("click", provideHint)
submit.addEventListener("click", submitGuess)
createForm.addEventListener("submit", createNewFigure);

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
        guessBox.style.display = "inline";
        submit.style.display = "inline";

        window.word = Array.from(new Array(1), _ => Array(hist["name"].length).fill(" _ "))
        for (let hs = 0; hs < hist["name"].length; hs++){
            if (hist["name"][hs] == " "){
                word[0][hs] = "/"
            }
        }
        underscores.textContent = word[0].join("")

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
    console.log(e.target.guessInput)
    const data = e.target.guessInput.value
    let name = hist["name"]
    console.log(data)
    console.log(name)
    e.target.guessInput.value = ""
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
  
    const response = await fetch("http://localhost:3000/Create", options);
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

