const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const mainArtist = document.getElementsByClassName("mainArtist")[0];
console.log(mainArtist);

const tableSongs = document.getElementsByClassName("table-songs")[0];

const URL = "https://deezerdevs-deezer.p.rapidapi.com/artist/" + id;

const visualizzaAltro = document.getElementById("visualizzaAltro");
visualizzaAltro.href = `./artistTop50.html?id=${id}`;

fetch(URL, {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "340f0fd2c3mshd061c26435823fbp17f559jsnc5395de2b6ca",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
  }
})
  .then((resp) => {
    return resp.json();
  })
  .then((artistiObj) => {
    console.log("artista", artistiObj);

    const listSongs = document.getElementById("listSongs");
    listSongs.classList.add("justify-content-evenly");

    const imageArtist = document.createElement("img");
    imageArtist.classList.add("card-img-top");
    imageArtist.id = "imageArtist";
    imageArtist.src = artistiObj.picture_medium;

    const numberFan = document.createElement("p");
    numberFan.innerText = artistiObj.nb_fan.toLocaleString() + " ascoltatori mensili";

    const verified = document.createElement("div");
    verified.id = "verified";
    verified.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
  </svg>`;

    const verifiedLabel = document.createElement("p");
    verifiedLabel.id = "verifiedLabel";
    verifiedLabel.innerText = "Artista verificato";

    const nameArtist = document.createElement("h2");
    nameArtist.innerText = artistiObj.name;

    mainArtist.appendChild(verified);
    mainArtist.appendChild(verifiedLabel);
    mainArtist.appendChild(imageArtist);
    mainArtist.appendChild(nameArtist);
    mainArtist.appendChild(numberFan);

    const songsLike = document.createElement("div");
    songsLike.className = "likes";
    const h2 = document.createElement("h2");
    h2.classList.add("mt-5");
    h2.classList.add("mx-3");
    h2.innerText = "Brani che ti piacciono";

    songsLike.appendChild(h2);

    const divLike = document.createElement("div");
    divLike.classList.add("d-flex");
    divLike.id = "likeSection";

    const imgArtist = document.createElement("img");
    imgArtist.classList.add("rounded-circle");
    imgArtist.src = artistiObj.picture_small;

    const randomNumber = Math.floor(Math.random() * 10);

    let brano = "";

    if (randomNumber.toString() === "1") {
      brano = " brano";
    } else {
      brano = " brani";
    }

    const nameArtistP = "Di " + artistiObj.name;

    const pLike = document.createElement("p");
    pLike.classList.add("mx-3");
    pLike.classList.add("my-1");
    pLike.innerText = "Hai messo Mi piace a " + randomNumber.toString() + brano + "\n" + nameArtistP;

    divLike.appendChild(imgArtist);
    divLike.appendChild(pLike);

    songsLike.appendChild(divLike);

    listSongs.appendChild(songsLike);
  });

const URLSongs = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + id + "/top?limit=5";

let currentAudio;
const volumeRange = document.querySelector(".volume-range");

volumeRange.addEventListener("input", function () {
  currentAudio.volume = volumeRange.value / 100;
});

fetch(URLSongs, {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "340f0fd2c3mshd061c26435823fbp17f559jsnc5395de2b6ca",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
  }
})
  .then((resp) => {
    return resp.json();
  })
  .then((objSongs) => {
    console.log("Songs", objSongs.data);
    const top5Songs = objSongs.data;

    const tableSongs = document.getElementsByClassName("table-songs")[0];
    tableSongs.classList.add("align-middle");

    const tbody = document.createElement("tbody");

    top5Songs.forEach((song, index) => {
      console.log(song);

      const trSong = document.createElement("tr");
      trSong.classList.add("nameList");

      trSong.addEventListener("click", playSong);

      // tdButton.appendChild(buttonSongPlay);

      const tdSong4 = document.createElement("td");
      tdSong4.innerText = index + 1;

      const tdSong1 = document.createElement("td");
      const imageSong = document.createElement("img");
      imageSong.src = song.album.cover_small;
      tdSong1.appendChild(imageSong);

      const tdSong2 = document.createElement("td");
      tdSong2.innerText = song.title;

      const tdSong3 = document.createElement("td");
      let minutes = Math.floor(song.duration / 60);
      let seconds = song.duration % 60;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      const duration = minutes + ":" + seconds;

      console.log("duration", duration);

      tdSong3.innerText = duration;

      // trSong.appendChild(tdButton);
      trSong.appendChild(tdSong4);
      trSong.appendChild(tdSong1);
      trSong.appendChild(tdSong2);
      trSong.appendChild(tdSong3);

      tbody.appendChild(trSong);

      function playSong() {
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.remove();
        }
        const audio = document.createElement("audio");
        audio.controls = true;

        const sourceAudio = document.createElement("source");
        sourceAudio.src = "";
        sourceAudio.type = "audio/mpeg";

        audio.appendChild(sourceAudio);
        sourceAudio.src = song.preview;
        currentAudio = audio;

        currentAudio.volume = volumeRange.value / 100;

        const playButtonPreview = document.getElementsByClassName("bi-play-circle")[0].parentElement;
        const pauseButtonPreview = document.getElementsByClassName("bi-pause-circle")[0].parentElement;

        playButtonPreview.removeEventListener("click", play);
        pauseButtonPreview.removeEventListener("click", pause);

        playButtonPreview.addEventListener("click", play);
        pauseButtonPreview.addEventListener("click", pause);

        function play() {
          currentAudio.play();
          playButtonPreview.classList.add("d-none");
          pauseButtonPreview.classList.remove("d-none");
          pauseButtonPreview.classList.add("d-block");
        }

        function pause() {
          currentAudio.pause();
          playButtonPreview.classList.remove("d-none");
          pauseButtonPreview.classList.add("d-none");
        }

        const playerImageSong = document.getElementById("playerImageSong");

        playerImageSong.src = song.album.cover_small;

        const songsTitle = document.getElementsByClassName("songsTitle")[0];
        songsTitle.innerText = song.title;

        const songsArtist = document.getElementsByClassName("songsArtist")[0];
        songsArtist.innerText = song.artist.name;

        const songTimeAll = document.getElementById("songTimeAll");
        songTimeAll.innerText = duration;

        audio.play();
        playButtonPreview.classList.add("d-none");
        pauseButtonPreview.classList.remove("d-none");
        pauseButtonPreview.classList.add("d-block");

        document.body.appendChild(audio);
      }
    });

    tableSongs.appendChild(tbody);
  });

const buttonSectionArtist = document.getElementById("buttonSectionArtist");
buttonSectionArtist.classList.add("d-flex");
buttonSectionArtist.classList.add("align-items-center");

const playButton = document.createElement("button");
playButton.id = "playButton";
playButton.classList.add("btn");
playButton.classList.add("btn-success");
playButton.classList.add("rounded-circle");

playButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="18" fill="currentColor" class="bi bi-play-fill" viewBox="1 1 12 15">
<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
</svg>`;

const followingButton = document.createElement("button");
followingButton.classList.add("btn");
followingButton.classList.add("btn-outline-light");
followingButton.innerText = "FOLLOWING";

const dropdownButtonDiv = document.createElement("div");
dropdownButtonDiv.innerHTML = `<button
class="btn btn-black text-white btn-sm"
type="button"
data-bs-toggle="dropdown"
aria-expanded="false"
>
<i class="bi bi-three-dots"></i>
<ul class="dropdown-menu">
<li>Aggiungi ai preferiti</li></ul>
</button>`;

buttonSectionArtist.appendChild(playButton);
buttonSectionArtist.appendChild(followingButton);
buttonSectionArtist.appendChild(dropdownButtonDiv);
