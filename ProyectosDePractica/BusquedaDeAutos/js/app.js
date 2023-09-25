//variables

const resul = document.querySelector('#resultado')

const year = document.querySelector('#year')
const marca = document.querySelector('#marca')
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const puertas = document.querySelector('#puertas')
const tras = document.querySelector('#transmision')

const color = document.querySelector('#color')





const max = new Date().getFullYear();
const min = max -9;

// crear un objeto

const datos ={
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puerta: '',
    transmision: '',
    color: '',

}


document.addEventListener('DOMContentLoaded',()=>{

    mostrarautos(autos);// mustra los atomoviles
    


    // llena las opciones de año
    llenarSelec();

// eventos de cambio de los  select
    eventosselect();
    

});
// eventos de cambio de los  select

function eventosselect(){
    year.addEventListener('change',e=>{
        datos.year = parseInt( e.target.value); 
        filtrado();
        
    });

    marca.addEventListener('change',e=>{
        datos.marca = e.target.value; 
      
        filtrado();
    });

    color.addEventListener('change',e=>{
        datos.color = e.target.value; 
       filtrado()
    });
    
    puertas.addEventListener('change',e=>{
        datos.puerta = parseInt(e.target.value); 
        filtrado();
         
    });
   
    minimo.addEventListener('change',e=>{
        datos.minimo = parseFloat(e.target.value)  
        filtrado();
       
    });
    maximo.addEventListener('change',e=>{
        datos.maximo =  parseFloat(e.target.value)


        filtrado(); 
        
    });
    tras.addEventListener('change',e=>{
        datos.transmision = e.target.value; 
        filtrado();
         
    });

   
}


//funcion que filtra en base a la busqueda
function filtrado(){
    limpiarhtml();
    const res = autos.filter(filtraMarca).filter(filtradoYear).filter(filtradoColor)
    .filter(filtradoPuerta).filter(filtradotransmision).filter(filtradoMax).filter(filtradoMin);
     const cp1 = [...res];
     mostrarautos(cp1)

    

    console.log(cp1)
  /*    if(res.length){
        limpiarhtml();
        const RESULTADO = document.querySelector('.contenedor h1')
        RESULTADO.textContent= 'RESULTADO NO ENCOTRADO'

        
      
        resul.replaceChildren(RESULTADO)
    } else{

    }  */
}
 function filtraMarca(auto){
    const {marca }= datos
    if(marca){
        return auto.marca === marca
        
    }else{
        return auto

    }

 }

 function filtradoYear(auto){
    const {year }= datos

    
    if(year){
        return auto.year === year
        
    }else{
        return auto

    }

 };
 function filtradoColor(auto){
    const {color }= datos

    if(color){
        return auto.color === color
        
    }else{
        return auto

    }

 };
 function filtradoPuerta(auto){
    const {puerta }= datos

    if(puerta){
        return auto.puertas ===puerta
        
    }else{
        return auto

    }

 };
 function filtradotransmision(auto){
    const {transmision }= datos

    if(transmision){
        return auto.transmision === transmision
        
    }else{
        return auto

    }

 };
 function filtradoMax(auto){
    const {maximo }= datos
    
    
    

    if(maximo){
        return auto.maximo <= parseFloat( maximo)
    
        
    }else{
        return auto

    }

 };
 function filtradoMin(auto){
    const {minimo}= datos
console.log(  minimo)
    if(minimo){
        return auto.minimo >=  minimo
        
    }else{
        return auto

    }
 
 };




function mostrarautos(autos){

    autos.forEach(element => {
         const { color, transmision}= element
        const autohtml = document.createElement('p');
        autohtml.innerHTML=''+element.marca+' - '+''+element.modelo+' - '+
        ''+element+' - '+ ''+element.year+' - '+ ''+element.precio+' - '+ ''+element.puertas+' - '+
        ''+color+' - '+ ''+transmision+''+


        resul.appendChild(autohtml)
        
    });
}


function llenarSelec(){
    for(let i= max; i>min;i--){
        const opcion = document.createElement('option')
        opcion.innerHTML=''+i+''

        year.appendChild(opcion);
        
    }


}



function limpiarhtml(){
    while(resul.firstChild){
        resul.removeChild(resul.firstChild)
    }

}