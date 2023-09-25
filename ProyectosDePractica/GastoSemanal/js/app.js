const formulario = document.querySelector('#agregar-gasto');
const listagastos = document.querySelector('#gastos .list-group');


let presupuesto2='';


eventos();

//eventos

function eventos(){

document.addEventListener('DOMContentLoaded',preguntarProsupuesto);
formulario.addEventListener('submit',validarform)

}

function preguntarProsupuesto(){

    const presupuesto = prompt('¿ Cual es tu presupuesto ?');
    console.log(presupuesto)
    if(presupuesto===''|| presupuesto===null || isNaN(presupuesto) || presupuesto<1){
        window.location.reload();
       

    }
    
    presupuesto2= new Presupuesto(presupuesto)
    console.log(presupuesto2)
    interfas.isertarpresupuesto(presupuesto2);
    const agregarHTMLpressupuesto = document.querySelector('p #total')
    agregarHTMLpressupuesto.textContent= presupuesto;
    

}



class Presupuesto{
    constructor (presupuesto){
        this.presupuesto= Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos= [];
    }

    nuevogasto(gastos){
        this.gastos=[...this.gastos, gastos]
       this.calculargastos(this.gastos)
        


        
    }

    calculargastos(gasto){
        const gastoscalculado = gasto.reduce((total,gasto)=>total+ gasto.cantidad,0)
        this.restante = this.presupuesto - gastoscalculado;
         
    }

    elimiargasto(id){
        this.gastos  =this.gastos.filter((gasto)=> gasto.id !== id) ;

        this.calculargastos(this.gastos)

    }


}


class Interfas{
    isertarpresupuesto(cantidad){
       
        this.cantidad= cantidad
        const{presupuesto, restante,gastos}= cantidad;
        //agragar al html
        const agregarHTMLpressupuesto = document.querySelector(' #total').textContent= presupuesto;
        const agregarHTMLrestante = document.querySelector(' #restante').textContent= presupuesto;

        

    }

    ImprimirAlerta(mensaje,alerta){
        
        const div = document.createElement('div')
        div.classList.add('text-center','alerta')
        if(alerta==='error'){
            
            div.classList.add('alert-danger');
            div.textContent= mensaje;
            document.querySelector('.primario').insertBefore(div,formulario)
           

            setTimeout(()=>{
                div.remove()
            
            },3000);



        }else{
            div.classList.add('alert-success')
            div.textContent= mensaje;
            document.querySelector('.primario').insertBefore(div,formulario);
            setTimeout(()=>{
                div.remove()
            
            },3000);
        }


    }

    agragargastos(gastos){
        
        
            
            gastos.forEach((gasto1)=>{
               
                 const {gasto,cantidad,id}= gasto1

                 //agregar li 
                 const li = document.createElement('li');
                 

                 li.className = "list-group-item d-flex justify-content-between align-items-center";
                 li.dataset.id = id;
                 li.textContent = gasto;
                 
                 //valor
                 const span = document.createElement('span');
                span.classList.add('badge','bg-primary','rounded-pill');
                 span.textContent = cantidad;
                 li.appendChild(span);

                 //agregar boton borrar
                 const borrar = document.createElement('button');
                 borrar.classList.add('btn','btn-danger');
                 borrar.textContent = 'Borrar';
                 borrar.onclick=(()=>{
                    borrarid(id);
                 })
                 li.appendChild(borrar);

                 listagastos.appendChild(li);


               
            })

            
            
       
        
    }

    

   

    actualizargatos(restante){
        const agregarHTMLrestante = document.querySelector(' #restante').textContent= restante;

    }

    
}

let interfas;
interfas = new Interfas();




function validarform(e){
    e.preventDefault();
    const gasto = document.querySelector('#gasto').value;
    const cantidad =Number( document.querySelector('#cantidad').value);

    if(gasto==='' || cantidad===''){

       
            interfas.ImprimirAlerta('Campos Incompletos','error')
        return;
        
    }else if(gasto<1 || isNaN(cantidad)){
        interfas.ImprimirAlerta('Caracter no Valido','error');
        return;
 
    }else{
        interfas.ImprimirAlerta('Gasto Agragado');

    }
    // objeto donde se almacena el valor de gasto y cantidad
    const datos= {gasto,cantidad,id: Date.now()}
   /*  console.log(datos) */

    presupuesto2.nuevogasto(datos)
    const {gastos,restante}= presupuesto2;
    lipiar();
    interfas.actualizargatos(restante)

    interfas.agragargastos(gastos)
    

    formulario.reset();

}
function borrarid(id){
    presupuesto2.elimiargasto(id)
    const  {gastos ,restante}=presupuesto2;
    interfas.agragargastos(gastos);
    interfas.actualizargatos(restante);
    lipiar();
    
    



}


 function lipiar(){
    while(listagastos.firstChild){
        listagastos.removeChild(listagastos.firstChild)
    }
}






