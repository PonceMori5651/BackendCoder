class TicketManager{
    #precioBaseDeGanancia = 0.15
    constructor(){
        this.eventos = []
    }
    getEventos(){
        return this.eventos
    }
    agregarEvento(data){
        const newEvent = {
            id: this.eventos.length +1,
            participantes: [],
            nombre: data.nombre,
            lugar: data.lugar,
            precio: data.precio+(data.precio*this.#precioBaseDeGanancia),
            capacidad: data.capacidad ?? 50,
            fecha: data.fecha ? new Date(data.fecha) : new Date()
        }
        this.eventos.push(newEvent)
    }
    agregarUsuario(idEvent,idUser){
        const existEvent = this.eventos.find(el=>el.id===idEvent)
        if(!existEvent){
            console.error("ERROR: El evento ingresado no existe")
            return
        }
        const existUser = existEvent.participantes.findIndex(el=>el===idUser)
        if(existUser!==-1){
            console.error("ERROR: Este usuario ya ha sido registrado en este evento")
            return
        }
        existEvent.participantes.push(idUser)
    }
    ponerEventoEnGira(idEvent, newLocal, newDate){
        const existEvent = this.eventos.find(el=>el.id===idEvent)
        if(!existEvent){
            console.error("ERROR: El evento ingresado no existe")
            return
        }
        const {lugar,fecha,id,participantes,...camposQuedan}= existEvent
        const camposModify ={
            id: this.eventos.length+1,
            participantes:[],
            lugar: newLocal,
            fecha: new Date(newDate)
        }
        const newEvent = {...camposModify,...camposQuedan}
        this.eventos.push(newEvent)
    }
}

const manager = new TicketManager()

console.log(manager.getEventos())

const event1 = {
    nombre: "Saoco",
    lugar: "Ventanilla",
    precio: 20,
    capacidad:150,
    fecha:'2023-06-20'
}
const event2 = {
    nombre: "La rana",
    lugar: "Ventanilla",
    precio: 10,
    capacidad:58,
    fecha:'2023-06-10'
}
manager.agregarEvento(event1)
manager.agregarEvento(event2)
manager.agregarUsuario(2,4)
manager.agregarUsuario(2,8)
manager.ponerEventoEnGira(2,'Mega Plaza','2023-02-15')
console.log(manager.getEventos())