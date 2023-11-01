import { proximaEstacionId } from "../utils/functions/proximaEstacionId";
import { diasEntreFechas } from "../utils/functions/diasEntreFechas"

export function Masajes({inicio, fin, elementoId, fecha}) {

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

    let sedacion  = 0
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

    if(diasTranscurridos <= 7){
        if(elementoId == 4) {cantCanicula = 80}  //CHEQUEAAAAAAAAAAAAAAAAAAAAAAAAR
        canicula = Math.ceil(40 - 20/7 * diasTranscurridos)
    } else if (diasTranscurridos >= totalDiasEstacion - 7){
        if(elementoId == 2) {cantCanicula = 80}  //CHEQUEAAAAAAAAAAAAAAAAAAAAAAAAR
        canicula = Math.ceil(40 - 20/7 * (totalDiasEstacion - diasTranscurridos + 1))
    }


    return(
        <>
            <h1>{new Date(fecha).toLocaleDateString()} Sedaciones</h1>
            <h1>{sedacion} Sedaciones</h1>
            <h1>{tonificacion} Tonificaciones</h1>
            <h1>{canicula} sed canicula</h1>
            <h1>{totalDiasEstacion}</h1>
        </>
    )

    
}