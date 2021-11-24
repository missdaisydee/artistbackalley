/** Randomly shuffles an array. */
function shuffle(array) {
  // Create a copy so that we don't accidentally mutate something we shouldn't.
  array = Array.from(array);
  for (let i = 0; i < array.length; ++i) {
    let j = Math.floor(Math.random() * (array.length - i)) + i;
    if (j === i) continue;
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
}

async function fetchJson(path, init = undefined) {
  let response = await fetch(path, init);
  if (!response.ok) throw new Error(`Failed to fetch ${path}: ${response.status}`);
  return response.json();
}

function createTrainCar(artistName, artist) {
  let car = document.createElement('img');
  car.id = artistName;
  car.classList.add('car');
  car.src = `./images/cars/${artist.trainCar}`;
  car.addEventListener('click', () => {
    let dialog = document.getElementById('artist-card-dialog');
    dialog.querySelector('[name="name"]').textContent = artistName;
    dialog.querySelector('[name="bio"]').textContent = artist.bio;
    dialog.querySelector('[name="logo"]').src = `./images/logos/${artist.logo}`;
    dialog.querySelector('[name="home"]').href = artist.site;
    dialog.querySelector('[name="shop"]').href = artist.shop;
    dialog.querySelector('[name="twitch"]').href = artist.twitch;
    dialog.querySelector('[name="instagram"]').href = artist.instagram;
    dialog.querySelector('[name="twitter"]').href = artist.twitter;
    dialog.show();
  });
  return car;
}

function createCaboose() {
  let caboose = document.createElement('img');
  caboose.classList.add('car');
  caboose.src = "./images/caboose.png";
  return caboose;
}

function inflateDialogs() {
  for (const dialog of document.querySelectorAll('.dialog')) {
    dialog.show = () => {
      dialog.classList.add('shown');
    };
    dialog.dismiss = () => {
      dialog.classList.remove('shown');
    };
    dialog.addEventListener('click', ev => {
      if (ev.target === dialog) {
        dialog.dismiss();
      }
    });
  }
}

function createIconLink(iconSrc, href) {
  let link = document.createElement('a');
  link.target = '_blank';
  link.href = href;

  let icon = document.createElement('img');
  icon.src = iconSrc;
  icon.width = 32;

  link.appendChild(icon);

  return link;
}

function createArtistCard(artistName, artist) {
  let artistCard = document.createElement('div');
  artistCard.classList.add('artist-card');

  let logo = document.createElement('img');
  logo.classList.add('logo');
  logo.src = `../images/logos/${artist.logo}`;
  artistCard.appendChild(logo);

  let name = document.createElement('h3');
  name.textContent = artistName;
  artistCard.appendChild(name);

  let bio = document.createElement('p');
  bio.textContent = artist.shortBio;
  artistCard.appendChild(bio);

  let nav = document.createElement('nav');

  nav.appendChild(createIconLink("../images/home.svg", artist.site));
  nav.appendChild(createIconLink("../images/shop.svg", artist.shop));
  nav.appendChild(createIconLink("../images/twitch.svg", artist.twitch));
  nav.appendChild(createIconLink("../images/twitter.svg", artist.twitter));
  nav.appendChild(createIconLink("../images/instagram.svg", artist.instagram));

  artistCard.appendChild(nav);

  return artistCard;
}

async function loadHome() {
  inflateDialogs();
  let artists = await fetchJson('./data/artists.json');
  let shuffledArtistNames = shuffle(Object.keys(artists));
  let train = document.getElementById('train');
  for (const artistName of shuffledArtistNames) {
    let car = createTrainCar(artistName, artists[artistName]);
    train.appendChild(car);
  }
  train.appendChild(createCaboose());
}

async function loadDirectory() {
  let artists = await fetchJson('../data/artists.json');
  let artistNames = Object.keys(artists);
  artistNames.sort((a, b) => a.localeCompare(b));
  let directory = document.getElementById('artist-directory');
  for (const artistName of artistNames) {
    let artistCard = createArtistCard(artistName, artists[artistName]);
    directory.appendChild(artistCard);
  }
}
