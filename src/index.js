document.addEventListener('DOMContentLoaded', function(){
    fetchDogs()
  })
const dogsURL = "http://localhost:3000/pups"
const dogBar = document.getElementById('dog-bar')
const dogInfo = document.getElementById('dog-info')
let goodDogFilter = document.getElementById('good-dog-filter')

function fetchDogs(){
    return fetch(dogsURL)
    .then(resp => resp.json())
    .then(json => renderDogs(json))
}

function renderDogs(json){
    dogBar.innerHTML = ""
    json.forEach(dog => {renderDog(dog)
    })
}

function renderDog(dog){
    // dogBar.innerHTML = ""
const card = document.createElement('span')
card.innerText = dog.name
card.id = dog.id
card.addEventListener('mouseover', fetchDogInfo)
dogBar.appendChild(card)
}


// info pages
function fetchDogInfo(){
    return fetch(dogsURL + `/${this.id}`)
    .then(resp => resp.json())
    .then(json => renderDogInfo(json))
}

function renderDogInfo(json){
    console.log(json)
dogInfo.innerHTML = ""
const image = document.createElement('img')
const name = document.createElement('h2')
const btn = document.createElement('button')

image.src = json.image
name.innerText = json.name;
(json.isGoodDog) ? btn.innerText = "Good Dog!" : btn.innerText = "Bad Dog!"
btn.addEventListener('click', toggleGoodness)
btn.id = json.id

dogInfo.appendChild(image)
dogInfo.appendChild(name)
dogInfo.appendChild(btn)
}

function toggleGoodness(){
    console.log(this);
    // updates button text
    (this.innerText == "Good Dog!") ? this.innerText = "Bad Dog!" : this.innerText = "Good Dog!"
    
    // updates the database
    return fetch(dogsURL + `/${this.id}`, {
        method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      isGoodDog: (this.innerText == "Good Dog!") ? true : false
    })
})

}


// BONUS
// goodDogFilter.addEventListener('click', switcher)

// function switcher(){
//     if (goodDogFilter.innerText = "Filter good dogs: OFF") {
//         goodDogFilter.innerText = "Filter good dogs: ON"
//     } else {
//         goodDogFilter.innerText = "Filter good dogs: OFF"
//     }
// }

// function dogFilter(){
// //    (goodDogFilter.innerText = "Filter good dogs: OFF") ? goodDogFilter.innerText = "Filter good dogs: ON" : goodDogFilter.innerText = "Filter good dogs: OFF"
//     if (goodDogFilter.innerText = "Filter good dogs: OFF"){
//         renderDogs()
//     } else {
//         fetchGoodDogs()
//     }
// }

// function fetchGoodDogs(){
//     return fetch(dogsURL)
//     .then(resp => resp.json())
//     .then(json => filterDogs(json))
// }

// function filterDogs(json){

// }