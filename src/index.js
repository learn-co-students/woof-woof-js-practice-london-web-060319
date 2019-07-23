const fetchURL = "http://localhost:3000/pups";

document.addEventListener("DOMContentLoaded", () => {
  const dogBar = document.querySelector("#dog-bar");
  showDogBar();
});

const showDogBar = () => {
  return fetch(fetchURL)
    .then(data => data.json())
    .then(doggos => processDoggos(doggos));
};

const processDoggos = doggos => {
  doggos.forEach(dog => showDoggos(dog));
};

const fetchDog = e => {
  return fetch(fetchURL + `/${e.target.dataID}`)
    .then(data => data.json())
    .then(doggo => showDogInfo(doggo));
};

const updateDogStatus = e => {
  currentStatus = e.target.innerText;
  newStatus = new Object();
  newStatus.isGoodDog = currentStatus === "Good Dog!" ? false : true;

  patchObject = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newStatus)
  };

  return fetch(fetchURL + `/${e.target.dataID}`, patchObject)
    .then(data => data.json())
    .then(doggo => goodStatus(doggo));
};

const switchButtonText = {
  false: "Bad Dog!",
  true: "Good Dog!"
};

const goodStatus = doggo => {
  let button = document.querySelector(".dog-info-button");
  button.innerText = switchButtonText[doggo.isGoodDog];
};

const showDoggos = dog => {
  let dogBar = document.querySelector("#dog-bar");
  let span = document.createElement("span");
  span.innerHTML = dog.name;
  span.addEventListener("click", fetchDog);
  span.dataID = dog.id;
  dogBar.appendChild(span);
};

const showDogInfo = doggo => {
  let dogInfo = document.querySelector("#dog-info");
  dogInfo.innerHTML = "";

  // create dog image
  let dogImage = document.createElement("IMG");
  dogImage.src = doggo.image;

  // create dog name
  let dogName = document.createElement("h2");
  let nameText = document.createTextNode(doggo.name);
  dogName.appendChild(nameText);

  // create dog button
  let dogButton = document.createElement("button");
  let buttontext = doggo.isGoodDog ? "Good Dog!" : "Bad Dog!";
  dogButton.innerText = buttontext;
  dogButton.className = "dog-info-button";
  dogButton.dataID = doggo.id;
  dogButton.addEventListener("click", updateDogStatus);

  dogInfo.appendChild(dogImage);
  dogInfo.appendChild(dogName);
  dogInfo.appendChild(dogButton);
};
