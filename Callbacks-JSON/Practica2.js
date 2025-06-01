// Datos iniciales de libros en formato JSON
let biblioteca = '{"libros": [{"titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "genero": "Realismo mágico", "disponible": true}, {"titulo": "1984", "autor": "George Orwell", "genero": "Distopía", "disponible": true}]}';

//Elementos del DOM
const showBtn = document.getElementById('show-books');
const booksData = document.getElementById('libros-select');
const findBtn = document.getElementById('select-button');
const borrowBtn = document.getElementById('borrow-book');
const returnText = document.getElementById('libros-return');
const returnBtn = document.getElementById('return-book');
const addBtn = document.getElementById('Add-book');
const formContainer = document.getElementById('form-container')
const form = document.getElementById('form');
const container = document.getElementById('container');

//Events Listeners

showBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    mostrarLibros();
})

findBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    const data = booksData.value.trim()
    if (data) {
        findBook(data)
    } else {
        alert('Ingresa la informacion que quieras buscar')
    }
    booksData.value = '';
})

borrowBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    const data = booksData.value.trim()
    if (data) {
        borrowBook(data);
    } else {
        alert('Ingresa la informacion que quieras buscar')
    }
    booksData.value = '';
})

returnBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    const data = returnText.value.trim()
    if (data) {
        returnBook(data)
    } else {
        alert('Ingresa la informacion que quieras buscar')
    }
    returnText.value = '';
})

addBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    if (formContainer.classList.contains('hidden')) {
        formContainer.classList.remove('hidden')
    } else{
        formContainer.classList.add('hidden')
    }
})

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const author = document.getElementById('author-input').value.trim();
    const title = document.getElementById('book-input').value.trim();
    const genre = document.getElementById('genre-input').value.trim();
    if (!confirm('Los datos son correctos?')) return;

    agregarLibro(title, author, genre, true, saveData);
    form.reset();
})

//Funciones

//Funcion para mostrar en consola y en el HTML
function show(param) {
    console.log(param);
    const line = document.createElement('p')
    line.classList.add('line')
    line.innerHTML = param;
    container.appendChild(line)
}

// Función para simular la lectura de datos (asimilar la lectura de un archivo JSON)
function leerDatos(callback) {
    setTimeout(() => {
        // Aquí simulas leer el JSON con un retraso de 1 segundo
        callback(JSON.parse(biblioteca));
    }, 1000);
}

// Función para mostrar todos los libros en consola
function mostrarLibros() {
    leerDatos((datos) => {
        //Mostramos en consola y en el HTML
        show("Inventario de libros:");
        //Mostramos en la página
        datos.libros.forEach((libro, index) => {
            //Mostramos en consola
            show(`${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.disponible ? 'Disponible' : 'Prestado'})`);
        });
    });
}

//Funcion para encontrar libros en la libreria
function findBook(data) {
    leerDatos((library)=>{
        const findings = library.libros.filter(book => book.titulo === data || book.autor === data || book.genero === data)
        if (findings) {
            findings.forEach((libro, index) =>{
                show(`${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.disponible ? 'Disponible' : 'Prestado'})`)
            })
        } else {
            show(`No encontramos cohincidencias con esos datos`)
        }
    })
}

//Funcion para pedir prestado un libro
function borrowBook(data) {
    leerDatos((library)=>{
        const findings = library.libros.find(book => book.titulo === data);
        if (findings) {
            show(`- ${findings.titulo} - ${findings.autor} (${findings.disponible ? 'Disponible' : 'Prestado'})`)
            if (findings.disponible) {
                actualizarDisponibilidad(findings.titulo, saveData)
            } else {
                show(`El titulo no se encuentra disponible actualmente`)
            }
        } else {
            show(`No encontramos cohincidencias con esos datos`)
        }
    })
}

//Funcion para regresar un libro
function returnBook(data) {
    leerDatos((library)=>{
        const findings = library.libros.find(book => book.titulo === data);
        if (findings) {
            show(`- ${findings.titulo} - ${findings.autor} (${findings.disponible ? 'Disponible' : 'Prestado'})`)
            if (!findings.disponible) {
                actualizarDisponibilidad(findings.titulo, saveData)
            } else {
                show(`El titulo ya fué retornado y se encuentra disponible`)
            }
        } else {
            show(`No encontramos cohincidencias con esos datos`)
        }
    })
}

// Función para agregar un nuevo libro
function agregarLibro(title, author, genre, available, callback) {
    const nuevoLibro = {titulo: title, autor: author, genero: genre, disponible: available };
    show(`1. ${nuevoLibro.titulo} - ${nuevoLibro.autor} (${nuevoLibro.disponible ? 'Disponible' : 'Prestado'})`)
    // Simulación de escribir el libro en el "archivo"

    const validacion = new Promise((resolve, reject) => {
        setTimeout(() => {
            const nuevaBiblioteca = JSON.parse(biblioteca)
            nuevaBiblioteca.libros.forEach(book => {
                if (book.titulo === nuevoLibro.titulo) {
                    reject(`El libro ${nuevoLibro.titulo} ya se encuentra en los datos de la biblioteca`)
                }
            });
            resolve (nuevaBiblioteca)
        }, 1000);
    })
    .then(function (nuevaBiblioteca) {
        nuevaBiblioteca.libros.push(nuevoLibro)
        callback(nuevaBiblioteca)
        })
    .catch((message)=>show(message))
}

// Función para cambiar la disponibilidad de un libro
function actualizarDisponibilidad(titulo, callback) {
    // Simula un retraso antes de actualizar la disponibilidad
    setTimeout(() => {
        const library = JSON.parse(biblioteca);
        library.libros.forEach(element => {
            if (element.titulo === titulo) {
                if (element.disponible) {
                    element.disponible = false;
                } else {
                    element.disponible = true;
                }
            }
        });
        callback(library)
        show(`Disponiblidad de ${titulo} actualizada`)
    }, 1000);
}

//Funcion para guardar los datos una vez hechas las modificaciones
function saveData(data) {
    biblioteca = JSON.stringify(data)
    show('Datos de Biblioteca actualizada')
}
