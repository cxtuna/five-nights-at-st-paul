// ============================
// DEFINE VARIABLES
// ============================
const officeImage = document.getElementById("office"); // get officeImage from html sheet 
const camButton = document.getElementById("camButton"); // get camera button from html sheet
const map = document.getElementById("map"); // get map image from html document
let currentCam = 1; // define variable to track the camera you're watching 
let camOpen = false; // define the variable that tracks if cameras are on or off 
let imagePos = 0; // define image position

// ----------------------------
// SFX
// ----------------------------
// define sounds as variables (use external link cuz trinket doesnt let u upload sounds)
const jumpscareSFX = new Audio("sounds/jumpscare.mp3");
jumpscareSFX.volume = 1;
const ambienceSFX = new Audio("sounds/ambience.wav");
ambienceSFX.volume = 1;

// loop ambience with minimal clicking noise
ambienceSFX.addEventListener("timeupdate", function() {
    const buffer = 0.15; // cuts out the empty space in the audio
    if (this.currentTime > this.duration - buffer) { // check if the audio duration minus the buffer time has passed
        this.currentTime = 0; // set passed time back to 0 (restart)
        this.play().catch(e => console.log(e)); // play again and send error to console if error
    }
});

function playSFX(audioObject) { // function to play sound effects
  audioObject.currentTime = 0; // set time passed of sound to 0

  if (audioObject === jumpscareSFX) {
    stopSFX(ambienceSFX);
  }
  
  audioObject.play().catch(error => { // play the sound, and send error message (the one below) if an error occurs
    console.log("click on the site for sound to work", error); // print to console (like in python ig)
  });
}

function stopSFX(audioObject) { // function to stop sound effects
  audioObject.pause(); // pause sound effect
  audioObject.currentTime = 0; // set passed time of sfx to 0 seconbds
}

// ============================
// CAMERAS
// ============================
camButton.addEventListener("click", () => { // click event listener on the camera button image 
  cameras(); // open or close cameras depending if they're already open 
});

function cameras(text = "") {
  // if the function tells to open cameras 
  if (text == "open") {
    changeImage(currentCam); // set background image to camera image 
    camOpen = true; //set cameras as on 

  // if the function tells to close the cameras 
  } else if (text == "office") {
    changeImage("office"); // set background image to office 
    camOpen = false; //set cameras as off 

  // toggle camera (if on, turns off. if off, turns on)
  } else { 
    // if cameras are on 
    if (camOpen === true) { // check if cameras are on 
      changeImage("office"); // set background image to office 
      camOpen = false; // set cameras as off 

      playSFX(jumpscareSFX);

    // if cameras are off 
    } else {
      changeImage(currentCam); // set background image to camera image 
      camOpen = true; // set cameras as on 
    }
  }

  if (camOpen === true) {
    map.style.opacity = 1;
  } else {
    map.style.opacity = 0;
  }
}

function changeImage(image = "officeClosed") { // function to change background image 
  if (image === "officeClosed") { // check if the function wants office image 
    officeImage.src = "images/officeClosed.jpeg"; // change background to office image 
  }
  
  if (image === "officeOpen") {
    officeImage.src = "images/officeOpen.jpeg";
  }

  // check if the function wants camera image 
  else if (currentCam > 0) { 
    if (currentCam === 1) {
      officeImage.src = "images/cam1.png"; // camera 1
    } else if (currentCam === 2) {
      officeImage.src = "images/cam2.png"; // camera 2
    } else if (currentCam === 3 ) {
      officeImage.src = "images/cam3.png"; // camera 3
    } else if (currentCam === 4) {
      officeImage.src = "images/cam4.png"; // camera 4
    } else if (currentCam === 5) {
      officeImage.src = "images/cam5.png"; // camera 5
    }
    
  } else {
    console.log("image not found");
  }
}

// ============================
// INPUT DETECTION
// ============================
// ----------------------------
// key detection
// ----------------------------
// define the list that keeps track of pressed and released keys
const keys = {};

// store pressed keys in list
window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});

// store released keys in list
window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

// ----------------------------
// cursor movement detection
// ----------------------------
let cursorX = 0; // define cursor X axis position 

document.addEventListener('mousemove', function(event) {
  cursorX = event.clientX; // set cursorX to X axis position of the mouse cursor 
});

// ============================
// ANIMATION LOOP
// ============================
// animation and eventListeners tyep shi
function animation() { // define function 
  // if (keys.a) { check if key A is pressed  
  imagePos = (cursorX - 275) * -0.1; // update image X axis position to 0.1x of the cursor position 
  updatePosition();

  // keep loop running
  requestAnimationFrame(animation);
}

function updatePosition() {
  officeImage.style.left = imagePos + "px"; // update X axis position of image 
}

// start animation and ambience loop
animation();
// note: sounds cant play if user hasnt interracted with the page, thats what all this is gor
document.addEventListener("click", () => {
  // check if it's already playing so it doesn't restart on every click
  if (ambienceSFX.paused) {
    playSFX(ambienceSFX); // start ambience sfx loop
  }
}, { once: true }); // stop click detection once user clicks (one time detection)
