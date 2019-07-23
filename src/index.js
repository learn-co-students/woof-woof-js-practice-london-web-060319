window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    fetchDogs()
   
});

const dogDiv = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const baseURL = `http://localhost:3000/pups`



const fetchDogs = () => {
    fetch(baseURL)
    .then( resp => resp.json())
    .then (data=>showDogs(data))
}

const showDogs=(data)=>{
    data.forEach(function(dogObj){
        dogSpan = document.createElement("span");
        dogSpan.innerHTML = dogObj.name
        dogDiv.appendChild(dogSpan);
        dogSpan.addEventListener("click", () =>{
            fetchDogs(`http://localhost:3000/pups/${dogObj.id}`);
        })
        
    })
}


const fetchDog = (e) => {
    fetch(baseURL + `${e.target.dataID}`)
    .then(respone => response.json())
    .then(dogObj => showOneDog(dogObj)); 
}



function showOneDog(dogObj) {

    const newImage = document.createElement("img");
    newImage.src = dogObj.image;


    const newHeader = document.createElement("h2");
    const nameText = document.createTextNode(dogObj.name);
    newHeader.appendChild(nameText)

    const dogBtn = document.createElement("button");
    if (dogObj.isGoodDog === true) {
        dogBtn.innerText = "Bad Dog!"
    } else {
        dogBtn.innerText = "Good Dog"
    }
    dogBtn.style.display = "block";
    dogBtn.className = "dog-info-button";
    dogBtn.dataID = dogObj.id;
    dogBtn.addEventListener("click", updateDogStatus);
    

    dogInfo.appendChild(newImage);
    dogInfo.appendChild(newHeader);
    dogInfo.appendChild(dogBtn)

}

