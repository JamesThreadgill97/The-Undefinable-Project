const startButton = document.getElementById("start")
const introPara = document.getElementById("siteIntro")
const strtbtn = document.getElementById("StartButton")

//console.log(introPara)
//console.log(strtbtn)
//console.log(startButton)

startButton.addEventListener("click", startGame)

async function startGame(){
try{
    const repsData = await fetch(`http://localhost:3000/`)
    if (repsData.ok){
        const data = await repsData.json()
        const hist = {
            name: data.name,
            hint1: data.hint1,
            hint2: data.hint2,
            funFact: data.funFact
        }
        console.log(hist)
        strtbtn.style.display = "none";
        introPara.style.display = "none";

    }else{
        throw "Somethhing has gone wrong with the API request"
    }
}catch (e){
    console.log(e)
}
}