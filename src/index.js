const dogsURL = "http://localhost:3000/pups"
const dogBar = document.querySelector('#dog-bar')



const fetchAllDogs = () => {
  return fetch(dogsURL)
  .then(resp => resp.json())
}

const fetchSingleDog = dogId => {
  return fetch(dogsURL + `/${dogId}`)
  .then(resp => resp.json())
}

const renderAllDogsToBar = dogs => {
  dogBar.innerHTML= ""
  dogs.forEach(renderSingleDogToBar)
}

const renderSingleDogToBar = dog => {
  const dogSpan = document.createElement('span')
  dogSpan.innerText = dog.name
  dogSpan.addEventListener('click', () => showDogInfo(dog))
  dogBar.append(dogSpan)
}

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

const toggleGoodDog = (dogId, button) => {
  fetchSingleDog(dogId)
  .then(dog => {
    button.innerText = dog.isGoodDog ? "Bad Dog!" : "Good Dog!"

    fetch(dogsURL + `/${dogId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isGoodDog: !dog.isGoodDog })
    })
  })
}

const toggleFilter = e => {
  let newText = "Filter good dogs: "
  newText += e.target.innerText.includes("OFF") ? "ON" : "OFF"
  e.target.innerText = newText

  fetchAllDogs()
  .then(dogs => {
    newText.includes("ON")
    ? renderAllDogsToBar( dogs.filter(d => d.isGoodDog ))
    : renderAllDogsToBar( dogs )
  })
}

const init = () => {
  fetchAllDogs().then(renderAllDogsToBar)

  const dogFilter = document.querySelector('#good-dog-filter')
  dogFilter.addEventListener('click', toggleFilter)
}

init()
