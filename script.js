document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los botones de prácticas
    const Buttons = document.querySelectorAll('.practice-btn');
    
    // Añadir evento click a cada botón
    Buttons.forEach(button => {
        button.addEventListener('click', function() {
            const folderName = this.getAttribute('data-folder');
            const HTMLname = this.getAttribute('id')
            
            if (folderName) {
                // Navegar a la práctica correspondiente
                window.location.href = `./${folderName}/${HTMLname}.html`;
            }
        });
    });

});

