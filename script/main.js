
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


document.querySelector("#addItem").addEventListener("submit", event => {
  event.preventDefault();
	
  const {elements} = event.target;

  
  const nombre = elements["producto"].value;
  const cantidad = elements["cantidad"].value;
  const volumen = elements["volumen"].value;
	
  if (nombre && cantidad && volumen) { // Comprueba si se ingresaron valores
	  
    let item = { nombre, cantidad,volumen };
	  
    listaCompras.push(item);
    actualizarLista();
    guardarListaEnLocalStorage();
	Swal.fire(""+nombre+" Se agregó a tu lista");
	  
	document.getElementById("addItem").reset();
	  
  }else{
	  Swal.fire("Debes completar toda la información");
	  
  }

 
});

// Función para eliminar un item de la lista del mercado
function eliminarItem(elemento, item) {
  // Preguntamos si está seguro de borrar el item del mercado
	Swal.fire({
	  title: '¿Deseas borrar '+item.nombre+' del mercado?',
	  showDenyButton: true,
	  confirmButtonText: "Borrar",
	  denyButtonText: `No borrar`
	}).then((result) => {
	  /* Read more about isConfirmed, isDenied below */
	  if (result.isConfirmed) {
		Swal.fire(""+item.nombre+" se ha borrado", "", "success");
		 
		 listaCompras.splice(elemento, 1);
    	 actualizarLista();
    	 guardarListaEnLocalStorage();  
		  
		  
	  } else if (result.isDenied) {
		Swal.fire(""+item.nombre+" no se borro de tu lista ", "", "info");
	  }
	});
	
	
}

// Función actualizar un item de la lista del mercado
function actualizarItem(elemento, item) {
  //Preguntamos si está seguro de actualizar el item
	Swal.fire({
	  title: '¿Deseas editar '+item.nombre+' del mercado?',
	  showDenyButton: true,
	  confirmButtonText: "Editar",
	  denyButtonText: `Cancelar`
	}).then((result) => {
	  /* Read more about isConfirmed, isDenied below */
	  if (result.isConfirmed) {
		//proceso para modificar el item
		let itemSelect = document.querySelector('.item_'+elemento+'');

		
        let FormUpdate = `
          
			  <input type="text" class="Nproducto" name="Nproducto" placeholder="Nuevo nombre"/>
			  <input type="number" class="Ncantidad" name="Ncantidad" placeholder="Cantidad"/>
			  <select class="ListVolumen Nvolumen" name="Nvolumen">
				  <option value="">Volumen</option>
			  </select>


		`;
		  
		  
		itemSelect.children[0].className = 'FormsUpdate';
		itemSelect.children[0].innerHTML = FormUpdate;
		  
		PrintListV()
		
    	let botonSave = document.createElement("button");
    	let botonCancel = document.createElement("button");
	  
    	botonSave.textContent = 'Guardar';
		botonCancel.textContent = "Cancelar";
	  
		botonCancel.onclick = function() {
		    Swal.fire(""+item.nombre+" No se modificó ", "", "info");
			actualizarLista();
		};
	  
		botonSave.onclick = function() {
		  //actualizarItem(elemento, item);
		  let Nname = document.querySelector('[name=Nproducto]').value
		  let Ncantidad = document.querySelector('[name=Ncantidad]').value
		  let Nvolumen = document.querySelector('[name=Nvolumen]').value
		  
		  if (Nname && Ncantidad && Nvolumen) { // Comprueba si se ingresaron valores
			   listaCompras.forEach(function(elemento){
				item.nombre = Nname;
				item.cantidad = Ncantidad;
				item.volumen = Nvolumen;
			   }) 
			  actualizarLista();
			  guardarListaEnLocalStorage();
			  
			  Swal.fire(""+Nname+" Se modificó con éxito", "", "info");
			  
		  }else{
			  Swal.fire("Debes completar todos los campos", "", "info");
		  } 
		  
		  
		};
		  
		 
		[].forEach.call(document.querySelectorAll(".btnList"), function(btnList){
			btnList.parentNode.removeChild(btnList);
		});
		  
		  
		itemSelect.appendChild(botonSave);
		itemSelect.appendChild(botonCancel);
		  
		  
	  } else if (result.isDenied) {
		//Swal.fire(""+item.nombre+" no se borro de tu lista ", "", "info");
	  }
	});
	
}

// Función para actualizar la lista del mercado #lista-mercado
function actualizarLista() {
  let lista = document.getElementById("lista-mercado");
  // Borra los elementos de la lista para evitar duplicados
  lista.innerHTML = "";
  
  // Verificamos que el array no este vacio, si lo esta imprimimos imagen en la lista
	
  if(listaCompras.length > 0){
	  
	  // Recorre el array y agrega cada elemento como un <li> a la lista
	  listaCompras.forEach((item, elemento) => {
		let li = document.createElement("li");
		li.classList.add('item_'+elemento+'')
		li.innerHTML = '<div><p><strong>'+item.nombre+'</strong> - Cantidad: <span>'+item.cantidad+'</span><img src="./images/icon_'+item.volumen+'.png" title=""/></p></div>';
		// Agrega un botón para eliminar el elemento
		let botonBorrar = document.createElement("button");
		let botonEditar = document.createElement("button");

		botonEditar.className = 'btnList';
		botonEditar.textContent = 'Editar';
		botonBorrar.textContent = "X";
		botonBorrar.className = 'btnList';

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
	  
  }else{
	  let li = document.createElement("li");
	  li.className = 'CompraVacia'
	  li.innerHTML = '<img src="./images/compra.png" title="Tu lista esta vacia, agrega un item a tu canasta de compras"/>';
	  lista.appendChild(li);
  }
	
	

}

		 
		
		  
//Creamos la lista de opciones en los select de volumen

const CreateListVol = (lista) => {
	
	
	const optionsList = document.querySelectorAll(".ListVolumen option")
	optionsList.forEach(o => o.remove());
	
	setTimeout(function(){
		
		const listoVolumen = document.querySelectorAll(".ListVolumen")

		const options = document.createElement("option")
		options.setAttribute('value', lista.volumen)
		options.append(lista.descripcion)


		listoVolumen.forEach(select => {
			// Clona la nueva opción para evitar problemas al añadir la misma referencia
			const optionClone = options.cloneNode(true);
			select.add(optionClone);
		});	
		
	}, 10);
	
	
}


/*Imprimimos lista de volumenes en el select*/
const PrintListV = async () => {

    try{
		
        const respuesta = await fetch("./script/volumen.json")
        const listas =  await respuesta.json()
        listas.forEach(lista => {
           CreateListVol(lista)
			
        })
		
        return listas
    }catch(error){
      
		Swal.fire("Tenemos problemas, intenta más tarde");
    }
 	

}


const iniciar = async () => {
    
  	cargarListaDesdeLocalStorage();
  	actualizarLista();
	PrintListV()
}

// Cargar la lista desde localStorage cuando se carga la página
