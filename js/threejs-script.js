// THREE.JS ----------------------------------------------------

import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js";
import { GLTFLoader } from "https://threejs.org/examples/jsm/loaders/GLTFLoader.js";

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Create a WebGLRenderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load GLTF model
const loader = new GLTFLoader();
let gltfModel;

loader.load("../assets/scene.gltf", (gltf) => {
  gltfModel = gltf.scene;
  scene.add(gltfModel);
});

// Position the camera
camera.position.z = 5;

// Create an animation loop
const animate = function () {
  requestAnimationFrame(animate);

  // Rotate the model (optional)
  if (gltfModel) {
    gltfModel.rotation.x += 0.01;
    gltfModel.rotation.y += 0.01;
  }

  // Render the scene with the camera
  renderer.render(scene, camera);
};

// Start the animation loop
animate();
