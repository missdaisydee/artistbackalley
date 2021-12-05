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

const SUNS = [
  'eyebrows.gif',
  'heart.gif',
  'smooch.gif',
  'tongue.gif',
  'wink.gif',
];

function makeTwitchUrl(handle) {
  if (!handle) return undefined;
  return `https://www.twitch.tv/${handle}`;
}
function makeTwitterUrl(handle) {
  if (!handle) return undefined;
  return `https://twitter.com/${handle}`;
}
function makeInstagramUrl(handle) {
  if (!handle) return undefined;
  return `https://www.instagram.com/${handle}/`;
}

async function fetchJson(path, init = undefined) {
  let response = await fetch(path, init);
  if (!response.ok) throw new Error(`Failed to fetch ${path}: ${response.status}`);
  return response.json();
}

function setHref(anchorEl, href) {
  if (href) {
    anchorEl.href = href;
  } else {
    anchorEl.removeAttribute('href');
  }
}

function createTrainCar(artistName, artist) {
  if (!artist.trainCar) return null;
  let car = document.createElement('img');
  car.classList.add('car');
  car.src = `/images/cars/${artist.trainCar}`;
  car.title = artistName;
  car.alt = artistName;
  car.addEventListener('click', () => {
    let dialog = document.getElementById('artist-card-dialog');
    dialog.querySelector('[name="name"]').textContent = artistName;
    dialog.querySelector('[name="bio"]').textContent = artist.bio;
    dialog.querySelector('[name="logo"]').src = `./images/logos/${artist.logo}`;
    setHref(dialog.querySelector('[name="home"]'), artist.siteUrl);
    setHref(dialog.querySelector('[name="shop"]'), artist.shopUrl);
    setHref(dialog.querySelector('[name="twitch"]'), makeTwitchUrl(artist.twitchHandle));
    setHref(dialog.querySelector('[name="twitter"]'), makeTwitterUrl(artist.twitterHandle));
    setHref(dialog.querySelector('[name="instagram"]'), makeInstagramUrl(artist.instagramHandle));
    window.requestAnimationFrame(() => {
      dialog.show();
    });
  });
  return car;
}

function createCaboose() {
  let caboose = document.createElement('img');
  caboose.classList.add('caboose');
  caboose.src = "/images/caboose.png";
  return caboose;
}

function inflateDialogs() {
  for (const dialog of document.querySelectorAll('.dialog')) {
    dialog.show = () => {
      dialog.classList.add('shown');
      document.body.classList.add('dialog-presented');
    };
    dialog.dismiss = () => {
      dialog.classList.remove('shown');
      document.body.classList.remove('dialog-presented');
    };
    dialog.addEventListener('click', ev => {
      if (ev.target === dialog) {
        dialog.dismiss();
      }
    });
  }
}

function createIconLink(iconClass, title, href) {
  let link = document.createElement('a');
  link.target = '_blank';
  if (href) {
    link.href = href;
  }

  let icon = document.createElement('div');
  icon.classList.add(iconClass);
  icon.title = title;
  link.appendChild(icon);

  return link;
}

function createArtistCard(artistName, artist) {
  let artistCard = document.createElement('div');
  artistCard.classList.add('artist-card');

  let logo = document.createElement('img');
  logo.classList.add('logo');
  logo.src = `/images/logos/${artist.logo}`;
  artistCard.appendChild(logo);

  let infoContainer = document.createElement('div');

  let name = document.createElement('h3');
  name.textContent = artistName;
  infoContainer.appendChild(name);

  let bio = document.createElement('p');
  bio.textContent = artist.shortBio;
  infoContainer.appendChild(bio);

  let nav = document.createElement('nav');

  nav.appendChild(createIconLink('home-icon', 'Homepage', artist.siteUrl));
  nav.appendChild(createIconLink('shop-icon', 'Shop', artist.shopUrl));
  nav.appendChild(createIconLink('twitch-icon', 'Twitch', makeTwitchUrl(artist.twitchHandle)));
  nav.appendChild(createIconLink('twitter-icon', 'Twitter', makeTwitterUrl(artist.twitterHandle)));
  nav.appendChild(createIconLink('instagram-icon', 'Instagram', makeInstagramUrl(artist.instagramHandle)));

  infoContainer.appendChild(nav);

  artistCard.appendChild(infoContainer);

  return artistCard;
}

function runAnimation(frame) {
  let lastTimestamp = undefined;
  return new Promise(resolve => {
    step();

    function step() {
      window.requestAnimationFrame(timestamp => {
        if (lastTimestamp != undefined) {
          if (frame((timestamp - lastTimestamp) / 1000)) {
            resolve();
            return;
          }
        }
        lastTimestamp = timestamp;
        step();
      });
    }
  });
}

async function animateTrain(train) {
  let offset = 0;
  let speed = 0;
  let maxSpeed = 400;  // px/s
  window.setTimeout(async () => {
    await runAnimation(elapsed => {
      if (document.querySelector('.dialog-presented')) return;
      offset += speed * elapsed;
      train.style.transform = `translateX(${-offset}px)`;
      if (offset >= train.offsetWidth) return true;
      let acc = 500;
      let hoveredCar = document.querySelector('.train .car:hover');
      if (hoveredCar) {
        let boundingRect = hoveredCar.getBoundingClientRect();
        let center = boundingRect.x + boundingRect.width / 2;
        let viewportCenter = window.visualViewport.width / 2;
        let targetSpeed = (center - viewportCenter) / 1;  // Center in 1 second.
        acc = Math.max(Math.min((targetSpeed - speed) * 10, 500), -500);
      }
      speed = Math.max(Math.min(speed + acc * elapsed, maxSpeed), -maxSpeed);
    });
    setTimeout(() => {
      train.animate([
        { transform: 'translateX(100vw)' },
        { transform: 'translateX(0)' }
      ], { duration: 2000, easing: 'ease-out' }).addEventListener('finish', () => {
        train.style.transform = 'translateX(0)';
        animateTrain(train);
      });
    }, 5000);
  }, 5000);
}

async function loadHome() {
  inflateDialogs();
  let sunSrc = SUNS[Math.floor(Math.random() * 20)];
  if (sunSrc) {
    document.querySelector('.sun').src = `/images/suns/${sunSrc}`;
  }
  let artists = await fetchJson('/data/artists.json');
  let shuffledArtistNames = shuffle(Object.keys(artists));
  let train = document.getElementById('train');
  for (const artistName of shuffledArtistNames) {
    let car = createTrainCar(artistName, artists[artistName]);
    if (car) {
      train.appendChild(car);
    }
  }
  train.appendChild(createCaboose());
  animateTrain(train);
}

async function loadDirectory() {
  let artists = await fetchJson('/data/artists.json');
  let artistNames = Object.keys(artists);
  artistNames.sort((a, b) => a.localeCompare(b));
  let directory = document.getElementById('artist-directory');
  for (const artistName of artistNames) {
    let artistCard = createArtistCard(artistName, artists[artistName]);
    directory.appendChild(artistCard);
  }
}
