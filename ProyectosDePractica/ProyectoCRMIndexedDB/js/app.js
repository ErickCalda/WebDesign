
(function(){





    let DB;
    const listadocliente = document.querySelector('#listado-clientes')

    document.addEventListener('DOMContentLoaded',()=>{
    crearDB();

    if(window.indexedDB.open('crm',1)){
        octenerCliente();
    }

    listadocliente.addEventListener('click',eliminarcliente);
    

    }) 



  


function crearDB(){
    const crearDB = window.indexedDB.open('crm',1);
    crearDB.onerror= function(){
        console.log('hubo un error');

        }
        crearDB.onsuccess= function(){
            DB= crearDB.result;
            
        }
        crearDB.onupgradeneeded= function(e){
            const db= e.target.result;


            const objectStore =  db.createObjectStore('crm',{keyPath: 'id', autoIncrement:true});
            objectStore.createIndex('nombre', 'nombre',{unique: false});
            objectStore.createIndex('email', 'email',{unique:true});
            objectStore.createIndex('telefono', 'telefono',{unique: false});
            objectStore.createIndex('empresa', 'empresa',{unique: false});
            objectStore.createIndex('id', 'id',{unique: true});

            console.log('db listo y creada');
        }




}



function octenerCliente(){
    let conecxion = window.indexedDB.open('crm',1);

    conecxion.onerror = function(){
        console.log('error al intentar abrir la conexion')

    }
    conecxion.onsuccess = ()=>{
        DB = conecxion.result;

        const objectStore = DB.transaction('crm').objectStore('crm')
        objectStore.openCursor().onsuccess = function(e){
        const cursor = e.target.result;
        if(cursor){
            
            
            
            const {nombre,email,telefono,empresa,id}= cursor.value;
            
          
          
            listadocliente.innerHTML= listadocliente.innerHTML +`<tr class="">
            <td class="px-6 whitespace-no-wrap border-b border-gray-200 " >
             <p class="text-sm leading-5 font-medium text-gray-700 text-lg text-bold " >${nombre} </p>
             <p class="text-sm leading-5 text-gray-700" >${email} </p>
            </td>

            <td class="px-6 whitespace-no-wrap border-b border-gray-200">
            <p class=" text-gray-700" >${telefono} </p>
            </td>

            <td class="px-6 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-700">
            <p class=" text-gray-600" >${empresa} </p>
            </td>

            <td class="px-6 whitespace-no-wrap border-b border-gray-200 leading-5 text-sm">
             <a href="editar-cliente.html?id=${id}" class="text-green-600 hover:text-teal-900 mr-5">Editar</a>
             <a href=""data-cliente=${id} class="text-red-600 hover:text-teal-900 eliminar">Eliminar</a>
            </td>
            
            </tr>`;
            
           
            cursor.continue(); 
            

        }
      }
    }
    

}



function eliminarcliente(e){
    
    if(e.target.classList.contains('eliminar')){
        const ideliminar =  Number(e.target.dataset.cliente);
        const confirmar = confirm('Deseas Eliminar Este Cliente')
        if(confirmar){
            const transaccion = DB.transaction([ 'crm'],'readwrite');
            const objectStore = transaccion.objectStore('crm');

            objectStore.delete(ideliminar);

            transaccion.onerror = function(){
                console.log('error al intentar abrir la conexion')
        
            }
            transaccion.oncomplete = ()=>{
                e.target.parentElement.parentElement.remove();
                
                setTimeout(() => {
                    alert('Eliminado Correctamente')
                    
                }, 1000);
                
                
            }
            

        }
    }
  

}


})();
