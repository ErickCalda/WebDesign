(function(){



    let DB;
    let id;

    const inputnombre = document.querySelector('#nombre');
    const inputcorreo = document.querySelector('#email');
    const inputtelefono = document.querySelector('#telefono');
    const inputempresa = document.querySelector('#empresa');
   
    const  formulario= document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded',()=>{


        conectarDB()
       const parametrosURL = new URLSearchParams(window.location.search)
       const idcliente  = parametrosURL.get('id'); id= idcliente

      

       if(idcliente){
        setTimeout(() => {
            obtenerclinete(idcliente)
            
        }, 100);
       
       }

       formulario.addEventListener('submit',actualizarCliente) 


    });
    

   function conectarDB(){
    const conexion = window.indexedDB.open('crm',1);
    conexion.onerror = ()=>{
        alert('hubo un error al abrir la conexion')
    }
    conexion.onsuccess = ()=>{
        DB = conexion.result;

    }


   
}




    function actualizarCliente(e){
        e.preventDefault();
        if(inputnombre.value===""|| inputcorreo.value==="" || inputtelefono.value===""||inputempresa.value===""){
          
            imprimirAlerta('Existen Campos Vacios','error')
            return
        }else{

        }
        const  camposactualizados ={
            nombre: inputnombre.value,
            email: inputcorreo.value,
            telefono:inputtelefono.value,
            empresa: inputempresa.value,
            id: Number(id)

        }
        console.log(camposactualizados)
        const transaction = DB.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.put(camposactualizados)
        transaction.oncomplete = function(){
            imprimirAlerta('Editado Correctamente','bien')
            setTimeout(() => {
                window.location.href='./index.html'
                
            }, 1000);
        }
        transaction.onerror = function(){
            imprimirAlerta('No se Pudo Guardar los Cambios','error');
        }
    

    }

   
    

 
    function obtenerclinete (idcliente){
        
        
        
        const transaction = DB.transaction(['crm'],'readwrite');

        const objectStore = transaction.objectStore('crm');
        objectStore.openCursor().onsuccess = function(e){
            const cursor = e.target.result;
            if(cursor){
                
              
               if(cursor.value.id === Number(idcliente )){
                
                llenarFormulario(cursor.value);
                

               }
                cursor.continue();
            }
        }
        
        

    }


    function llenarFormulario(cursor){
        const {nombre,email,telefono,empresa,id}= cursor
        inputnombre.value = nombre;
        inputcorreo.value= email;
        inputtelefono.value = telefono;
        inputempresa.value = empresa;
       
    }


    


})();