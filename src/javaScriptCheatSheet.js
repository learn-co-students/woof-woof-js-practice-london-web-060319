
// run server $ json-server --watch db.json

const dogsUrl = 'http://localhost:3000/pups'
const dogBar = document.querySelector("#dog-bar")

// On the page, there is a div with the id of "dog-bar". 
// On page load, make a fetch to get all of the pup objects. 
const fetchAllDogs = () => {
  return fetch(dogsUrl)
  .then( resp => resp.json() )
}

const fetchSingleDog = dogId => {
  return fetch(dogsUrl + `/${dogId}`)
  .then( resp => resp.json() )
}

const renderAllDogsToBar = dogs => {
  dogBar.innerHTML = ""
  dogs.forEach( renderSingleDogToBar )
}

// When you have this information, 
// you'll need to add a span with the pup's name to the dog 
// bar (ex: <span>Mr. Bonkers</span>).
const renderSingleDogToBar = dog => {
  const dogSpan = document.createElement('span')
  dogSpan.innerText = dog.name
  dogSpan.addEventListener('click', () => showDogInfo(dog))

  dogBar.append(dogSpan)
}

// When a user clicks on a pup's span in the dog bar, that pup's info 
// (image, name, and isGoodDog status) should show up in 
// the div with the id of "dog-info"
// div should have the following children

const showDogInfo = dog => {
  const dogInfo = document.querySelector('#dog-info')
  dogInfo.innerHTML = ""

  const dogImg = document.createElement('img')
  dogImg.src = dog.image

  const dogTitle = document.createElement('h2')
  dogTitle.innerText = dog.name

  const dogButton = document.createElement('button')
  dogButton.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!" 
  dogButton.addEventListener('click', () => toggleGoodDog(dog.id, dogButton))

  dogInfo.append(dogImg, dogTitle, dogButton)
}
// TOGGLE GOOD DOG When a user clicks the Good Dog/Bad Dog button, 
// two things should happen:
const toggleGoodDog = (dogId, button) => {
  fetchSingleDog(dogId)
  .then( dog => {
    button.innerText = dog.isGoodDog ? "Bad Dog!" : "Good Dog!"
    // update a dog by making a PATCH request to /pups/:id
    fetch(dogsUrl + `/${dogId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isGoodDog: !dog.isGoodDog })
    })
  })
}

// When a user clicks on the Filter Good Dogs button, two things should happen:
const toggleFilter = e => {
  let newText = "Filter good dogs: "
  newText += e.target.innerText.includes("OFF") ? "ON" : "OFF"
  e.target.innerText = newText

  fetchAllDogs()
  .then( dogs => {
    newText.includes("ON")
    ? renderAllDogsToBar( dogs.filter(d => d.isGoodDog) ) 
    : renderAllDogsToBar( dogs )
  })
}

const init = () => {
  fetchAllDogs().then( renderAllDogsToBar )

  const dogFilter = document.querySelector('#good-dog-filter')
  dogFilter.addEventListener('click', toggleFilter)
}

init()
