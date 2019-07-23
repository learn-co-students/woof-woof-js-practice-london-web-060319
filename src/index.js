window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    getDogs()
});

dogUrl="http://localhost:3000/pups"


const getDogs=()=>{
    fetch(dogUrl)
    .then(resp=>resp.json())
    .then(pupsObj=>showDogs(pupsObj))
}

const showDogs = (pupsObj) => { 
    pupsObj.forEach(pup=> {
        const pupsDiv= document.querySelector("#dog-bar")
        const card= document.createElement("span")
        const pupCard=document.querySelector("#dog-bar span")
        card.innerText= pup.name
        pupsDiv.appendChild(card) 
        showDogFunctionality(pup,card)
    }) 
}

const showDogFunctionality=(pup,card)=>{ 
    card.addEventListener("click", (event)=>{
        pupShow=document.querySelector("#dog-info")
        pupShow.innerHTML=""
        const header = document.createElement("h2")
        header.innerText= pup.name
        const img=document.createElement("img")
        img.src= pup.image 
        const button= document.createElement("button")
        button.innerText= pup.isGoodDog? "Good Dog!" : "Bad Dog!"
        dogButtonFunctionality(button,pup)
        pupShow.appendChild(header)
        pupShow.appendChild(img)
        pupShow.appendChild(button)
    }
    )
}

const dogButtonFunctionality=(button,pup)=>{
    button.addEventListener("click", (event)=> {
        (event.target.innerText== "Good Dog!") ? event.target.innerText= "Bad Dog!" : event.target.innerText= "Good Dog!"
        debugger    
        fetch(dogUrl+ '/'+ `${pup.id}`,
            {
            method:"PATCH", 
            headers: {
                "Content-Type": "application/json"
            },     
            body: JSON.stringify({
                isGoodDog: (event.target.innerText == "Good Dog!") ? true : false 
            })
            
        })
    })
}
