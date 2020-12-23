var prev      = document.getElementById("prev");
var next      = document.getElementById("next");
var thumbnail = document.getElementsByClassName("thumbnail");
var bg        = document.getElementById("bg");
var logo      = document.getElementById("logo");
var title     = document.getElementById("text-logo");
var i         = 0;
var k         = 0;
var l         = 0;

const bgImages = [
    "img/animes/bleach.png",
    "img/animes/jujutsu.jpg",
    "img/animes/kuroko.jpg",
    "img/animes/naruto.png",
    "img/animes/one-piece.jpg",
];

const logoImages = [
    "img/logos/bleach-logo.gif",
    "img/logos/jujutsu-kaisen.png",
    "img/logos/kuroko.png",
    "img/logos/naruto.svg",
    "img/logos/one-piece.png"
];

const sizeLogos = {
    "0"         : [{"width": "80px", "height":"80px"}],
    "1"         : [{"width": "230px", "height":"130px"}],
    "2"         : [{"width": "100px", "height":"100px"}],
    "3"         : [{"width": "200px", "height":"100px"}],
    "4"         : [{"width": "174px", "height":"131px"}]
};

const activeAnime = {
    "0" : [
        "img/animes/bleach.png", "img/animes/bleach2.jpg", "img/animes/bleach3.jpg","img/animes/bleach4.jpg", 
        "img/animes/bleach5.jpg", "img/animes/bleach6.jpg", "img/animes/bleach7.jpg", "img/animes/bleach8.png"]
    // "1" : ["img/animes/bleach.png", "img/animes/bleach2.jpg", "img/animes/bleach3.jpg"],
    // "2" : ["img/animes/bleach.png", "img/animes/bleach2.jpg", "img/animes/bleach3.jpg"],
    // "3" : ["img/animes/bleach.png", "img/animes/bleach2.jpg", "img/animes/bleach3.jpg"],
    // "4" : ["img/animes/bleach.png", "img/animes/bleach2.jpg", "img/animes/bleach3.jpg"],
}

const nameAnimes = [
    "Bleach",
    "Jujutsu Kaisen",
    "Kuroko no Basket",
    "Naruto",
    "One Piece"
];


setInterval(() => {
    slideOverActiveAnime(l);
}, 4000);

//Generate a random integer between the 2 given parameters
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

//Function to switch images on the active thumbnail
function slideOverActiveAnime(i) {
    let max                  = activeAnime[i].length-1
    let index                = getRandomInt(0, max);
    thumbnail[i].src         = activeAnime[i][index]
    bg.style.backgroundImage = 'url(" ' + activeAnime[i][index] + ' ")';
}

//Adjust the size of the logo based in the given object
function adjustLogo(i) {
    logo.style.width  = sizeLogos[i][0]["width"];
    logo.style.height = sizeLogos[i][0]["height"];
}

//Check if it was come from a left or right arrow and then change the background
function changeBackground(next, index) {
    if (next) {
        if (index !== bgImages.length-1) {
            bg.style.backgroundImage = 'url(" ' + bgImages[i+1] + ' ")';
            thumbnail[i+1].classList.add("active");
            thumbnail[i].classList.remove("active");
            i++;
            logo.src = logoImages[i];
        } 
    } else {
        if (i !== 0) {
            bg.style.backgroundImage = 'url(" ' + bgImages[i-1] + ' ")';
            thumbnail[i-1].classList.add("active");
            thumbnail[i].classList.remove("active");
            i--;
            logo.src = logoImages[i];
        } 
    }

    l = i;
}

//Change the title to its anime name
function checkAnime(index) {
    if (index === 0 || index === 2 ) {
        title.innerHTML = nameAnimes[index];
    } else {
        title.innerHTML = "";
    }
}

// Change the background to the selected image
for (let j = 0; j < thumbnail.length; j++) {
    thumbnail[j].onclick = () => {
        bg.style.backgroundImage = 'url(" ' + bgImages[j] + ' ")';
        thumbnail[i].classList.remove("active");
        thumbnail[j].classList.add("active");
        i = j;
        l = i;
        logo.src = logoImages[j];
        
        checkAnime(i);
        adjustLogo(i);

        if ((j !== 0) && (j !== thumbnail.length-1)) {
            next.style.display = "block";
            prev.style.display = "block";
        } else {
            if (j === 0) {
                next.style.display = "block";
                prev.style.display = "none";
            } else {
                next.style.display = "none";
                prev.style.display = "block";
            }
        }
    }
}

next.onclick = () => {
    changeBackground(true, i);
    checkAnime(i);
    adjustLogo(i);
    
    if (i === bgImages.length-1) {
        next.style.display = "none";
    } else {
        next.style.display = "block";
    }

    prev.style.display = "block";
}

prev.onclick = () => {
    changeBackground(false, i);
    checkAnime(i);
    adjustLogo(i);

    if (i === 0) {
        prev.style.display = "none";
    } else {
        prev.style.display = "block";
    }

    next.style.display = "block";
}

//Ocurrs an error when i gets bigger than the bgimages.length-2
// setInterval(() => {
//     i > bgImages.length-2 ? i = -1: i = i;
//    changeBackground(true, i);
//    checkAnime(i);
//    adjustLogo(i);
// }, 2000);

