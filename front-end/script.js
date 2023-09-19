const startButton = document.getElementById("start")
const introPara = document.getElementById("siteIntro")
const strtbtn = document.getElementById("StartButton")
const underscores = document.getElementById("HiddenWord")
const hints = document.getElementById("hint")
const hintText = document.getElementById("hintText")

let noHints = 2
console.log(hintText)

//console.log(introPara)
//console.log(strtbtn)
//console.log(startButton)

startButton.addEventListener("click", startGame)
hints.addEventListener("click", provideHint)

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

        word = Array.from(new Array(1), _ => Array(hist["name"].length).fill(" _ "))
        for (let hs = 0; hs < hist["name"].length; hs++){
            if (hist["name"][hs] == " "){
                word[0][hs] = "/"
            }
        }
        console.log(word[0])
        underscores.textContent = word[0].join("")

    }else{
        throw "Something has gone wrong with the API request"
    }
}catch (e){
    console.log(e)
}
}

async function provideHint(){
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