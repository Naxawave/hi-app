/*=============== SHOW MENU ===============*/
const headerToggle = document.getElementById('header-toggle'),
      main = document.getElementById('main'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(headerToggle){
    headerToggle.addEventListener('click', () =>{
        main.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        main.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const main = document.getElementById('main')
    // When we click on each nav__link, we remove the show-menu class
    main.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== HEADER MORE ===============*/
const moreWin = document.getElementById('moreSection');

document.getElementById('header-more').addEventListener('click', () => {
      moreWin.classList.add('show');
    });
    
document.getElementById('header_close').addEventListener('click', () => {
  moreWin.classList.remove('show');

});


/*=============== MIC ===============*/
let recognition;
let isListening = false;

if (window.hasOwnProperty('webkitSpeechRecognition')) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "es-ES";

  recognition.onresult = function(event) {
    document.getElementById('searchInput').value = event.results[0][0].transcript;
    toggleDictation();
  };

  recognition.onerror = function(event) {
    console.error("Speech recognition error: ", event.error);
    toggleDictation();
  };

  recognition.onend = function() {
    if (isListening) {
      recognition.start();
    }
  };
} else {
  alert("Tu navegador no soporta reconocimiento de voz.");
}

function toggleDictation() {
  const micButton = document.getElementById('micButton');
  if (isListening) {
    recognition.stop();
    micButton.classList.remove('ri-mic-fill');
    micButton.classList.add('ri-mic-line');
    isListening = false;
  } else {
    try {
      recognition.start();
      micButton.classList.remove('ri-mic-line');
      micButton.classList.add('ri-mic-fill');
      isListening = true;
    } catch (error) {
      console.error("Error starting speech recognition: ", error);
    }
  }
}

/*=============== UPDATE POINT ===============*/

document.addEventListener("DOMContentLoaded", function() {
  fetch('https://naxawave.github.io/updateSystem-v1/updateWarnHi_.json')
    .then(response => response.json())
    .then(data => {
      const updateCard = document.getElementById('updateCard');
      const headerToggle = document.getElementById('header-more');

      if (data.updateAvailable) {
        document.getElementById('updateImg').src = data.updateImage;
        document.getElementById('updateTitle').innerText = data.updateTitle;
        document.getElementById('updateDescription').innerText = data.updateDescription;
        document.getElementById('releaseDate').innerText = data.updateDate;
        document.getElementById('updateInfo').innerText = data.updateVersion;

        document.getElementById('downloadButton').onclick = () => {
          window.location.href = data.updateUrl;
        };
        updateCard.style.display = 'block';


        headerToggle.innerHTML += '<div class="notification_circle"></div>';
      } else {
        updateCard.style.display = 'none';
      }
    })
    .catch(error => {
      console.error('Error fetching the update data:', error);
    });
});