//Agarramos todos los elementos que vamos a utilizar


const btnOverlay = document.querySelector('.header__overlay');
const navbar = document.querySelector('.navbar');
const closeOverlay = document.querySelector('.close__overlay');



const handleOpenOverlay = (e) => {
    navbar.style.transform = 'translateX(0vw)';
    closeOverlay.addEventListener('click' , handleCloseOverlay);
    navbar.addEventListener('click' , handleCloseOverlay);
}

const handleCloseOverlay = (e) => {
    if(e.target == e.currentTarget || e.currentTarget == closeOverlay){
        navbar.style.transform = 'translateX(-100vw)';
    }
}

btnOverlay.addEventListener('click' , handleOpenOverlay);