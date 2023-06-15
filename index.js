//----------------------------VARIABLES------------------------------------
//accessing all the elements that display time
const minuteElement = document.querySelector(".minute");
const secondElement = document.querySelector(".second");
const milliElement = document.querySelector(".milli");

//moving is the dot that rotates in circular motion
const moving = document.querySelector(".inner");

//----------------------------EVENT LISTENERS------------------------------------
//accessing controls
document.querySelector(".start").addEventListener("click", startFunction);
document.querySelector(".reset").addEventListener("click", resetFunction);
document.querySelector(".flag").addEventListener("click", flagFunction);

//Initialised watchInterval , running and currRotation to use them in diffrent functions
let watchInterval;
let currRotate = 0;
let running = false;

//----------------------------FUNCTIONS------------------------------------
//Main function  that starts and stops the watch
function startFunction() {
  //if watch is running then it stops it by clearing Interval
  if (running) {
    window.clearInterval(watchInterval);
    document.querySelector(".start").textContent = "Start";
    running = false;
    return;
  }

  //if watch is not running then it starts a Interval that constantly updates stopwatch time and rotation of dot
  document.querySelector(".start").textContent = "Pause";
  running = true;
  watchInterval = setInterval(function () {
    let milli = parseInt(milliElement.textContent);
    let second = parseInt(secondElement.textContent);
    let minute = parseInt(minuteElement.textContent);

    //Updating milli, second, and minute
    milli += 5;

    if (milli > 99) {
      second++;
      milli = 0;
    }

    if (second > 59) {
      minute++;
      second = 0;
    }

    //Displaying the milli, sec and minute
    if (milli < 10) {
      milliElement.textContent = "0" + milli;
    } else {
      milliElement.textContent = milli;
    }

    if (second < 10) {
      secondElement.textContent = "0" + second;
    } else {
      secondElement.textContent = second;
    }

    if (minute < 10) {
      minuteElement.textContent = "0" + minute;
    } else {
      minuteElement.textContent = minute;
    }

    //rotating dot animation
    currRotate = currRotate % 360;
    currRotate += 0.3;
    moving.style.transform = `rotate(${currRotate}deg)`;
  }, 43);
}

//This function basically resets all the values
function resetFunction() {
  //clearing the Interval
  window.clearInterval(watchInterval);
  running = false;

  //Clearing the Time Stamps
  document.querySelector(".time-stamps-container").innerHTML = "";
  index = 1;

  //Resetting the watch and text of start/pause button
  document.querySelector(".start").textContent = "Start";
  minuteElement.textContent = "00";
  secondElement.textContent = "00";
  milliElement.textContent = "00";

  //resetting current rotation to 0degrees added these styles so it transitions from current place to 0degrees
  currRotate = 0;
  moving.style.transition = "all 0.7s";
  moving.style.transform = `rotate(0deg)`;

  //added a class namely rotate to the reset button
  document.querySelector(".reset i").classList.add("rotate");

  //and removing the rotate class and transitions after 1second
  setTimeout(() => {
    moving.style.transition = "none";
    document.querySelector(".reset i").classList.remove("rotate");
  }, 1000);
}

//index is the index of time-stamp cards
var index = 1;

//flag function adds a card to the time stamp container with current time
function flagFunction() {
  //to ensure it only runs when watch is ticking
  if (running) {
    //fetching container
    let container = document.querySelector(".time-stamps-container");

    //current time on stopwatch
    let time =
      minuteElement.textContent +
      ":" +
      secondElement.textContent +
      "." +
      milliElement.textContent;

    //adding a card with current time with index in container at start
    container.insertAdjacentHTML(
      "afterbegin",
      `<div class='time-stamp-card'> <span>${index++}.</span> ${time} </div>`
    );
  }
}


//fullScreen Mode
var fullScreenbtn = document.querySelector(".fullscreen");
fullScreenbtn.addEventListener("click", fullscreen);
let fullscrn = false;

function fullscreen() {
  if (!fullscrn) {
    fullScreenbtn.style.transform = "rotate(180deg)";
    fullScreenbtn.innerHTML = `<i class="fa-solid fa-compress"></i>`;
    enterFullScreen();
    fullscrn = true;
  } 
  else {
    fullScreenbtn.style.transform = "rotate(0deg)";
    fullScreenbtn.innerHTML = `<i class="fa-solid fa-expand"></i>`;
    exitFullScreen();
    fullscrn = false;
  }
}

function enterFullScreen() {
  let elem = document.documentElement;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}
