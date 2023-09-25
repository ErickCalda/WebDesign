let Editado;

const mascotas = document.querySelector('#mascota');
const propietarioinput = document.querySelector('#propietario');
const telefonoinput = document.querySelector('#telefono');
const fechainput = document.querySelector('#fecha');
const horainput = document.querySelector('#hora');
const sintomasinput = document.querySelector('#sintomas');

const formulario = document.querySelector('#nueva-cita');
const citas = document.querySelector('#citas');


eventos();

function eventos(){

    mascotas.addEventListener('change',datoscita);
    propietarioinput.addEventListener('change',datoscita);
    telefonoinput.addEventListener('change',datoscita);
    fechainput.addEventListener('change',datoscita);
    horainput.addEventListener('change',datoscita);
    sintomasinput.addEventListener('change',datoscita);

    formulario.addEventListener('submit',validarform);


}

class Cistas{

    constructor(){
        this.arraycita=[];
        
        

    }

    agregarcita(cita){
       
        this.arraycita=[...this.arraycita,cita];
        
        
        

    }
    eliminarcita(id){
        
       const nuevo = this.arraycita.filter((idcita)=>{
            
            return idcita.id !== id;
            
        })

        this.arraycita= nuevo
        console.log( this.arraycita);

      
          
        
    }
    citaeditada(cita){
        this.arraycita = this.arraycita.map(citas=> citas.id===cita.id ? cita:citas)


    }

}



class Interfas{
    alerta(mensaje,error){
        const div = document.createElement('div');
        div.classList.add('text-center','alert','d-block','col-12')
        if(error ==='error'){
            div.classList.add('alert-danger');
            div.textContent = mensaje;
            setTimeout(() => {
                div.remove();
                
            }, 3000);

        }else{
            div.classList.add('alert-success');
            div.textContent = mensaje;
            setTimeout(() => {
                div.remove();
                
            }, 3000);
           

        }
       
        document.querySelector('#contenido').insertBefore(div,document.querySelector('.agregar-cita'))


    }



    mostrarcita(cita){
        const div = document.createElement('div');
       
       

        const {arraycita}= cita;
        arraycita.forEach(agragacita => {
            const {id,fecha,mascota,hora,sintomas,propietario,telefono}=agragacita;
           
           
            
            div.classList.add('cita','p-3');
            div.dataset.id= id;
            div.innerHTML = '<h3 class="fw-bold text-primary">Cita</h3>'+'<p> <span class="fw-bold">Mascocota: </span>'+mascota+'</p>'+'<p> <span class="fw-bold">Propietario: </span>'+propietario+'</p>'+'<p> <span class="fw-bold">Telefono: </span>'+telefono+'</p>'+'<p> <span class="fw-bold">Fecha: </span>'+fecha+'</p>'+'<p> <span class="fw-bold">Hora: </span>'+hora+'</p>'+ '<p> <span class="fw-bold">Sintomas: </span>'+sintomas+'</p>';
            
            
            
            const btn = document.createElement('button');
            btn.classList.add('button','m-1','btn','btn-danger');
            btn.textContent= 'Eliminar';
            const btn2 = document.createElement('button');
            btn2.classList.add('button','m-1','btn','btn-primary');
            btn2.textContent= 'Editar';
            
            btn.onclick=()=> eliminar(id);
            btn2.onclick=()=> cargaredid(agragacita);


            div.appendChild(btn)
            div.appendChild(btn2)
            citas.appendChild(div);
            
        });
  
    }
   
}

function eliminar(id){

  
    back.eliminarcita(id)
   //resetea el div
    fronend.mostrarcita(back)


    //muestra un mensaje
    fronend.alerta('Se elimino corractamente');
    //refrescando la cistas 
    

    
    

}

//carga los datos y el modo edicion

function cargaredid(agragacita){
    const {id,fecha,mascota,hora,sintomas,propietario,telefono}=agragacita;
    mascotas.value = mascota;
    propietarioinput.value = propietario;
    telefonoinput.value = telefono;
    fechainput.value = fecha;
    horainput.value =hora;
    sintomasinput.value = sintomas;



        citaObje.fecha=fecha;
    citaObje.hora=hora;
    citaObje.mascota=mascota;
    citaObje.propietario=propietario;
    citaObje.sintomas= sintomas;
    citaObje.telefono= telefono;
    citaObje.id=id;
   
    
    formulario.querySelector('button[type="submit"]').textContent= 'GUARDAR CAMBIOS';
    Editado= true;


   
    
}




const back = new Cistas();
const fronend = new Interfas();








const citaObje = {
    mascota:'',
    propietario:'',
    telefono:'',
    fecha:'',
    hora:'',
    sintomas:'',
}





function datoscita(e){
    citaObje[e.target.name]= e.target.value
    
}

function validarform(e){
    
    e.preventDefault();
    const {mascota}=citaObje
    if(mascota===''||citaObje.propietario===''||
    citaObje.telefono===''||citaObje.fecha===''||citaObje.hora===''
    ||citaObje.sintomas===''){

        fronend.alerta('Todos los campos son obligatorios ','error');
        return;
    }
    if(Editado){

        fronend.alerta('Editado Correctamente');
        back.citaeditada({...citaObje})
        formulario.querySelector('button[type="submit"]').textContent= 'CREAR CITA';
        Editado= false;
    }else{
        //agregar id unico
        citaObje.id =  Date.now()
        
        fronend.alerta('Se agrego correctamente ');
        //crear nueva cita
        back.agregarcita({...citaObje});

        console.log(back)
        
    }


        
       
       
        fronend.mostrarcita(back)
        limpiarobjet();

        

        //resetear formulario
        formulario.reset();

        //limpiando elobjeto


    

}

// funcion que limpia un objeto

function limpiarobjet(){
citaObje.fecha='';
citaObje.hora='';
citaObje.mascota='';
citaObje.propietario='';
citaObje.sintomas= '';
citaObje.telefono= '';
}





