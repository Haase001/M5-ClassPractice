document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los botones de prácticas
    const practiceButtons = document.querySelectorAll('.practice-btn');
    
    // Añadir evento click a cada botón
    practiceButtons.forEach(button => {
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