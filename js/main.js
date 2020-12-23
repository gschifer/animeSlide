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
    "img/animes/bleach/bleach.png",
    "img/animes/jujutsu/jujutsu.jpg",
    "img/animes/kuroko/kuroko.jpg",
    "img/animes/naruto/naruto.png" ,
    "img/animes/one-piece/one-piece.jpg"
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
    "0" : ["img/animes/bleach/bleach.png", "img/animes/bleach/bleach2.jpg", "img/animes/bleach/bleach3.jpg","img/animes/bleach/bleach4.jpg", 
        "img/animes/bleach/bleach5.jpg", "img/animes/bleach/bleach6.jpg", "img/animes/bleach/bleach7.jpg", "img/animes/bleach/bleach8.png"],

    "1" : ["img/animes/jujutsu/jujutsu.jpg", "img/animes/jujutsu/jujutsu2.jpg", "img/animes/jujutsu/jujutsu3.jpg",
     "img/animes/jujutsu/jujutsu4.jpg", "img/animes/jujutsu/jujutsu5.jpg", "img/animes/jujutsu/jujutsu6.jpg", "img/animes/jujutsu/jujutsu7.png"],

    "2" : ["img/animes/kuroko/kuroko.jpg", "img/animes/kuroko/kuroko2.jpg", "img/animes/kuroko/kuroko3.png", "img/animes/kuroko/kuroko4.jpg",
     "img/animes/kuroko/kuroko5.jpg", "img/animes/kuroko/kuroko6.jpg", "img/animes/kuroko/kuroko7.png", "img/animes/kuroko/kuroko8.jpg"],

    "3" : ["img/animes/naruto/naruto.png", "img/animes/naruto/naruto2.jpg", "img/animes/naruto/naruto3.jpg", "img/animes/naruto/naruto4.jpg",
        "img/animes/naruto/naruto5.jpg", "img/animes/naruto/naruto6.jpg", "img/animes/naruto/naruto7.jpg", "img/animes/naruto/naruto8.png",
         "img/animes/naruto/naruto9.png", "img/animes/naruto/naruto10.png"],

    "4" : ["img/animes/one-piece/one-piece.jpg", "img/animes/one-piece/one-piece2.jpg", "img/animes/one-piece/one-piece3.jpg",
        "img/animes/one-piece/one-piece4.jpg", "img/animes/one-piece/one-piece5.jpg", "img/animes/one-piece/one-piece6.png",
         "img/animes/one-piece/one-piece7.jpg", "img/animes/one-piece/one-piece8.jpg"],
};

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
