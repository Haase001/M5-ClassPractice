// Datos iniciales de libros en formato JSON
let biblioteca = '{"libros": [{"titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "genero": "Realismo mágico", "disponible": true}, {"titulo": "1984", "autor": "George Orwell", "genero": "Distopía", "disponible": true}]}';

//Elementos del DOM
const container = document.getElementById('container')

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
        //Mostramos en consola
        console.log("Inventario de libros:");
        //Mostramos en la página
        const line = document.createElement('p');
        line.classList.add('line')
        line.innerHTML =`Inventario de libros:`;
        container.appendChild(line)

        datos.libros.forEach((libro, index) => {
            //Mostramos en consola
            console.log(`${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.disponible ? 'Disponible' : 'Prestado'})`);

            //Mostramos en la página
            const line = document.createElement('p');
            line.classList.add('line')
            line.innerHTML = `${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.disponible ? 'Disponible' : 'Prestado'})`;
            container.appendChild(line)
        });
    });
}

// Función para agregar un nuevo libro
function agregarLibro(title, author, genre, available) {
    const nuevoLibro = { titulo: title, autor: author, genero: genre, disponible: available };
    // Aquí falta la simulación de escribir el libro en el "archivo" (es decir, agregarlo al objeto)
    setTimeout(() => {
        const nuevaBiblioteca = JSON.parse(biblioteca)
        nuevaBiblioteca.libros.push(nuevoLibro)
        biblioteca = JSON.stringify(nuevaBiblioteca)
        console.log(nuevaBiblioteca);
    }, 1000);
}

// Función para cambiar la disponibilidad de un libro
function actualizarDisponibilidad(titulo, nuevoEstado) {
    // Simula un retraso antes de actualizar la disponibilidad
    setTimeout(() => {
        const library = JSON.parse(biblioteca);
        console.log(library);
        
        library.libros.forEach(element => {
            if (element.titulo === titulo) {
                element.disponible = nuevoEstado
                console.log(element);
                
            }
        });

        biblioteca = JSON.stringify(library)
        console.log(biblioteca);
        
    }, 1000);
}

// Ejemplo de cómo ejecutar la aplicación
mostrarLibros();

agregarLibro("El principito", "Antoine de Saint-Exupéry", "Fábula", true);

actualizarDisponibilidad("1984", false);