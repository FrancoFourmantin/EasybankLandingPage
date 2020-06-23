// Overlay animation

const overlayBox = document.querySelector('.overlay');
const navbar = document.querySelector('.navbar');
const navbarList = document.querySelector('.navbar__list');
const overlayOpenButton = document.querySelector('.overlay__open')
const overlayCloseButton = document.querySelector('.overlay__close')

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));



async function  mostrarOverlay(){
        navbar.classList.add('navbar--active');
        navbarList.classList.add('navbar__list--active');
        //Debo cambiar el transform del boton open
        //y mostrar el close
        overlayOpenButton.style.animation = 'closeOverlay .15s forwards';     
        await wait(250);
        overlayCloseButton.style.animation = 'openOverlay .15s forwards';
        await wait(250); 
}


async function  closeOverlay(){
    navbar.classList.remove('navbar--active');
    navbarList.classList.remove('navbar__list--active');
    //Debo cambiar el transform del boton open
    //y mostrar el close
    overlayCloseButton.style.animation = 'closeOverlay .15s forwards';  
    await wait(250);
    overlayOpenButton.style.animation = 'openOverlay .15s forwards';
    await wait(250); 
}




const overlayAnimation = async (e) =>{
   
    const botonTocado = e.target.closest('svg');

    if(botonTocado.dataset.action == 'open'){
        await mostrarOverlay();
    }
    if(botonTocado.dataset.action == 'close'){
        await closeOverlay();
    }
}

overlayBox.addEventListener('click' , overlayAnimation);




//Slider animation

var slideIndex = 1;

function plusDivs(n) {
	showDivs(slideIndex += n);
}

function goToDiv(n) {
	showDivs(slideIndex = n);
}

function showDivs(n) {
const sliders = document.querySelectorAll(".testimonials .card");
//get the list of dots
const dots = document.querySelector(".dots").children;

if (n > sliders.length) { slideIndex = 1 }
if (n < 1) { slideIndex = sliders.length }
for (let i = 0; i < sliders.length; i++) {
    sliders[i].classList.remove('card--active');
    //remove .active from all dots
    dots[i].classList.remove("dots__dot--active")
}

sliders[slideIndex - 1].classList.add('card--active');
//add .active to the selected dot
dots[slideIndex - 1].classList.add("dots__dot--active");
}


showDivs(slideIndex);








