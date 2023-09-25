const form = document.querySelector('#cotizar-seguro');
const cargado = document.querySelector('#cargando');

const diverror = document.querySelector('.contizadono-mensaje');

const resultado = document.querySelector('#resultado');
const spiner = document.querySelector('#cargando');


//eventos
evenlisener();
function evenlisener(){

    form.addEventListener('submit',cotisar)
    

}

//funcion validacion

function cotisar(e){

    e.preventDefault()
    //lear la marca
    const marca = document.querySelector('#marca').value;


    //leer año
    const year = document.querySelector('#year').value;


    //leer tipo de covertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    if(marca==="" || year=== ""|| tipo===""){
        ui1.mostraralerta('Todos los Campos son Obligatorios','error')
        return;

    }else{
        ui1.mostraralerta('Cotisando....','correcto')

        if(resultado.firstChild!==null){
            resultado.removeChild(resultado.firstChild)
        }
        

            const   seguro= new Seguro(marca, year,tipo);
            const total =seguro.contizar()
            ui1.mostrarresaultado(seguro,total);
            

       

       
        
        
    }
}

/// constructores

function Seguro(marca, year,tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

////realizando cotizacion 
let cantidad;
const base= 2000;


Seguro.prototype.contizar=function(){
    console.log(this.marca)
    switch(this.marca){
        case '1':
            cantidad= base *1.15;
            break;

        case '2':
            cantidad= base *1.05;
            break;

        case '3':
            cantidad= base *1.35;
            break;

        default:
            break;
    }
    //leer el año
    const diferencia = new Date().getFullYear()-this.year;

    // que cada año que la diferencia es mayor , el costo se reducira en un 3%
    cantidad= cantidad- ((diferencia*3)* cantidad)/100;

    // si el seguro es basico se multiplica por u 30% mas 
    if(this.tipo==='basico'){
        cantidad*= 1.30;
    }else{
        cantidad*= 1.50;
    }
    return cantidad




    // si el seguro es completo se multiplica por u 50% mas 
    

}

function Ui(){}


//prototype para mostrar el resultado en pantalla
Ui.prototype.mostrarresaultado= function(seguro,total){
   const div= document.createElement('div');
   div.classList.add('mt-10');
   let texto;
   switch(seguro.marca){
    case '1':
        texto = 'Americano';break;
    case '2':
        texto = 'Asiatico';break;
    case '3':
        texto = 'Europeo';break;



    default:
        break
   }

   div.innerHTML='<p class="header" >Tu Resumen</p>'+
   '<p class="font-bold" >Marca: '+texto+'</p>'+
   '<p class="font-bold" >Año: '+seguro.year+'</p>'+
   '<p class="font-bold" >Tipo: '+seguro.tipo+'</p>'+
   '<p class="font-bold" >Total: '+total+'</p>';




   if(resultado.childElementCount===0){
    

    setTimeout(()=>{
        resultado.appendChild(div)
        
        

    },3000);
    
       

        

    

   }
        

    
    
}
//////////////////////////////////////

const max = new Date().getFullYear(),
min = max-20
console.log(min)

Ui.prototype.llenaryear =()=>{
    const max = new Date().getFullYear(),
    min = max-20

    const selectYear = document.querySelector('#year');
    for(let i=max;i>min;i--){
        let option = document.createElement('option');
        option.value=i;
        option.textContent = i;
        selectYear.appendChild(option)
        
    }

}

// mostrar alertas
Ui.prototype.mostraralerta = (mensaje,tipo)=>{
    let div = document.createElement('div');

    if(tipo==='error'){
        div.classList.add('error');
        div.textContent = mensaje;
        if(diverror.childElementCount===0){
           
            diverror.appendChild(div)
            setTimeout(()=>{

                diverror.removeChild(diverror.firstChild)
                

            },3000);

           
            }

        
     } else{

        div.classList.add('correcto');
                div.textContent= mensaje;
    

                diverror.appendChild(div);
                spiner.style.display= 'block'
                

                setTimeout(()=>{
                    diverror.removeChild(diverror.firstChild)
                    spiner.style.display= 'none'
                    
                    

                },3000);
                
     }
     
     
     
     
   

    



}

const ui1 = new Ui();


document.addEventListener('DOMContentLoaded',()=>{
    ui1.llenaryear()

    
})




