const startButton = document.getElementById("start")
const introPara = document.getElementById("siteIntro")
const strtbtn = document.getElementById("StartButton")
const createForm =document.querySelector("#create-form");
createForm.addEventListener("submit", createNewFigure);


//console.log(introPara)
//console.log(strtbtn)
//console.log(startButton)

startButton.addEventListener("click", startGame)

async function startGame(){
    
try{
    const repsData = await fetch(`https://backendfigures.onrender.com/`)
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
        throw "Something has gone wrong with the API request"
    }
}catch (e){
    console.log(e)
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
  