//querySelectors

const divCountries = document.querySelector('.countries');
const inputSearchByName = document.querySelector('.search__input');
const divInputSearch = document.querySelector('.search__input_container');
const divContainerSearch = document.querySelector('.search');

// Functions HTML Creators

const createSmallCard = ( {population , capital , name , flag , region} ) => {   
    return ` <article class="country" data-country='${name}'>
    <img class="country__img" src="${flag}" alt="">
    <h3 class="country__name">${name}</h3>
    <ul class="country__list_data">
    <li class="country__item_data">Population: &nbsp; <span class="country__item_value">${population}</span></li>
    <li class="country__item_data">Region: &nbsp; <span class="country__item_value">${region}</span></li>
    <li class="country__item_data">Capital: &nbsp; <span class="country__item_value">${capital}</span></li>
    </ul>
    </article>`
}


const createDetailCard = ( options ) => {
    
    const {  name , capital , flag , population , region , nativeName ,  subregion , currencies , languages , topLevelDomain , borders } = options;

    const currenciesNames = currencies.map( function (currency){
        return currency.name;
    });

    const languagesNames =  languages.map( function (language){
        return language.name;
    })

    const bordersCountries = borders.map( function(border){
        return `<a href="#" class="country__borders_link">${border}</a>`;
    })


    return `
    <section  data-country='${name}'  class="country__details">
    
    <button class="back"> <i class="fas fa-arrow-left"></i>  BACK</button>
    
    <article class="country">
    
    <img class="country__img" src="${flag}" alt="">
    
    <h3 class="country__name">${name}</h3>
    
    <ul class="country__list_data">
    <li class="country__item_data">Native name: &nbsp; <span class="country__item_value">${nativeName}</span></li>
    <li class="country__item_data">Population: &nbsp; <span class="country__item_value">${population}</span></li>
    <li class="country__item_data">Region: &nbsp; <span class="country__item_value">${region}</span></li>
    <li class="country__item_data">Sub-Region: &nbsp; <span class="country__item_value">${subregion}</span></li>
    <li class="country__item_data">Capital: &nbsp; <span class="country__item_value">${capital}</span></li>
    
    <li class="country__item_data">Top Level Domain: &nbsp; <span class="country__item_value">${  [...topLevelDomain] }</span></li>
    <li class="country__item_data">Currencies: &nbsp; <span class="country__item_value">${[...currenciesNames ]}</span></li>
    <li class="country__item_data">Languages: &nbsp; <span class="country__item_value">${[...languagesNames]}</span></li>
    </ul>
    
    
    <div class="country__borders">
    <span class="country__borders_title">Border Countries</span>
    ${[...bordersCountries]}
    
    
    </div>
    
    </article>
    
    </section>`;
    
    
}


//Functions for fetching data
const getResultados = (link = 'https://restcountries.eu/rest/v2/all?fields=population;capital;region;name;flag') => {
return new Promise(resolve=> {
    fetch(link)
    .then(response => {
        return response.json();
    })
    .then(data => {
        resolve(data);
    })
    .catch(error => {
        console.log(error)
    })
    
})
}

//Funcion para realizar la busqueda por nombre o region
const getBusqueda = async ( { name, region } ) => {
    
    if( name ){
        return await getResultados(`https://restcountries.eu/rest/v2/name/${name}`)
    }
    
    if( region != 'none' ){
        return await getResultados(`https://restcountries.eu/rest/v2/region/${region}`)
    }
    
}

//Fetch region data selected
const getRegion = () => {
    return optionsTitle.dataset.selected;
}



//Functions para manejo de DOM y HTML
const limpiarResultados = () => {
    return new Promise (resolve => { 
        const paises  = Array.from(document.querySelectorAll('.country'));
        
        paises.forEach(pais => { 
            pais.remove();
        })
        
        setTimeout( () => resolve() , 1000);
    })
}

const monstrarResultaldos = async ( resultados ) => { 
    
    if(!resultados ) resultados =  await getResultados();
    
    resultados.slice(0 , 20).forEach(country => {        
        const newDiv = createSmallCard( country);
        divCountries.insertAdjacentHTML('beforeend' , newDiv);
    });


    setEventListenerToCountries();
}



// Event handlers
const handleInputBusqueda = async ( { target } ) => {
    limpiarResultados();
    resetRegion();
    
    if(target.value.length > 0 ){
        
        const resultados = await getBusqueda( { name: target.value })
        
        monstrarResultaldos( resultados );
    }else{
        monstrarResultaldos();
    }
}


const handleRegionBusqueda = async ( { currentTarget  } ) => {
    
    limpiarResultados();
    
    const region = currentTarget.dataset.selected;
    
    console.log (region);
    
    const resultados  = await getBusqueda({ region: region })

    
    monstrarResultaldos( resultados );
    
}


const handleOpenDetails = async (e) => {
    //Aqui deberiamos mostrar la vista detail y ocultar la home
    divCountries.style.display = 'none';


    const resultados = await  getBusqueda({ name: `${e.currentTarget.dataset.country}`});


    divContainerSearch.insertAdjacentHTML("afterend" , createDetailCard(resultados[0]));

    await wait(100);

    document.querySelector('.country__details').style.display = 'grid';
    document.querySelector('.back').addEventListener('click' , handleCloseDetailes);
    Array.from(document.querySelectorAll('.country__borders_link')).forEach(link => {
        link.previousSibling.remove();
        // link.addEventListener('click' , handleOpenDetails);
    })
}


const handleCloseDetailes = async (e) => {
    document.querySelector('.country__details').style.display = 'none';

    divCountries.style.display = 'grid';
    document.querySelector('.back').removeEventListener('click' , handleCloseDetailes);
} 

const setEventListenerToCountries = () => {
    const allCountries = document.querySelectorAll('.country');
    allCountries.forEach(country => {
        country.addEventListener('click' , handleOpenDetails )
    })
}


//Go
monstrarResultaldos();


//Event Listener
inputSearchByName.addEventListener('keyup' , handleInputBusqueda );
optionsTitle.addEventListener('changeRegion' ,  handleRegionBusqueda);



