
document.addEventListener("DOMContentLoaded", () => {
    fetchDoggos("http://localhost:3000/pups");
    createDogInfoCard();
})

function fetchDoggos(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => showDoggosBar(data));
}

function showDoggosBar(data) {
    const dogsBar = document.querySelector("div#dog-bar")
    data.forEach(function(dogObj) {
        dogSpan = document.createElement("span");        
        dogNameNode = document.createTextNode(`${dogObj.name}`);
        dogSpan.appendChild(dogNameNode);
        dogsBar.appendChild(dogSpan);
        dogSpan.addEventListener("click", () => {
            fetchDoggo(`http://localhost:3000/pups/${dogObj.id}`);
        })
    })
}

function fetchDoggo(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => showOneDoggo(data));
}


function createDogInfoCard() {
    const dogDiv = document.querySelector("div#dog-info");
    
    const dogImg = document.createElement("img");
    dogDiv.appendChild(dogImg);
    
    const dogH2 = document.createElement("h2");
    dogDiv.appendChild(dogH2);
    
    const dogBtn = document.createElement("button");    
    dogDiv.appendChild(dogBtn);
    dogBtn.style.display = "none";
}  

function showOneDoggo(dogObj) {
    const dogImg = document.querySelector("div#dog-info img")
    dogImg.src = dogObj.image;
    
    const dogH2 = document.querySelector("div#dog-info h2")
    dogH2.innerText = dogObj.name
    
    const dogBtn = document.querySelector("div#dog-info button")
    if (dogObj.isGoodDog === true) {
        dogBtn.innerText = "Bad Dog!" 
    } else {
        dogBtn.innerText = "Good Dog!" 
    }
    dogBtn.style.display = "block";    
    dogBtn.addEventListener("click", () => {toggleIsGoodDog(dogObj)});
}

function toggleIsGoodDog(dogObj) {
    
    const isGoodDogData = {
        isGoodDog: !(dogObj.isGoodDog)
    }
    let configObj = {
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(isGoodDogData)
    };
    fetch(`http://localhost:3000/pups/${dogObj.id}`, configObj)
    .then(response => response.json())
    .then(data => updateisGoodDogBtn(data));
}

function updateisGoodDogBtn(dogObj) {
    
    const dogBtn = document.querySelector("div#dog-info button")
    if (dogObj.isGoodDog === true) {
        dogBtn.innerText = "Bad Dog!" 
    } else {
        dogBtn.innerText = "Good Dog!" 
    }
}





// When a user clicks the Good Dog/Bad Dog button, two things should happen:
// The button's text should change from Good to Bad or Bad to Good
// The corresponding pup object in the database should be updated to reflect the new isGoodDog value
// Please note, you can update a dog by making a PATCH request to /pups/:id