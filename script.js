const debrisContainer = document.getElementById("debris-container");

const debrisImages = [
  "images/debris1.png",
  "images/debris2.png",
  "images/debris3.png",
  // Add more image sources as needed
];

function getRandomImage() {
  // 80% chance of selecting a "rock" image
  if (Math.random() < 0.95) {
    return "images/rock.webp";
  } else {
    // 20% chance of selecting any image, including "rock"
    return debrisImages[Math.floor(Math.random() * debrisImages.length)];
  }
}

function createDebris() {
  const debris = document.createElement("img");
  debris.src = getRandomImage();
  debris.alt = "Space Debris";
  debris.className = "debris";
  debris.style.width = Math.floor(Math.random() * 4) + "em";

  // Set different starting positions, rotations, and layers for each debris
  debris.style.left = Math.random() * 100 + "%";
  debris.style.top = Math.random() * 100 + "%";
  debris.style.transform = `rotate(${Math.random() * 360}deg)`;
  debris.style.zIndex = Math.floor(Math.random() * 3) + 1; // Adjust the number of layers as needed

  debrisContainer.appendChild(debris);

  // Ensure that the animation starts only after the element is added to the DOM
  setTimeout(() => {
    debris.style.animation = `debrisAnimation 20s linear`;
    debris.addEventListener("animationend", () => debris.remove()); // Remove debris after animation
  }, 0);
}

setInterval(createDebris, 100); // Adjust the interval based on your preference
