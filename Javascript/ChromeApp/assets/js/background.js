const images = ["TM_G_teaser.jpeg", "TM_G_teaser2.jpeg", "TM_Rizz.jpeg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

// const bgImage = document.createElement('img');
// bgImage.src = `assets/img/${chosenImage}`;
// document.body.appendChild(bgImage);
document.body.style.background = `url("assets/img/${chosenImage}") no-repeat top/100%`