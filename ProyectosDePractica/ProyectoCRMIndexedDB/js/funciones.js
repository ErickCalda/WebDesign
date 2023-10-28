  

   
  function imprimirAlerta(mensaje,tipo){
    const divmensaje =  document.createElement('div');
    const alerta = document.querySelector('.alerta');

    if(!alerta){
        divmensaje.classList.add('px-4','py-3','max-auto','max-w-lg','rounded','mt-6','text-center','border','alerta');
        if(tipo==='error'){
            divmensaje.classList.add('bg-red-100','border-red-400','text-red-700');
    
        } else{
            divmensaje.classList.add('bg-greem-100','border-greem-400','text-greem-700');
        }
        divmensaje.textContent=mensaje;
        
        formulario.appendChild(divmensaje)
        setTimeout(()=>{
            divmensaje.remove(); 
    
        },3000 )
    


        
    }
   

   }

