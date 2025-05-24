//Obtener los botones de interes del Navbar
const Buttons = document.querySelectorAll('.btn')

//Event Listener para navegar por el proyecto
Buttons.forEach(button => {
    button.addEventListener('click', function() {
            const HTMLname = this.getAttribute('id')
            if (HTMLname) {
                // Navegar a la práctica correspondiente
                window.location.href = `${HTMLname}.html`;
            }
        });
});

//Obtenemos los objetos de DOM que utilizaremos
const newOrder = document.getElementById('form');
const orderItems = document.querySelectorAll('.option-img');
const orderDisplay = document.getElementById('pre-Order');
const inProgress = document.getElementById('in-Progress');
const orderReady = document.getElementById('order-Ready');

//Creamos una variable donde guardaremos los pedidos
let orderList = [];

function deleteItem (deleteBtn, itemName) {
    //Creamos un Event Listener para el botón de eliminar
    deleteBtn.addEventListener('click', () => {
        //Verificamos si existe algún elemento con el mismo nombre en orderList
        const existingItem = orderList.find(item => item.name === itemName);

        //Si existe y hay mas de uno, le quitamos uno
        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
        } else {
        //Caso contrario, eliminamos el elemento por completo
            orderList = orderList.filter((i) => i.name !== itemName )
        }
        
        console.log(orderList);
        UpdateOrder(orderList);
    });
}

function UpdateOrder(List) {
    //Borramos lo que este en la cajita
    orderDisplay.innerHTML = '';

    //Creamos la nueva lista
    List.forEach( element => {
        //Creamos un nuevo elemento
        const line = document.createElement('div');
        line.classList.add('selected-items');

        //Creamos La seccion con la cantidad de elementos
        const number = document.createElement('span');
        number.classList.add('numberOfItems');
        number.innerHTML = element.quantity;
        line.appendChild(number);

        //Creamos la seccion del nombre del elemento
        const name = document.createElement('span');
        name.classList.add('itemsName');
        name.innerHTML = element.name;
        line.appendChild(name);

        //Creamos un boton para reducir la cantidad o elliminar la linea
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-item');
        deleteBtn.setAttribute('type', 'button');
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        line.appendChild(deleteBtn);

        //Insertamos todo en el DOM
        orderDisplay.appendChild (line);

        //LLamamos a una funcion para borrar elementos en caso de ser necesario
        deleteItem(deleteBtn, element.name);
    });

}

//Obtenemos los alimentos en el pedido
orderItems.forEach( item =>{
    item.addEventListener('click', function () {
        //Obtenemos el nombre del platillo o bebida
        const itemName = this.getAttribute('alt');

        // Busca si el ítem ya existe en orderList
        const existingItem = orderList.find(item => item.name === itemName);
    
        if (existingItem) {
            // Si existe, incrementa la cantidad
            existingItem.quantity += 1;
        } else {
            // Si no existe, agrega un nuevo objeto
            orderList.push({
            name: itemName,
            quantity: 1
            });
        };
        //llamamos a la funcion que pintará todo en el documento
        UpdateOrder(orderList)
    })
});

//Obtenemos datos del formulario
newOrder.addEventListener('submit', (evento) =>{
    //Evitamos que resetee la página
    evento.preventDefault();
    //Obtenemos el nombre del cliente y usamos .trim para evitar que quede en blanco
    let client = document.getElementById('Order-name').value.trim();

    //Validamos que haya un nombre en el pedido
    if (client === '') {
        alert('Es necesario escribir su nombre para el pedido')
    };

    console.log(`La orden de ${client} está en proceso`);
    
});