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
      (actividad) => actividad.id !== id
    );
  }
}

const nuevoRepositorio = new Repository();
console.log(nuevoRepositorio.getAllAtivities());

nuevoRepositorio.createActivity(
  "dormir",
  "Proceso de cerrar los ojos para descanzar",
  "http://img"
);
console.log(nuevoRepositorio.getAllAtivities());

nuevoRepositorio.createActivity(
  "comer",
  "Ingerir alimentos para su postenrior digestion",
  "http://img2"
);
console.log(nuevoRepositorio.getAllAtivities());

nuevoRepositorio.createActivity(
  "Hacer ejercicio",
  "Realizar movimientos repetitivos con cargas de peso para tener buena salud",
  "http://img3"
);
console.log(nuevoRepositorio.getAllAtivities());

nuevoRepositorio.deleteActivity(1);
console.log(nuevoRepositorio.getAllAtivities());
