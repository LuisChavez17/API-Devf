

class Personaje {
    constructor(displayName, fullPortraitV2, isPlayableCharacter, voiceLine, background) {
      this.displayName = displayName;
      this.fullPortraitV2 = fullPortraitV2;
      this.isPlayableCharacter = isPlayableCharacter;
      this.voiceLine = voiceLine;
      this.background = background;
    }
  
    getName() {
      return this.displayName;
    }
  
    getImage() {
      return this.fullPortraitV2;
    }

    existe(){
      return this.isPlayableCharacter;
    }

    getAudio(){
      return this.voiceLine.mediaList[0].wave;
    }

    getbackground(){
      return this.background;
    }
  }
  
  let personajes = [];
  let elemento = document.getElementById("personajes-wrapper");

  const inputBuscador = document.getElementById("buscador")
  inputBuscador.addEventListener("onkeyup", llamarBusqueda)

function buildCharacterCard(fondo, nombre, foto, audio) {
  return `
  <div class="column col-12 col-sm-12 col-md-6 col-lg-4">
      <div class="card" style="background:url(${fondo}) center; background-size: 370px 370px; background-repeat: no-repeat;">
        <h3 class="tpersonaje">${nombre}</h3>
        <p>
          <img src="${foto}" height="400" width="400" />
        </p>
        <h5>Hear a ${nombre}´s phrase</h5>
        <audio src="${audio}" controls type="audio/wav"></audio>
      </div>
    </div>
  `
}
  
  async function getPersonajes () {
    let url = "https://valorant-api.com/v1/agents";
    
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  
    data.data.forEach(datum => {
      if (datum.isPlayableCharacter == true) {
      let nuevoPersonaje = new Personaje(datum.displayName, datum.fullPortraitV2, datum.isPlayableCharacter, datum.voiceLine, datum.background);
      personajes.push(nuevoPersonaje);
      //console.log(datum); 
  }});
  
    personajes.forEach((personaje) => {
      
      elemento.innerHTML += buildCharacterCard(
        personaje.getbackground(),
        personaje.getName(),
        personaje.getImage(),
        personaje.getAudio()
      )
    })
  }
  
  function reiniciarData() {
    personajes.length = 0;
    elemento.innerHTML = null;
    getPersonajes();
  }
  
  function llamarBusqueda() {
    setTimeout(() => {
      const consulta = inputBuscador.value;
      const personajesFiltrados = personajes.filter(personaje => personaje.displayName.toLowerCase().includes(consulta.toLowerCase()))
    
      if (personajesFiltrados.length > 0) {
        elemento.innerHTML = null
        personajesFiltrados.forEach((personajeFiltrado) => {
          elemento.innerHTML += buildCharacterCard(
            personajeFiltrado.getbackground(),
            personajeFiltrado.getName(),
            personajeFiltrado.getImage(),
            personajeFiltrado.getAudio()
          )
        })
      }
    }, 300);
  }
  

  function ordenarPersonajes() {
    const selector = document.getElementById("sort").value
  
    if (selector === 'none') {
      reiniciarData();
      return null
    }
  
    const personajesOrdenados = personajes.sort((a,b) => {
      let personajeA = a.displayName.toLowerCase()
      let personajeB = b.displayName.toLowerCase()
  
      if (selector === 'menor') {
        if (personajeA < personajeB) {
          return -1
        }
      } else if (selector === 'mayor') {
        if (personajeA > personajeB) {
          return -1
        }
      } else {
        return 0;
      }
    })
  
    if (personajesOrdenados.length > 0) {
      elemento.innerHTML = null
      personajesOrdenados.forEach((personajeOrdenado) => {
        elemento.innerHTML += buildCharacterCard(
          personajeOrdenado.getbackground(),
          personajeOrdenado.getName(),
          personajeOrdenado.getImage(),
          personajeOrdenado.getAudio()
        )
      })
    }
  }

  getPersonajes();