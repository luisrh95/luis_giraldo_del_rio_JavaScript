
// Array para almacenar los elementos de la lista del mercado
let listaCompras = [];

// Función para cargar la lista desde localStorage
function cargarListaDesdeLocalStorage() {
  const listaGuardada = localStorage.getItem('listaCompras');
  if (listaGuardada) {
    listaCompras = JSON.parse(listaGuardada);
  }
}

// Función para guardar la lista en localStorage
function guardarListaEnLocalStorage() {
  localStorage.setItem('listaCompras', JSON.stringify(listaCompras));
}

// Función para agregar un item a la lista
function agregarItem() {
  let nombre = PreguntaLoop("Ingrese el nombre del artículo:");
  let cantidad = PreguntaLoop("Ingresa la cantidad que necesitas");
	
  if (nombre && cantidad) { // Comprueba si se ingresaron valores
    let item = { nombre, cantidad };
    listaCompras.push(item);
    actualizarLista();
    guardarListaEnLocalStorage();
  }else{
	  alert('No se agregaron nuevos item a tu lista de mercado');
  }
	
}

// Función para eliminar un item de la lista del mercado
function eliminarItem(elemento, item) {
  // Preguntamos si está seguro de borrar el item del mercado
  if (confirm('¿Deseas borrar ' + item.nombre + ' del mercado?') == true) {
    listaCompras.splice(elemento, 1);
    actualizarLista();
    guardarListaEnLocalStorage();
  } else {
    alert('Atención - ' + item.nombre + ' no se borró del mercado');
  }
}

// Función actualizar un item de la lista del mercado
function actualizarItem(elemento, item) {
  // Preguntamos si está seguro de borrar el item del mercado
  if (confirm('¿Deseas actualizar ' + item.nombre + ' del mercado?') == true) {
    
  let NewNombre = PreguntaLoop("Ingrese el nuevo nombre del artículo:", item.nombre);
  let NewCantidad = PreguntaLoop("Ingresa la nueva cantidad que necesitas", item.cantidad);	  
	  
  if (NewNombre && NewCantidad) { // Comprueba si se ingresaron valores
       listaCompras.forEach(function(elemento){
        item.nombre = NewNombre;
        item.cantidad = NewCantidad;
       }) 
	  actualizarLista();
      guardarListaEnLocalStorage();
  }else{
	  alert('Atención - ' + item.nombre + ' no se actualizó');
  } 
	  
	  
  } else {
    alert('Atención - ' + item.nombre + ' no se actualizó');
  }
}

// Función para actualizar la lista del mercado #lista-mercado
function actualizarLista() {
  let lista = document.getElementById("lista-mercado");
  // Borra los elementos de la lista para evitar duplicados
  lista.innerHTML = "";
  // Recorre el array y agrega cada elemento como un <li> a la lista
  listaCompras.forEach((item, elemento) => {
    let li = document.createElement("li");
    li.innerHTML = '<p><strong>'+item.nombre+'</strong> - Cantidad: <span>'+item.cantidad+'</span></p>';
    // Agrega un botón para eliminar el elemento
    let botonBorrar = document.createElement("button");
    let botonEditar = document.createElement("button");
	  
    botonEditar.textContent = 'Editar';
	botonBorrar.textContent = "X";
	  
    botonBorrar.onclick = function() {
      eliminarItem(elemento, item);
    };
	  
    botonEditar.onclick = function() {
      actualizarItem(elemento, item);
    };
	  
    
    li.appendChild(botonEditar);
	li.appendChild(botonBorrar);
	  
    lista.appendChild(li);
  });
}

// Esta función nos permite generar un loop por pregunta si el usuario envia un null
function PreguntaLoop(TextPregunta, defaultTxt) {
  let retval;
  while (true) {
    retval = (prompt(TextPregunta,defaultTxt));
    
    if (retval !== '')
      return retval;
      
    alert("Debes escribir algo para continuar");
  }
}

// Cargar la lista desde localStorage cuando se carga la página
window.onload = function() {
  cargarListaDesdeLocalStorage();
  actualizarLista();
};
