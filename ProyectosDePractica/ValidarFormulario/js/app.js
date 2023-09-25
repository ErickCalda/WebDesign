// variables
const btnenviar  = document.querySelector('#enviar');
const reset = document.querySelector('#resetBtn');
//bariable de campos
const email  = document.querySelector('#email');
const asunto  = document.querySelector('#asunto');
const mensaje  = document.querySelector('#mensaje');

const formualario  = document.querySelector('#enviar-mail');

const exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    






//eventos


todoslosenventos();

function todoslosenventos(){
    // lo que hara depues de que arranque el dom
    document.addEventListener('DOMContentLoaded',iniciarApp)
    //campos del formualario
    email.addEventListener('blur',validarformulario);
    asunto.addEventListener('blur',validarformulario);
    mensaje.addEventListener('blur',validarformulario);
    formualario.addEventListener('submit',enviar);
   reset.addEventListener('click',resetea);


}


//funcion



function iniciarApp(){
   btnenviar.disabled= true
   btnenviar.classList.add('cursor-not-allowed','opacity-50')

}

//// funcion de validacion

function validarformulario(e){
    
    
  
    if(e.target.value.length >0){
        

        
        
        
        e.target.classList.remove('border','border-red-500');
        e.target.classList.add('border','border-green-500');
        const errores = document.querySelector('p')
        if(errores===null){

        }else{
            errores.remove();
        }
        
        
       
       
      
    }else{
        e.target.classList.remove('border','border-green-500');
        e.target.classList.add('border','border-red-500');
        mostrarError('Campo vacion')
        
        
       
        
    }

   if(e.target.type==='email'){
   
    if(exp.test(e.target.value)){
       
       
        

    }else{

        
        mostrarError('El email no es Valido')
    }

   }
   
  caposcorrectos();
       

    

};


function caposcorrectos(){

    if(exp.test(email.value)!== "" && asunto.value!== "" && mensaje.value !== ""){
        btnenviar.disabled= false
        btnenviar.classList.remove('border','cursor-not-allowed','opacity-50')
        console.log(' valida')
        
        

    }else{
        console.log('no pasate la validacion')
        

    }


}


function mostrarError(mensaje){
    const mesajeEr = document.createElement('p');
    mesajeEr.textContent= mensaje;
    mesajeEr.classList.add('border','border-red-500','background-color-100','text-red-500','p-3','tm-5','text-center','error');
    
    const errores = document.querySelectorAll('.error');

    if(errores.length=== 0){

        formualario.appendChild(mesajeEr);
        
    }


    
    

}


///enviar formulario
function enviar(e){
    e.preventDefault();
   const spinerj = document.querySelector('#spinner');

   spinerj.style.display= 'flex';
   // despuess de tres segundos ocultar spinner
   setTimeout(()=>{
    spinerj.style.display= 'none';
    const enviado =document.createElement('p');
    enviado.textContent = 'se envio correctamente'
    enviado.classList.add('border','border-blue-300','text-center','background-color-200','p-3','m-3')
    formualario.insertBefore(enviado, spinerj)
    setTimeout(()=>{
    
    
        enviado.remove();
        resetea();
        
    
       },5000);

   },3000);
  

   
  

   


}

function resetea(){
    
    
    formualario.reset()
    iniciarApp()

}