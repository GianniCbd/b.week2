const playlist = document.querySelectorAll('[class*="playlist"]');

const coord = [
  12, 13, 14, 23, 24, 25, 26, 27, 28, 31, 35, 36, 37, 38, 40, 42, 43, 44, 45, 46, 47, 48, 50, 51, 52, 54, 55, 56, 58,
  59, 60, 62, 65, 66, 67, 68, 87,
];
const randomIndex = Math.floor(Math.random() * coord.length);
const randomCoord = coord[randomIndex];

fetch("https://deezerdevs-deezer.p.rapidapi.com/playlist/" + randomCoord, {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "340f0fd2c3mshd061c26435823fbp17f559jsnc5395de2b6ca",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
})
  .then((resp) => resp.json())
  .then((albumObj) => console.log(albumObj))
  .catch((err) => console.log("Errore: " + err));

playlist.forEach((pl) => {
  const match = pl.className.match(/playlist(\d+)/);
  if (match) {
    const number = parseInt(match[1], 10);
    pl.addEventListener("click", function () {
      window.location.href = `./album.html?id=${number}`;
    });
  }
});

const cards = document.querySelectorAll("#cardAlbum .card");
cards.forEach(card =>{  
  if (card.id.trim()!== "") {
    card.addEventListener("click", function () {
      window.location.href = `./artist.html?id=${card.id}`;
    })
  }
})