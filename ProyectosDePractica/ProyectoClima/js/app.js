const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const container = document.querySelector('.container');

window.addEventListener('load',()=>{
    formulario.addEventListener('submit',buscarclima);
})


function buscarclima(e){
    e.preventDefault();

    const ciuda = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;



    if(ciuda===""|| pais==""){

        mostrarerror('Todos los campos son obligatorios')

        return;
    }

    consultarAPI(ciuda,pais)
   

}


function mostrarerror(mensaje,tipo){
    const alerta= document.querySelector('.bg-red-100');

    
    if(!alerta){

        
    const alerta= document.createElement('div');
    alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center');

    alerta.innerHTML = `
    <strong class="font-bold" >Error</strong>
    <span class="block">${mensaje}</span>
    `;
    container.appendChild(alerta);
    setTimeout(() => {
        alerta.remove();
        
        
    }, 3000);


    }

    



}


function consultarAPI(ciudad,pais){
    const appid = '15d160aec431f6f50679b55bc9976893';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`

    mostrarSpiner();
   

    fetch(url).then(resolve=>{
      return  resolve.json();
    })
    .then( datos =>{

        limpiarHTML();
        if(datos.cod =='404'){
            mostrarerror('La Ciudad no Existe')
            return
        }
        mostrarclima(datos);
       
    })
   

}


function mostrarclima(datos){

    const { name, main:{temp, temp_max, temp_min}}= datos;
    const reultadodiv= document.querySelector('.estado');
 
    if(!reultadodiv){
        const actual = document.createElement('p');
   actual.innerHTML=`${gradosKelvin(temp)}&#8451 `;
   actual.classList.add('font-bold','text-6xl');
   const max = gradosKelvin(temp_max);
   const min = gradosKelvin(temp_min);

   const nombreCiudad = document.createElement('p');
   nombreCiudad.textContent =`Clima en ${name}`


    // temperatura maxima
   const temperaturaMaxima = document.createElement('p');
   temperaturaMaxima.innerText = `Max: ${max}°C `
   temperaturaMaxima.classList.add('text-xl')

   //temperatura minima
   const temperaturaMinima = document.createElement('p');
   temperaturaMinima.innerText = `Min: ${min}°C `
   temperaturaMinima.classList.add('text-xl')


   const reultadodiv= document.createElement('div');

   reultadodiv.classList.add('text-center','text-white','estado');

   
   reultadodiv.appendChild(nombreCiudad);
   reultadodiv.appendChild(actual);
   reultadodiv.appendChild(temperaturaMaxima);
   reultadodiv.appendChild(temperaturaMinima);
   resultado.appendChild(reultadodiv)

    }
   
}

function gradosKelvin(tempera){
    const centigrados =parseInt( tempera -273.15);
    
    return centigrados

}


function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}


function mostrarSpiner(){
    limpiarHTML();
    const divSpiner = document.createElement('div');
    divSpiner.classList.add('sk-fading-circle');

    divSpiner.innerHTML=  `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    
    `;
    resultado.appendChild(divSpiner);
    setTimeout(() => {

        divSpiner.remove();
        
        
        
    }, 1000);

}