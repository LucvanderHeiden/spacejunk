const bodyElement = document.querySelector("body");
const debrisContainer1 = document.getElementById("debris-container");
const debrisContainer2 = document.getElementById("debris-container2");
const hud = document.getElementById("hud");
let health = 100; // Initial health percentage
const deathScreen = document.getElementById("death-screen");
const deathButton = document.getElementById("death-button");
const explosionSound = new Audio("audio/explosion.wav");
explosionSound.volume = 0.3; // Set the volume to 50%
// const h1 = document.querySelector("h1");
const ost = new Audio("audio/maxrichter_return2.mp3");

const btnOne = document.getElementById("btnOne");
const btnTwo = document.getElementById("btnTwo");
const btnThree = document.getElementById("btnThree");
const optionOne = document.getElementById("optionOne");
const optionTwo = document.getElementById("optionTwo");
const optionThree = document.getElementById("optionThree");

const debrisImages = [
  "images/debris1.png",
  "images/debris2.png",
  "images/debris3.png",
  "images/debris4.png",
  "images/debris5.png",
  "images/owship.png",
];

document.body.onkeyup = function (e) {
  if (e.key == " " || e.code == "KeyE" || e.keyCode == 32) {
    ost.play();
  }
};

function getRandomImage() {
  // 55% chance of selecting a "rock" image
  if (Math.random() < 0.55) {
    return "images/rock.webp";
  } else {
    // 45% chance of selecting any image, including "rock"
    return debrisImages[Math.floor(Math.random() * debrisImages.length)];
  }
}

function createDebris(container) {
  const debrisElement = document.createElement("img");
  debrisElement.src = getRandomImage();
  debrisElement.alt = "Space Debris";
  debrisElement.className = "debris";
  debrisElement.style.width = Math.floor(Math.random() * 4) + "em";

  // Set different starting positions, rotations, and layers for each debris
  debrisElement.style.left = Math.random() * 100 + "%";
  debrisElement.style.top = Math.random() * 100 + "%";
  debrisElement.style.transform = `rotate(${Math.random() * 360}deg)`;
  debrisElement.style.zIndex = Math.floor(Math.random() * 3) + 1; // Number of layers

  container.appendChild(debrisElement);

  // Ensure that the animation starts only after the element is added to the DOM
  setTimeout(() => {
    debrisElement.style.animation = `debrisAnimation 20s linear`;
    debrisElement.addEventListener("animationend", () =>
      debrisElement.remove()
    );
  }, 0);
}

setInterval(() => createDebris(debrisContainer1), 100); // Interval for the first debris field
setInterval(() => createDebris(debrisContainer2), 100); // Interval for the second debris field

function displayHud() {
  hud.classList.remove("hidden");
}

debrisContainer1.addEventListener("mouseover", function (event) {
  handleDebrisInteraction(event, debrisContainer1);
});

debrisContainer2.addEventListener("mouseover", function (event) {
  handleDebrisInteraction(event, debrisContainer2);
});

function handleDebrisInteraction(event, container) {
  if (health > 0) {
    if (event.target.classList.contains("debris")) {
      displayHud();

      // Change the image source to the explosion image
      event.target.src = "images/explosion.png";

      // Play the explosion sound
      explosionSound.play();

      // Reduce health by 5%
      health -= 5;

      // Update the width of the health bar
      updateHealthBar();

      // Set a timeout to revert to the original image after 1 second
      setTimeout(() => {
        event.target.remove();
      }, 1000);

      // Check if health is below a certain threshold and add a class to the HUD
      if (health <= 25) {
        hud.classList.add("low-health");
      }
    }
  }
}

function updateHealthBar() {
  // Clamp health between 0 and 100
  health = Math.max(0, Math.min(100, health));

  // Update the width of the health bar
  const healthBar = document.querySelector(".health");
  healthBar.style.width = health + "%";

  // Check if health is 0 and take appropriate actions (e.g., end the game)
  if (health <= 0) {
    // Do something when health reaches 0
    console.log("Game Over!");
    deathScreen.style.display = "block";
    bodyElement.style.overflowY = "hidden";
  }
}

function reloadPage() {
  window.scrollTo(0, 0);
  location.reload();
}

deathButton.addEventListener("click", reloadPage);

// Option buttons
function pressBtnOne() {
  btnOne.classList.add("btn_active");
  btnTwo.classList.remove("btn_active");
  btnThree.classList.remove("btn_active");

  optionOne.classList.remove("invis");
  optionTwo.classList.add("invis");
  optionThree.classList.add("invis");
}

function pressBtnTwo() {
  btnOne.classList.remove("btn_active");
  btnTwo.classList.add("btn_active");
  btnThree.classList.remove("btn_active");

  optionOne.classList.add("invis");
  optionTwo.classList.remove("invis");
  optionThree.classList.add("invis");
}

function pressBtnThree() {
  btnOne.classList.remove("btn_active");
  btnTwo.classList.remove("btn_active");
  btnThree.classList.add("btn_active");

  optionOne.classList.add("invis");
  optionTwo.classList.add("invis");
  optionThree.classList.remove("invis");
}

btnOne.addEventListener("click", pressBtnOne);
btnTwo.addEventListener("click", pressBtnTwo);
btnThree.addEventListener("click", pressBtnThree);

// Reveal animations
// const rocket = document.querySelector(".rocket-reveal");
function textboxReveal() {
  setTimeout(() => {
    var textReveal = document.querySelectorAll(".text-reveal");
    for (var i = 0; i < textReveal.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = textReveal[i].getBoundingClientRect().top;
      var elementVisible = 500;
      if (elementTop < windowHeight - elementVisible) {
        textReveal[i].classList.remove("text-reveal");
      }
    }
  }, "1000");
}

function rocketReveal() {
  var rocket = document.querySelectorAll(".rocket-reveal");
  for (var i = 0; i < rocket.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = rocket[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      rocket[i].classList.remove("rocket-reveal");
    }
  }
}

window.addEventListener("scroll", () => {
  textboxReveal();
  rocketReveal();
});

// To check the scroll position on page load
textboxReveal;
rocketReveal();

// Info buttons
const satelliteBtn = document.getElementById("satellite-btn");
const metalBtn = document.getElementById("metal-btn");
const boosterBtn = document.getElementById("booster-btn");
const gloveBtn = document.getElementById("glove-btn");

const satelliteInfo = document.getElementById("satellite-info");
const metalInfo = document.getElementById("metal-info");
const boosterInfo = document.getElementById("booster-info");
const gloveInfo = document.getElementById("glove-info");

function displaySatelliteInfo() {
  satelliteInfo.classList.remove("info-box-hidden");
  satelliteInfo.classList.add("info-box-anim");
  metalInfo.classList.add("info-box-hidden");
  metalInfo.classList.remove("info-box-anim");
  boosterInfo.classList.add("info-box-hidden");
  boosterInfo.classList.remove("info-box-anim");
  gloveInfo.classList.add("info-box-hidden");
  gloveInfo.classList.remove("info-box-anim");
}

function displayMetalInfo() {
  satelliteInfo.classList.add("info-box-hidden");
  satelliteInfo.classList.remove("info-box-anim");
  metalInfo.classList.remove("info-box-hidden");
  metalInfo.classList.add("info-box-anim");
  boosterInfo.classList.add("info-box-hidden");
  boosterInfo.classList.remove("info-box-anim");
  gloveInfo.classList.add("info-box-hidden");
  gloveInfo.classList.remove("info-box-anim");
}

function displayBoosterInfo() {
  satelliteInfo.classList.add("info-box-hidden");
  satelliteInfo.classList.remove("info-box-anim");
  metalInfo.classList.add("info-box-hidden");
  metalInfo.classList.remove("info-box-anim");
  boosterInfo.classList.remove("info-box-hidden");
  boosterInfo.classList.add("info-box-anim");
  gloveInfo.classList.add("info-box-hidden");
  gloveInfo.classList.remove("info-box-anim");
}

function displayGloveInfo() {
  satelliteInfo.classList.add("info-box-hidden");
  satelliteInfo.classList.remove("info-box-anim");
  metalInfo.classList.add("info-box-hidden");
  metalInfo.classList.remove("info-box-anim");
  boosterInfo.classList.add("info-box-hidden");
  boosterInfo.classList.remove("info-box-anim");
  gloveInfo.classList.remove("info-box-hidden");
  gloveInfo.classList.add("info-box-anim");
}

satelliteBtn.addEventListener("click", displaySatelliteInfo);
metalBtn.addEventListener("click", displayMetalInfo);
boosterBtn.addEventListener("click", displayBoosterInfo);
gloveBtn.addEventListener("click", displayGloveInfo);

// DRAGGABLE STUFF
// const container = document.querySelector(".drag-section");

// function onMouseDrag({ movementX, movementY}) {
//   let getContainerStyle = window.getComputedStyle(container);
//   let leftValue = parseInt(getContainerStyle.left);
//   let topValue = parseInt(getContainerStyle.top);
//   container.style.left = '{leftValue + movementX}px';
//   container.style.left = `{topValue + movementY}px`;
// }
// container.addEventListener("mousedown", () => {
//   console.log("mousedown");
//   container.addEventListener("mousemove", onMouseDrag);
// });

// document.addEventListener("mosueup", () => {
//   console.log("mouseup");
//   container.removeEventListener("mousemove", onMouseDrag);
// })

const drag = document.querySelector(".draggable");
let offsetX, offsetY;

const move = (e) => {
  drag.style.left = `${e.clientX - offsetX }px`;
  drag.style.top = `${e.clientY - offsetY }px`;
}

drag.addEventListener("mousedown", (e) => {
  offsetX = e.clientX - drag.offsetLeft;
  offsetY = e.clientY - drag.offsetTop;
  document.addEventListener("mousemove", move);
});

document.addEventListener("mouseup", () => {
  document.removeEventListener("mousemove", move)
});