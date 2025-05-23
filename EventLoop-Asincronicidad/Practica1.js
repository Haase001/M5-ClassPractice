//Obtener los botones de interes del Navbar
const Buttons = document.querySelectorAll('.btn')

//event Listener para navegar por el proyecto
Buttons.forEach(button => {
    button.addEventListener('click', function() {
            const HTMLname = this.getAttribute('id')
            if (folderName) {
                // Navegar a la práctica correspondiente
                window.location.href = `${HTMLname}.html`;
            }
        });
});