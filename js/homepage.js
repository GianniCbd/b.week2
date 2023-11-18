const apiKey = "a5517754abmsheebe0b22e59947fp18c555jsn03bc96d636c4";
const apiHost = "deezerdevs-deezer.p.rapidapi.com";
let currentIndex = Math.floor(Math.random() * 100) * 100;
const maxElement = 10;

const fetchData = async (index) => {
  try {
    const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=album:${index}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": apiHost,
      },
    });
    const data = await response.json();
    return data.data[0];
  } catch (error) {
    console.error("Error:", error);
  }
};

const updateAlbum = async (index) => {
  const albumData = await fetchData(index);

  document.querySelector(".albumImage").src = albumData.album.cover;
  document.querySelector(".card-title").innerHTML = albumData.title;
  document.querySelector(".card-text").innerHTML = albumData.artist.name;
};

updateAlbum(currentIndex);

const artistAlbum = document.getElementById("artistAlbum");
const URL = "https://deezerdevs-deezer.p.rapidapi.com/artist/";

const artistId = ["4999707", "6550", "169850", "5866223"];

artistId.forEach((id) => {
  const newURL = URL + id;
  fetch(newURL, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e32af77647mshc0813668c60e362p1797cajsn98f9343fa805",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((artistObj) => {
      const divParent = document.createElement("div");
      divParent.className = "col-12 col-sm-6 col-md-6 col-lg-3";

      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      cardDiv.classList.add("bg-dark");
      cardDiv.addEventListener("click", function () {
        window.location.href = `./artist.html?id=${id}`;
      });
      const artistImg = document.createElement("img");
      artistImg.classList.add("card-img-top");
      const artistUrlImage = artistObj.picture;

      artistImg.src = artistUrlImage;

      const cardBodyDiv = document.createElement("div");
      cardBodyDiv.classList.add("card-body");

      const nameArtist = document.createElement("a");
      nameArtist.classList.add("text-white");
      nameArtist.classList.add("card-title");
      nameArtist.innerText = artistObj.name;
      nameArtist.href = `./artist.html?id=${id}`;

      const type = document.createElement("p");
      type.classList.add("card-text");
      type.classList.add("text-secondary");
      type.innerText = artistObj.type;

      cardBodyDiv.appendChild(nameArtist);
      cardBodyDiv.appendChild(type);

      cardDiv.appendChild(artistImg);
      cardDiv.appendChild(cardBodyDiv);
      divParent.appendChild(cardDiv);
      artistAlbum.appendChild(divParent);
    });
});

// search

function tryToSearch() {
  const input = document.getElementById("search");

  input.style.display = input.style.display === "none" || input.style.display === "" ? "block" : "none";
}

// showalert  new Playlist

function showAlert() {
  const isUserRegistered = false;

  if (!isUserRegistered) {
    alert("Registrati prima di creare una playlist");
  } else {
    console.log("Playlist creata!");
  }
}

// subscribe

document.addEventListener("DOMContentLoaded", function () {
  const eventOnce = sessionStorage.getItem("eventShown");

  if (!eventOnce) {
    setTimeout(function () {
      showSubscribeCard();
      sessionStorage.setItem("eventShown", "true");
    }, 1000);
  }
});

function showSubscribeCard() {
  const subscribeCard = document.getElementById("subscribeCard");
  subscribeCard.classList.add("show");
}

function subscribe() {}

function cancelSubscription() {
  const subscribeCard = document.getElementById("subscribeCard");
  subscribeCard.classList.remove("show");
}
