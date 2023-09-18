const startButton = document.getElementById("start")

//console.log(startButton)

startButton.addEventListener("click", startGame)

async function startGame(){

    const repsData = await fetch(``)
    if (repsData.ok){
        const data = await repsData.json()

    }
}