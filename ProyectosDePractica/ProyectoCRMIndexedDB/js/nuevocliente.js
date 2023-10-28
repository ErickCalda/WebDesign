(function(){

 
    
     const  formulario= document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded',()=>{
       
        createdb();

        formulario.addEventListener('submit',validarCliente)  
    })

    let DB;

    
     function createdb(){
        const abrirConexion = window.indexedDB.open('crm',1);

        

    
        abrirConexion.onerror=function(){
            console.log('hubo un error');

        } 

        abrirConexion.onsuccess=function(){
         DB=  abrirConexion.result;
      
      
            
        }
    }

    function validarCliente(e){
        e.preventDefault();
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;
        if(nombre===""|| email==="" || telefono===""||empresa===""){
            imprimirAlerta('campos vacios','error');
            return

        } 

        const cliente={
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()

        }
      crearNuvoCliente(cliente);

         
    }

    function crearNuvoCliente(cliente){
        console.log(DB,'desde cliente')
        
        const transaction = DB.transaction(['crm'],'readwrite');

        const objectStore = transaction.objectStore('crm')
        objectStore.add(cliente);

        transaction.onerror= function(){
            console.log('hubo un error');
            imprimirAlerta('Correo ya existente','error');
             
        }
        transaction.oncomplete= function(){
            console.log('Cliente agregado')
            imprimirAlerta('Registro Completo','bien');
           
            setTimeout(() => {
                window.location.href="index.html"
                
            }, 1000);
        }

       
       

    }

    

})();
  
