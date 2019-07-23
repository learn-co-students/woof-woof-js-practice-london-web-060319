document.addEventListener("DOMContentLoaded", event => {
    fetchDogs()
})

const dogBar = document.querySelector("#dog-bar")

const fetchDogs = () => {
    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(dogs => {
        arrayDogNames(dogs)
    })
}

const makeSpan = (dog) => {
    const newSpan = document.createElement("span")
    newSpan.innerText = dog.name
    newSpan.dataset.id = dog.id
    newSpan.dataset.img = dog.image
    newSpan.dataset.nice = dog.isGoodDog
    newSpan.addEventListener("click", clickDog)
    dogBar.appendChild(newSpan)
}

const arrayDogNames = (dogs) => {
    dogs.forEach(element => {
        makeSpan(element)
    });
}

// ------------------

const dogInfo = document.querySelector("#dog-info")

const goodDog = (bool) => {
    if (bool === "true") {
        return "Good Dog!"
    }
    else { return "Bad Dog!" }
}

const clickDog = (event) => {
    dogInfo.innerHTML = ""
    const dog = event.target.dataset.id
    const bool = event.target.dataset.nice
    
    const makeImage = document.createElement("img")
    makeImage.src = event.target.dataset.img

    const makeH2 = document.createElement("h2")
    makeH2.innerText = event.target.innerText

    const makeButton = document.createElement("button")
    makeButton.innerText = goodDog(bool)
    makeButton.dataset.id = dog
    makeButton.addEventListener("click", updateDog)

    dogInfo.appendChild(makeImage)
    dogInfo.appendChild(makeH2)
    dogInfo.appendChild(makeButton)
}

// -------------

const checkDog = (dog) => {
    if (dog === "Good Dog!") {
        return "false"
    }
    else { return "true" }
}

const updateDog = (event) => {
    const dogId = event.target.dataset.id
    const dogNice = event.target.innerText
    const nice = checkDog(dogNice)
    patchDogs(dogId, nice)
}

const switchDog = (dog) => {
    const button = dogInfo.childNodes[2]
    if (dog.isGoodDog === "true") {
        button.innerText = "Good Dog!"
    } 
    else if ( dog.isGoodDog === "false") {
        button.innerText = "Bad Dog!"
    }
}

const patchDogs = (dogId, nice) => {
    fetch(`http://localhost:3000/pups/${dogId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Content-Type': 'application/json'
          },
        body: JSON.stringify ({
            isGoodDog: nice
        })
    })
    .then(resp => resp.json())
    .then(dog => {
        switchDog(dog)
    })
}

