import { proximaEstacionId } from "./proximaEstacionId";
import { diasEntreFechas } from "./diasEntreFechas"

export function calculoSedTonCaniculaPorFecha(inicio, fin, elementoId, fecha) {

    //tengo que hacer 2 masajes, tonificación y sedación
    // tonif es la de la estación y sedación la de la siguiente yyyyy tener en cuénta canícula
    

    const tiempoEntreFechas = fin.getTime() - inicio.getTime();
    const totalDiasEstacion = tiempoEntreFechas / (24 * 60 * 60 * 1000)
    // Calcula el día en el cuál está a la mitad de la estación actual y luego lo pasa a fecha
    const tiempoMedio = inicio.getTime() + tiempoEntreFechas / 2;
    const fechaMedia = new Date(tiempoMedio)

    // toma el anterior y lo divide en dos, da la cantidad de días en llegar a la fecha del medio
    const primerMitad = tiempoEntreFechas / (24 * 60 * 60 * 1000) / 2
    // calcula la cantidad diaria de aumento o decremento de masajes
    const cantDiariaMasaje = 40 / primerMitad

    const diasTranscurridos = diasEntreFechas(inicio, fecha).length

    // TODO AGREGAR A LA CANÍCULA EN CASO DE SER ENTRE FUEGO Y METAL AUMENTA 40
    // RESOLVER 

    let sedacion  = null
    if (new Date(fecha) <= fechaMedia ){
        sedacion = Math.floor(cantDiariaMasaje * diasTranscurridos + 40)
    } else {
        sedacion = Math.ceil( 120 - cantDiariaMasaje * diasTranscurridos)
    }

    let tonificacion = null
    if(new Date(fecha) >= fechaMedia){
        tonificacion = Math.ceil(80 - cantDiariaMasaje * diasTranscurridos)
    }

    let canicula = null
    let cantCanicula = 40
    let tipoMasajeCanicula = 0 // 0-Sedación, 1-Tonificaicón
    
    if(diasTranscurridos <= 8){
        if(elementoId == 4) {cantCanicula = 80}
        canicula = Math.ceil(cantCanicula - cantCanicula/2/7 * (diasTranscurridos - 1))
    } else if (diasTranscurridos >= totalDiasEstacion - 6){
        if(elementoId == 2) {cantCanicula = 80}
        canicula = Math.ceil(cantCanicula - cantCanicula/2/7 * (totalDiasEstacion - diasTranscurridos + 1))
    }
    
    if(elementoId == 2){
        if(diasTranscurridos >= totalDiasEstacion - 14 && diasTranscurridos <= totalDiasEstacion - 7){
            tipoMasajeCanicula = 1
            canicula = Math.ceil(cantCanicula/7 * (totalDiasEstacion - diasTranscurridos - 7))
        }
    }

    return(
            {
                sedacion: {
                    elemento_id: elementoId,
                    cant: sedacion
                },
                tonificacion: {
                    elemento_id: proximaEstacionId(elementoId),
                    cant: tonificacion
                },
                canicula: {
                    elemento_id: 3,
                    cant: canicula,
                    tipo: tipoMasajeCanicula //si es sedación o tonificación
                },

            }
    )
}