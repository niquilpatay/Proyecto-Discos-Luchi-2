const stockProductos = [
    {
        id: 1,
        nombre: "Clics Modernos",
        cantidad: 1,
        desc: "Charly García",
        precio: 4500,
        img: "imgDisc/clics.jpg",
    },
    {
        id: 2,
        nombre: "Use Your Illusion I",
        cantidad: 1,
        desc: "Guns n' Roses",
        precio: 3190,
        img: "imgDisc/use1.jpg",
    },
    {
        id: 3,
        nombre: "Use Your Illusion II",
        cantidad: 1,
        desc: "Guns n' Roses",
        precio: 3190,
        img: "imgDisc/use2.jpg",
    },
    {
        id: 4,
        nombre: "Cuerpo y Alma",
        cantidad: 1,
        desc: "Pedro Aznar",
        precio: 2500,
        img: "imgDisc/cuerpo.jpg",
    },
    {
        id: 5,
        nombre: "Eco (feat. Funky Torinos)",
        cantidad: 1,
        desc: "Willy Crook",
        precio: 2400,
        img: "imgDisc/eco.jpg",
    },
    {
        id: 6,
        nombre: "La Grasa de las Capitales",
        cantidad: 1,
        desc: "Serú Girán",
        precio: 4000,
        img: "imgDisc/grasa.jpg",
    },
    {
        id: 7,
        nombre: "Oktubre",
        cantidad: 1,
        desc: "Patricio Rey y sus Redonditos de Ricota",
        precio: 8000,
        img: "imgDisc/oktubre.jpg",
    },
    {
        id: 8,
        nombre: "Romantisísmico",
        cantidad: 1,
        desc: "Babasónicos",
        precio: 4500,
        img: "imgDisc/romantisismico.jpg",
    },
    {
        id: 9,
        nombre: "Fiesta Sudaka (Parte 1)",
        cantidad: 1,
        desc: "Los Gardelitos",
        precio: 5000,
        img: "imgDisc/suda.jpg",
    },
    {
        id: 10,
        nombre: "Un Baión para el Ojo Idiota",
        cantidad: 1,
        desc: "Patricio Rey y sus Redonditos de Ricota",
        precio: 5500,
        img: "imgDisc/vaca.jpg",
    },
    {
        id: 11,
        nombre: "Peperina",
        cantidad: 1,
        desc: "Serú Girán",
        precio: 1810,
        img: "imgDisc/peperina.jpg",
    },
];

//INICIALIZAR ARREGLO DE CARRITO
let carrito = [];

//ALMACENAR ELEMENTOS A UTILIZAR
const contenedor = document.querySelector("#contenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const procesarCompra = document.querySelector("#procesarCompra");
const carritoContenedor = document.querySelector("#carritoContenedor");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector("#pagoProcesar");

//EJECUTAR FUNCIONES AL CARGAR LA PÁGINA
document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    mostrarCarrito();
    
    if(document.querySelector("#activarFuncion")){
        document.querySelector("#activarFuncion").click(procesarPedido);
    }
})

//ESPERAR SUBMIT DE FORMULARIO
if(formulario){
    formulario.addEventListener("submit", enviarPedido);
}

//ALMACENAR INFO Y ENVÍO DE FORMULARIO
function enviarPedido(e){
    e.preventDefault();
    const cliente = document.querySelector("#cliente").value;
    const correo = document.querySelector("#correo").value;
    console.log(cliente, correo);

    if(correo === "" || cliente === "") {
        Swal.fire({
            title: "Formulario incompleto.",
            text: "Rellenar formulario con e-mail y nombre.",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
    } else{
        const btn = document.getElementById('button');

        /*document.getElementById('form')
        .addEventListener('submit', function(event) {
        event.preventDefault();*/

        btn.value = 'Sending...';

        const serviceID = 'default_service';
        const templateID = 'template_2wn4nhp';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
            btn.value = 'Send Email';
            alert('Sent!');
            }, (err) => {
            btn.value = 'Send Email';
            alert(JSON.stringify(err));
            });

        const spinner = document.querySelector("#spinner");
        spinner.classList.add("d-flex");
        spinner.classList.remove("d-none");

        setTimeout( () => {
            spinner.classList.remove("d-flex");
            spinner.classList.add("d-none");
            formulario.reset();
        }, 3000);

        const alertExito = document.createElement("p");
        alertExito.classList.add("alert", "alerta", "d-block", "text-center", "col-md-12", "mt-2", "alert-success");
        alertExito.textContent = "Compra realizada correctamente.";
        formulario.appendChild(alertExito);

        setTimeout( () => {
            alertExito.remove();
        }, 3000);

        localStorage.clear();
    }
}

//VACIAR CARRO
if(vaciarCarrito){
    vaciarCarrito.addEventListener("click", () => {
        carrito.length = [];
        mostrarCarrito();
    })
}

//IR A PÁGINA DE COMPRA
if(procesarCompra){
    procesarCompra.addEventListener("click", () => {
        if(carrito.length == 0){
            Swal.fire({
                title: "Carro vacío.",
                text: "Agregar elementos al carrito para continuar con la compra.",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
        } else{
            location.href = "compra.html";
        }
        procesarPedido();
    })
}

//MOSTRAR PRODUCTOS DE PEDIDO
function procesarPedido(){
    carrito.forEach((producto) => {
        const listaCompra = document.querySelector("#listaCompra tbody");
        const {id, nombre, cantidad, precio, img} = producto; 

        const row = document.createElement("tr");
        row.innerHTML += `
        <td>
            <img class="img-fluid img-compra" src="${img}"/>
        </td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>${precio * cantidad}</td>
        `;

        listaCompra.appendChild(row);
    })
    totalProceso.innerText = carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0);
}

//MOSTRAR STOCK DE PRODUCTOS
if(contenedor){
    stockProductos.forEach((producto) => {
        const {id, nombre, cantidad, desc, precio, img} = producto;
        contenedor.innerHTML += `
        <div class="card" id="toastrContainer" style="width: 18rem;">
        <img src="${img}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">Precio: $${precio}</p>
            <p class="card-text">Artista: ${desc}</p>
            <button class="btn btn-primary btn-agregarCarrito" onclick=agregarProducto(${id})>Agregar al carrito</button>
        </div>
        </div>
        `;
    })
}

//CARRITO VISUAL
const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    
    if(modalBody){

        modalBody.innerHTML="";
        
        const productosMostrados = [];
    
        carrito.forEach((producto) => {
            if (!productosMostrados.includes(producto.id)){
                const {id, nombre, cantidad, precio, img} = producto;
                modalBody.innerHTML += `
                <div class="modal-contenedor">
                <div>
                    <img class="img-fluid img-carrito" src="${img}">
                </div>
                <div class="modal-contenedor-info">
                    <p>Producto: ${nombre}</p>
                    <p>Precio: $${precio}</p>
                    <p>Cantidad: ${cantidad}</p>
                    <button class="btn btn-danger" onclick=eliminarProducto(${id})>Eliminar producto</button>
                </div>
                </div>
                `;
                productosMostrados.push(producto.id);
            }
        });
    }

    if(carrito.length == 0){
        modalBody.innerHTML = `
        <p class="text-center text-primary">Agregar elementos al carrito.</p>
        `
    }

    carritoContenedor.textContent = carrito.length;
    
    if(precioTotal){
        precioTotal.textContent = carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0);
    }
    guardarStorage();
}

//AGREGAR PRODUCTO A CARRITO
function agregarProducto(id){
    const existe = carrito.some(producto => producto.id == id);
    if(existe){
        const producto = carrito.map(producto => {
            if(producto.id == id){
                producto.cantidad++;
            }
        })
    } else{
        const item = stockProductos.find((producto) => producto.id === id);
        carrito.push(item);
    }
    mostrarCarrito();
    toastr.success('Producto agregado al carrito', 'Éxito', { positionClass: 'toast-bottom-right' });
}

//ELIMINAR PRODUCTO DE CARRITO
function eliminarProducto(id){
    const juegoId = id; 
    carrito = carrito.filter((juego) => juego.id !== juegoId);
    mostrarCarrito();
}

//GUARDAR CARRITO EN STORAGE
function guardarStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

