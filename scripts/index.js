class Activity {
  constructor(id, title, description, imgUrl) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
  }
}

class Repository {
  constructor() {
    this.activities = [];
    this.identificadores = 0;
  }
  getAllAtivities() {
    return this.activities;
  }
  createActivity(title, description, imgUrl) {
    let id = this.identificadores++;
    const nuevaActividad = new Activity(id, title, description, imgUrl);
    this.activities.push(nuevaActividad);
  }
  deleteActivity(id) {
    this.activities = this.activities.filter(
      (actividad) => actividad.id !== Number(id)
    );
    console.log(this.activities);
  }
}

// Repositorio de todas las actividades
const nuevoRepositorio = new Repository();
// Convertir cada objeto Activity en un elemento HTML
const actividadObjetoAactividadHTML = (objetoActividad) => {
  const {id, title, description, imgUrl} = objetoActividad;
  const tarjeta = document.createElement('div');
  // const botonEliminar = document.createElement('button');
  const imagenBotonEliminar = document.createElement('img');
  imagenBotonEliminar.addEventListener('click', eliminarTarjeta);


  const tarjetaTexto = document.createElement('div');
  const tarjetaTitulo = document.createElement('h3');
  const tarjetaDescripcion = document.createElement('p');
  const tarjetaImagen = document.createElement('img');
  tarjeta.id = id;
  imagenBotonEliminar.src = "../assets/img/iconoborrar1.png";
  imagenBotonEliminar.classList.add('imagenBotonEliminar');
  imagenBotonEliminar.title = 'Eliminar';
  imagenBotonEliminar.id = `imagenBotonEliminar-${id}`;
  tarjetaTexto.classList.add('tarjetaTexto')
  tarjetaTitulo.innerHTML = title;
  tarjetaTitulo.classList.add('tarjetaTitulo')
  tarjetaDescripcion.innerHTML = description;
  tarjetaDescripcion.classList.add('tarjetaDescripcion')
  tarjetaImagen.src = imgUrl;
  tarjetaImagen.alt = `${title}`;
  tarjetaImagen.classList.add('tarjetaImagen')
  tarjeta.classList.add('tarjetaActividadFavorita');
  // botonEliminar.appendChild(imagenBotonEliminar);
  // botonEliminar.classList.add('botonEliminar')
  tarjetaTexto.appendChild(tarjetaTitulo);
  tarjetaTexto.appendChild(tarjetaDescripcion);
  tarjeta.appendChild(imagenBotonEliminar);
  tarjeta.appendChild(tarjetaImagen);
  tarjeta.appendChild(tarjetaTexto);
  
  return tarjeta;
}

// Convertir todas los objetos Activity a elementos HTML
const actividadesAhtml = () => {
  const contenedorActividades = document.getElementById('contenedorTarjetasActividades');
  contenedorActividades.innerHTML = '';
  const actividades = nuevoRepositorio.getAllAtivities()
  const actividadesComoHTML = actividades.map((objetoActividad) => {
    return actividadObjetoAactividadHTML(objetoActividad);
  })
  actividadesComoHTML.forEach((actividadHTML) => {
    contenedorActividades.appendChild(actividadHTML)
  });
} 

// Función que se ejecutará al dar click al boton agregar actividad
const agragarActividades = () => {
  const inputTitulo = document.getElementById('tituloActividad');
  const inputDescripcion = document.getElementById('descripcionActividad');
  const inputImagen = document.getElementById('linkImagen');
  
  const titulo = inputTitulo.value;
  const descripcion = inputDescripcion.value;
  const imagen = inputImagen.value;
  
  // Validar que los campos estén completos 
  if (!titulo){
    return alert('Por favor complete el campo: Nombre de la actividad');
  }
  else if(!descripcion){
    return alert('Por favor complete el campo: Descripción de la actividad')
  }
  else if(!imagen) {
    return alert('Por favor complete el campo: Link de la imagen')
  }
  nuevoRepositorio.createActivity(titulo, descripcion, imagen);
  actividadesAhtml();
  inputTitulo.value = '';
  inputDescripcion.value = '';
  inputImagen.value = '';
}

// Agregar el event listener al botón agregar actividad
const botonAgregarActividad = document.getElementById('BotonAgregarActividad');
botonAgregarActividad.addEventListener('click', agragarActividades);

// Función que se encargará de eliminar una tarjeta
function eliminarTarjeta(evento) {
  const id = evento.target.id.substr(-1);
  nuevoRepositorio.deleteActivity(id);
  actividadesAhtml();
}
