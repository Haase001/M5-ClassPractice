//Boton de inicio
const homeBtn = document.getElementById('../index');

//Volver al inicio
homeBtn.addEventListener('click', function() {
    const HTMLname = this.getAttribute('id');
        if (HTMLname) {
            // Navegar a la práctica correspondiente
            window.location.href = `${HTMLname}.html`;
        }
});

//Url para conectarnos con la API
const BASE_URL = 'https://rickandmortyapi.com/api/character';


//Manipulamos el DOM
//Botones para inicior a renderizar

const fetchBtn = document.getElementById('fetch-btn');
const bothBtn = document.getElementById('bothBtn');
const axiosBtn = document.getElementById('axios-btn');

//Botones de paginación

const prevFetch = document.getElementById('PrevBtnFetch');
const nextFetch = document.getElementById('NextBtnFetch');
const prevAxios = document.getElementById('PrevBtnAxios');
const nextAxios = document.getElementById('NextBtnAxios');

//Contenedores para renderizar

const fetchContainer = document.getElementById('data-container-fetch');
const axiosContainer = document.getElementById('data-container-axios');

//EventListeners

fetchBtn.addEventListener('click', ()=>{
    fetchRender();
    updateRenderButtons(fetchBtn, bothBtn);
})

axiosBtn.addEventListener('click', ()=>{
    axiosRender();
    updateRenderButtons(axiosBtn, bothBtn);
})

bothBtn.addEventListener('click', ()=>{
    fetchRender();
    axiosRender();
    updateRenderButtons(fetchBtn, axiosBtn, bothBtn);
})

prevFetch.addEventListener('click', ()=>{
    if(currentPageF > 1){
        currentPageF--; // disminuir la página actual
        fetchRender(currentPageF); // obtener los personajes de la nueva página
    }
})

nextFetch.addEventListener('click', ()=>{
    if(currentPageF < totalPagesF){
        currentPageF++; // incrementar la página actual
        fetchRender(currentPageF); // obtener los personajes de la nueva página
    }
})

prevAxios.addEventListener('click', ()=>{
    if(currentPageA > 1){
        currentPageA--; // disminuir la página actual
        axiosRender(currentPageA); // obtener los personajes de la nueva página
    }
})

nextAxios.addEventListener('click', ()=>{

    if(currentPageA < totalPagesA){
        currentPageA++; // incrementar la página actual
        axiosRender(currentPageA); // obtener los personajes de la nueva página
    }
})

//Funciones
// Funcion para desabilitar los botones de renderizado
function updateRenderButtons (button1, button2, button3){
    if (button1) {
        button1.disabled = true;
    };
    
    if (button2) {
        button2.disabled = true;
    };

    if (button3) {
        button3.disabled = true;
    };
}


// Funcion para renderizar en el contenedor de fetch

//   Variables para llevar el control de la paginación
let currentPageF = 1; //Pagina actual
let totalPagesF = 1; //total de páginas

function fetchRender(currentPageF = 1) {
    fetch(`${BASE_URL}?page=${currentPageF}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        //Actualizar el total de páginas disponibles (Lo proporciona la API)
        totalPagesF = data.info.pages; 
        
        const characters = data.results;
        
        //Limpiamos el contenedor
        fetchContainer.innerHTML = '';

        //Renderizamos
        characters.forEach(element => {

            //Creamos la tarjeta
            const card = document.createElement('div');
            card.className = 'card';

            //Creamos la imagen
            const img = document.createElement('img');
            img.setAttribute('src', element.image);
            img.setAttribute('alt', element.name);
            card.appendChild(img);

            //Creamos un divo donde meteremos la info
            const div = document.createElement('div');

            //Creamos el h2
            const h2 = document.createElement('h2');
            h2.innerHTML =`${element.name}`;
            div.appendChild(h2);

            //Creamos los datos
            const p1 = document.createElement('p');
            p1.innerHTML =`Especie: ${element.species}`;
            div.appendChild(p1);

            const p2 = document.createElement('p');
            p2.innerHTML =`Estado: ${element.status}`;
            div.appendChild(p2);
            
            const p3 = document.createElement('p');
            p3.innerHTML =`Género: ${element.gender}`;
            div.appendChild(p3);
            
            const p4 = document.createElement('p');
            p4.innerHTML =`Origen: ${element.origin.name}`;
            div.appendChild(p4);
            
            const p5 = document.createElement('p');
            p5.innerHTML =`Ubicación: ${element.location.name}`;
            div.appendChild(p5);

            card.appendChild(div)

            //Agregamos todo al contenedor principal
            fetchContainer.appendChild(card);
        });

        updateFetchButtons()
    })
    .catch(error => {
        console.error('Error:', error);
        fetchContainer.innerHTML = `<p> Error al obtener los personajes ${error.message}</p>`;
    });
}

// Funcion para actualizar los botones de paginacion
function updateFetchButtons() {
    prevFetch.disabled = currentPageF === 1; //Desabilitamos el boton "Anterior si la pagina actual es uno"
    nextFetch.disabled = currentPageF === totalPagesF; //Desabilitamos el boton "siguiente"
}

// Funcion para renderizar con axios
// Funcion para renderizar en el contenedor de fetch

//   Variables para llevar el control de la paginación
let currentPageA = 1; //Pagina actual
let totalPagesA = 1; //total de páginas

function axiosRender(currentPageA = 1) {
    axios.get(`${BASE_URL}?page=${currentPageA}`)
    .then(response => {
        const data = response.data;
        
        //Actualizar el total de páginas disponibles (Lo proporciona la API)
        totalPagesA = data.info.pages; 
        
        //Limpiamos el contenedor
        axiosContainer.innerHTML = '';

        //Renderizamos
        const characters = data.results;
        characters.forEach(element => {
            
            //Creamos la tarjeta
            const card = document.createElement('div');
            card.className = 'card';

            //Creamos la imagen
            const img = document.createElement('img');
            img.setAttribute('src', element.image);
            img.setAttribute('alt', element.name);
            card.appendChild(img);

            //Creamos un divo donde meteremos la info
            const div = document.createElement('div');

            //Creamos el h2
            const h2 = document.createElement('h2');
            h2.innerHTML =`${element.name}`;
            div.appendChild(h2);

            //Creamos los datos
            const p1 = document.createElement('p');
            p1.innerHTML =`Especie: ${element.species}`;
            div.appendChild(p1);

            const p2 = document.createElement('p');
            p2.innerHTML =`Estado: ${element.status}`;
            div.appendChild(p2);
            
            const p3 = document.createElement('p');
            p3.innerHTML =`Género: ${element.gender}`;
            div.appendChild(p3);
            
            const p4 = document.createElement('p');
            p4.innerHTML =`Origen: ${element.origin.name}`;
            div.appendChild(p4);
            
            const p5 = document.createElement('p');
            p5.innerHTML =`Ubicación: ${element.location.name}`;
            div.appendChild(p5);

            card.appendChild(div)

            //Agregamos todo al contenedor principal
            axiosContainer.appendChild(card);
        });

        updateAxiosButtons()
    })
    .catch(error => {
        console.error('Error:', error);
        axiosContainer.innerHTML = `<p> Error al obtener los personajes ${error.message}</p>`;
    });
}

// Funcion para actualizar los botones de paginacion
function updateAxiosButtons() {
    prevAxios.disabled = currentPageA === 1; //Desabilitamos el boton "Anterior si la pagina actual es uno"
    nextAxios.disabled = currentPageA === totalPagesA; //Desabilitamos el boton "siguiente"
}