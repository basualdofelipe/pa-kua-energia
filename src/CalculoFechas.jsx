import data from "./assets/data/vias.json"

// necesito una función que me permita saber cuántas tonificaciones y/o sedaciónes y de qué elemento hay que hacer en el día de la fecha


export function CalculoFechas() {
    
  console.log(data.estaciones.invierno)

    masajes(Date(2023, 11, 25))
    // fecha inicio y fin de la estación
    const fechaInicio = new Date(2023, 8, 24)
    const fechaFin = new Date(2023, 11, 22)
    // calcula en milisegundos el tiempo entre las fechas, lo que dura la estación
    const tiempoEntreFechas = fechaFin.getTime() - fechaInicio.getTime();
    // Calcula el día en el cuál está a la mitad de la estación actual y luego lo pasa a fecha
    const tiempoMedio = fechaInicio.getTime() + tiempoEntreFechas / 2;
    const fechaMedia = new Date(tiempoMedio)

    // toma el tiempo entre las fechas y lo pasa a formato de cant de días
    const cantDiasEntreFechas = tiempoEntreFechas / (24 * 60 * 60 * 1000)
    // toma el anterior y lo divide en dos, da la cantidad de días en llegar a la fecha del medio
    const primerMitad = tiempoEntreFechas / (24 * 60 * 60 * 1000) / 2
    // calcula la cantidad diaria de aumento o decremento de masajes
    const cantDiariaMasaje = 40 / primerMitad

    const masajeHoyPrimeraParte = Math.ceil(cantDiariaMasaje * 44 + 40)
    const masajeHoySegundaParte = Math.ceil( 80 - cantDiariaMasaje * 89 + 40 )


    const arr = {}
          
      // Obtén el nuevo array con los días entre las fechas
      const diasEntreFechas = obtenerDiasEntreFechas(fechaInicio, fechaFin);
    
    return (
        <>
            <h1>{Date()}</h1>
            <h1>{fechaMedia.toDateString()}</h1>
            <h1>{cantDiasEntreFechas}</h1>
            <h1>{primerMitad}</h1>
            <h1>{cantDiariaMasaje * 8 + 40}</h1>
            <h1>{masajeHoyPrimeraParte}</h1>
            <h1>{masajeHoySegundaParte}</h1>
        </>
    );
  }