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

//Creamos una funcion para sacar el tiempo que tardará la orden
function getTime (Name, list) {
    return new Promise((resolve, reject) => {
        //Creamos una tabla que nos indicara los tiempos de preparacion en segundos
        const timeChart = [
            {name: 'Café caliente', time: 5 },
            {name: 'Mocha Frappuccino', time: 5 },
            {name: 'Café frío', time: 5 },
            {name: 'Matcha Latte', time: 5 },
            {name: 'Café Vainilla', time: 5 },
            {name: 'Sandwich de Pavo', time: 5 },
            {name: 'Baguette de pavo', time: 5 },
            {name: 'Hot cakes', time: 5 },
            {name: 'Crepas', time: 5 },
            {name: 'Waffle con Helado', time: 5 },
            {name: 'Brownie', time: 5 }
        ];

        //variable para controlar la suma
        let totalTime = 0;

        //Calculamos el tiempo que tardará la orden
        //Por cada elemento en la lista, buscamos un elemento en la tabla de tiempos
        list.forEach( element => {
            const existingItem = timeChart.find(item => item.name === element.name);
    
            if (existingItem) {
                // Si existe, incrementa la cantidad
                totalTime += element.quantity*existingItem.time;
            } else {
                reject (`Hubo un problema con la orden de ${Name}`);
            
            };
        })
        setTimeout(() => {
            resolve (totalTime)
        }, 5000);
        
    })
}

async function makingOrder (Name, list) {
    try {
        //Creamos una variable para sumar el tiempo
        const time = await getTime(Name, list);
        console.log(time);
        
        //Creamos un nuevo elemento
        const line = document.createElement('div');
        line.classList.add('selected-items');
        line.setAttribute('id', Name)

        //Creamos la seccion del nombre del elemento
        const name = document.createElement('span');
        name.classList.add('itemsName');
        name.innerHTML = Name;
        line.appendChild(name);

        //Creamos La seccion con el tiempo que tardará la orden
        const orderTime = document.createElement('span');
        orderTime.innerHTML = time;
        line.appendChild(orderTime);

        //Insertamos todo esto en el área de progreso
        inProgress.appendChild(line);

        return new Promise((resolve, reject) => {
            //Esperamos el tiempo indicado y mandamos el resultado
            setTimeout(() => {
                resolve ('Orden lista')
            }, time*1000);
        })
    } catch (error) {
        console.log(`Hubo un error creando su orden ${error}`);
        
    }
}

//Funcion para enviar la orden
async function sendOrder (Name, list) {
    try {
        newOrder.reset();
        orderDisplay.innerHTML = '';
        //Creamos un elemento para poner el status
        const line = document.createElement('div');
        line.classList.add('selected-items');

        //Creamos la seccion del nombre del elemento
        const name = document.createElement('span');
        name.classList.add('itemsName');
        name.innerHTML = Name;
        line.appendChild(name);

        //Creamos la seccion donde estará el status
        const status = document.createElement('span');
        status.classList.add('status')
        status.innerHTML = `En progreso <i class="fa-solid fa-user-clock"></i>`
        line.appendChild(status);

        //Metemos esto en el DOM
        orderReady.appendChild(line);

        //Esperamos a la funcion makingOrder
        const resultado = await makingOrder(Name, list);
        
        //Ya que tengamos una respuesta cambiamos el status
        status.innerHTML = `${resultado} <i class="fa-solid fa-user-check"></i>`
        //Dejamos pasar unos segundos y quitamos las lineas creadas
        setTimeout(() => {
            console.log(resultado);
            line.remove();
            const removal = document.getElementById(Name)
            removal.remove()
        }, 20000)
    } catch (error) {
        inProgress.innerHTML = `Lo sentimos, tu orden no puede ser procesada ${error}`
    }
}

//Obtenemos datos del formulario
newOrder.addEventListener('submit', (evento) =>{
    //Evitamos que resetee la página
    evento.preventDefault();
    //Obtenemos el nombre del cliente y usamos .trim para evitar que quede en blanco
    let client = document.getElementById('Order-name').value.trim();

    //Validamos que haya un nombre en el pedido
    if (client === '') {
        alert('Es necesario escribir su nombre para el pedido')
    } else if (orderList.length === 0) {
        alert('Es necesario Agregar algún platillo a tu orden')
    }

    console.log(`La orden de ${client} está en proceso`);
    //LLamamos a la funcion que mandará nuestra orden a preparar
    sendOrder(client, orderList);
});