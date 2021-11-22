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
  car.src = `/images/cars/${artist.trainCar}`;
  return car;
}

function createCaboose() {
  let caboose = document.createElement('img');
  caboose.classList.add('car');
  caboose.src = "/images/caboose.png";
  return caboose;
}

async function load() {
  let artists = await fetchJson('/data/artists.json');
  let shuffledArtistNames = shuffle(Object.keys(artists));
  let train = document.getElementById('train');
  for (const artistName of shuffledArtistNames) {
    let car = createTrainCar(artistName, artists[artistName]);
    train.appendChild(car);
  }
  train.appendChild(createCaboose());
}
