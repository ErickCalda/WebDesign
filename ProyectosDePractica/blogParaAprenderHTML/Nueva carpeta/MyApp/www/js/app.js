// api observer 


const fondocookie = document.querySelector('#fondocookie');
const cookie = document.querySelector('#cookie');
const boton = document.querySelector('#boton');
const line1 = document.querySelector('#line1');
const line2 = document.querySelector('#line2');
const line3 = document.querySelector('#line3');
const listaOl = document.querySelector('#lista-ol');
const icoMenu = document.querySelector('#ico-menu');
const sacarLista = document.querySelector('#sacar-sublista');
const subLista = document.querySelector('#sub-lista');

    dataLayer = [];





    miseventos()
    function miseventos(){

    icoMenu.addEventListener('click',()=>{
        listaOl.classList.toggle('style-ol')
        line1.classList.toggle("line1");
        line2.classList.toggle("line2")
        line3.classList.toggle("line3")

    })

    sacarLista.addEventListener('click',()=>{
        if(sacarLista.classList.contains('sacaarsublista2')){
            sacarLista.classList.remove('sacaarsublista2');
            sacarLista.classList.add('sacaarsublista');
            subLista.classList.add('sub-lista-aparese')
           
           
            return;
            
        }
        if(sacarLista.classList.contains('sacaarsublista')){
            subLista.classList.remove('sub-lista-aparese')
            setTimeout(()=>{
                sacarLista.classList.remove('sacaarsublista');
                sacarLista.classList.add('sacaarsublista2');


            },100)
         
           

        }


        

    })



    }


    document.addEventListener("DOMContentLoaded",()=>{
        generateUniqueID();
        cukis();
    })




    function cukis(){
    
        const user = "cookie aceptadas";
        if(!getCookie(user)){
            fondocookie.style.display = "block";
            cookie.style.display = "block";
          
           
           

        }
        else{
            dataLayer.push({'event': 'cookie aceptadas'});

        }

       
   

 
        boton.addEventListener("click",()=>{
            fondocookie.style.display = "none";
            cookie.style.display = "none";
            

                document.cookie= user+"=" +true+";"+"expires=Fri, 31 Dec 2025 23:59:59 GMT; HttpOnly:true"
                dataLayer.push({'event': 'cookie aceptadas'});

            
       

        })
        
    
        
   

    



    }


        // Función para generar un ID único
        function generateUniqueID() {
            // Aquí puedes usar algún método para generar un ID único, como una combinación de tiempo y un número aleatorio
            return Date.now() + Math.floor(Math.random() * 1000);
        }

        // Función para obtener el valor de una cookie
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            
            if (parts.length === 2) {
                return parts.pop().split(";").shift();
            }
        }











const year = document.querySelector('#year');

const years= new Date().getFullYear();
year.textContent = years;



