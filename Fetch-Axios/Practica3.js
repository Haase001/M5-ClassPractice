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
    //fetchRender();
    updateRenderButtons();
})

axiosBtn.addEventListener('click', ()=>{
    //axiosRender();
    updateRenderButtons();
})

bothBtn.addEventListener('click', ()=>{
    //fetchRender();
    //axiosRender();
    updateRenderButtons();
})

prevFetch.addEventListener('click', ()=>{
    console.log('click');
    
})

nextFetch.addEventListener('click', ()=>{
    console.log('click');
})

prevAxios.addEventListener('click', ()=>{
    console.log('click');
})

nextAxios.addEventListener('click', ()=>{
    console.log('click');
})

//Funciones
// funcion para desabilitar los botones de renderizado
function updateRenderButtons (){
    fetchBtn.disabled = true;
    axiosBtn.disabled = true;
    bothBtn.disabled = true;
}