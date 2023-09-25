
     

import { enviarCorreo } from '../index.js';
const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const mensaje = document.querySelector('#Mensaje');
const enviar = document.querySelector('#enviar');

const  icnonoMenu =document.querySelector('#ico-menu');
const menu = document.querySelector('#menu');
const form = document.querySelector('#form');
const spinner = document.querySelector('#spinner')





icnonoMenu.addEventListener('click',()=>{
  
    menu.classList.toggle('entra');
    
    if(icnonoMenu.classList.contains('ico-menu2')){
        icnonoMenu.classList.remove('ico-menu2');
        
    }else{
        icnonoMenu.classList.add('ico-menu2');
        
      

    }
})



    


  form.addEventListener('submit',(e)=>{

   
     
    const expre = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
   
    
    console.log(nombre)
    e.preventDefault();
    if(nombre.value==="" || nombre.value===null && expre.test(email.value) && mensaje.value=== null || mensaje.value===""){
        console.log('vacio')
        Alerta('error', 'There are empty fields');
        return true
    }else{
        console.log('lleno')
        Alerta('bien', 'Sent correctly');
        
        form.reset();

        
    }
       
    
   


 })






function Alerta(error1, mensaje) {
    console.log(error1,'hola');

    const error = document.querySelector('#error');
    const divbtn = document.querySelector('#btn');
   
 
    if (error1 === 'error') {
       if (divbtn.classList.contains('boton1')) {

        divbtn.classList.remove('boton1');
        divbtn.classList.add('boton');
        error.classList.add('error');
        error.classList.remove('valido');
        error.classList.add('error1')
        error.classList.remove('invi')
        error.textContent = mensaje;

        setTimeout(()=>{
            divbtn.classList.add('boton1')

        },3000)
        
        
        
            }


        } else if (error1 === 'bien') {

            spinner.classList.remove('nulo')
                spinner.classList.add('spinner')
                setTimeout(() => {
                    spinner.classList.add('nulo')
                    spinner.classList.remove('spinner')

                    if (divbtn.classList.contains('boton1')) {
                


                         divbtn.classList.remove('boton1');
                         divbtn.classList.add('boton');
                         error.classList.add('error');
                         error.classList.add('valido')
                         error.classList.remove('invi')
                         error.textContent = mensaje;
                      
                         setTimeout(()=>{
                             divbtn.classList.add('boton1')
                         },3000);
                 
                    
                         }
        
                }, 3000);
           

                

         }
}

    
    
 