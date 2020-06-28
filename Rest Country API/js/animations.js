// Hanlders function
const wait = (amount = 0) => {
    return new Promise(resolve=>{
        setTimeout(function() {
            resolve();
        }, amount);
    })
}





// Dark mode

// querySelectors
const darModeButton = document.querySelector('.header__darkMode');
const HTMLtag = document.documentElement;



// transitionsFunctions
const toggleTransition = () => {
    return new Promise(resolve => {
        HTMLtag.classList.add('transition');
        resolve();
    })
}

const changeMode = async () =>{
    
    const actualTheme = HTMLtag.getAttribute('data-theme');
 
    toggleTransition();
    
    if(actualTheme == 'dark'){
        HTMLtag.setAttribute('data-theme' , 'ligth');
     

    }
    if(actualTheme == 'ligth'){

        HTMLtag.setAttribute('data-theme' , 'dark');

    }
}   


// Event listeners de darkMode
darModeButton.addEventListener('click' , changeMode);

//Fin de darkMode


//Simple funcion para que cuando toquemos toda la caja de la search se haga focus en la busqueda
document.querySelector('.search__input_container').addEventListener('click' , () => {
    document.querySelector('.search__input').focus();
})




//Funcion para el filter by region


//querySelectors


const filterInput  = document.querySelector('.search__region');
const options = document.querySelector('.search__region_list');
const optionsIcon = document.querySelector('.search__region_icon');
const listOptions = document.querySelectorAll('.search__region_item');
const optionsTitle = document.querySelector('.search__region_title');

const selectOption = ({ target }) => {
    const option = target.dataset.region;
    
    //Opcion seleccionada
    optionsTitle.dataset.selected =  option;
    optionsTitle.innerText = target.innerText;

    optionsTitle.dispatchEvent(new Event('changeRegion'));
}

const resetRegion = () => { 
    optionsTitle.dataset.selected = 'none';
    optionsTitle.innerText = 'Filter by Region';
}



const openDivOptions = async () =>{

    options.style.animation = 'openOptions .3s forwards ease-in-out';
    options.style.opacity = '1';  
    optionsIcon.style.transform = 'rotateX(0)';
    optionsIcon.style.animation = 'fadeOutAndIn .5s';
    await wait(500);

    optionsIcon.style.animation = 'none';
    
    options.addEventListener('click' , selectOption);
    filterInput.removeEventListener('click' , openDivOptions);
    filterInput.addEventListener('click' , closeDivOptions);

}


const closeDivOptions = async () =>{

    options.style.animation = 'closeOptions .3s forwards ease-in-out';
    optionsIcon.style.transform = 'rotateX(180deg)';
    optionsIcon.style.animation = 'fadeOutAndIn .5s';
    await wait(500);
    optionsIcon.style.animation = 'none';
   

    options.removeEventListener('click' , selectOption);
    filterInput.removeEventListener('click' , closeDivOptions);
    filterInput.addEventListener('click' , openDivOptions);
}

filterInput.addEventListener('click' , openDivOptions );


