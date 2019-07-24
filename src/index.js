window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    fetchAllDogs()
   
});

const dogBar = document.querySelector("#dog-bar")

const baseURL = `http://localhost:3000/pups`



const fetchAllDogs = () => {
    return fetch(baseURL)
    .then( resp => resp.json())
    
}

const fetchSingleDog = (dogId) => {
    return fetch((`http://localhost:3000/pups/${dogObj.id}`))
    .then(resp=> resp.json())
   
}

const renderAllDogsToBar = dogs => {
   dogBar.innerHTML = ""
   dogs.forEach( renderSingleDogToBar)
}

const renderSingleDogToBar = dog => {
    const dogSpan = document.createElement( "span" )
    dogSpan.innerText = dog.name 
    dogSpan.addEventListener("click", () => showDogInfo(dog))

    dogBar.append( dogSpan)
}

const showDogInfo = dog => {
    const dogInfo = document.querySelector("#dog-info")
    dogInfo.innerText = ""

    const newImage = document.createElement("img");
    newImage.src = dog.image;


    const dogTitle= document.createElement("h2");
    dogTitle.innerText = dog.name

    const dogBtn = document.createElement("button");
    dogBtn.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
    dogBtn.addEventListener("click", () => toggleGoodDog(dog.id, dogButton));

    dogInfo.append(newImage, dogTitle, dogBtn);
}

const  toggleGoodDog = (dogId, button)=> {
   fetchSingleDog(dogId)
   .then( dog => {
       button.innerText = dog.isGoodDog ? "Bad Dog!" : "Good Dog"

       fetch(dogsUrl + `/${dogId}`,{
            method: "PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ isGoodDog: !dog.isGoodDog})
        })
   })
}


const toggleFilter = e => {
    let newText = "Filter good dogs: "
    newText += e.target.innerText.includes("OFF") ? "ON" : "OFF"
    e.target.innerText = newText

    fetchAllDogs()
    .then( dogs => {
        newText.includes("ON")
        ? renderAllDogsToBar( dogs.filter(d => d.isGoodDog))
        : renderAllDogsToBar( dogs )
    })
}

const init = () => {
    fetchAllDogs().then( renderAllDogsToBar )

    const dogFilter = document.querySelector('#good-dog-filter')
    dogFilter.addEventListener('click', toggleFilter)
}

init()