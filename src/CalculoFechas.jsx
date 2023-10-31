import data from "./assets/data/vias.json"

// necesito una función que me permita saber cuántas tonificaciones y/o sedaciónes y de qué elemento hay que hacer en el día de la fecha

// necesito tener la fecha de hoy (puede ser child en app)
// en qué estación estoy
// cuántos días estoy desde que empezó la estación


function obtenerDiasEntreFechas(fechaInicio, fechaFin) {
    const dias = [];
    let fechaActual = new Date(fechaInicio);
  
    while (fechaActual <= fechaFin) {
      dias.push(new Date(fechaActual));
      fechaActual.setDate(fechaActual.getDate() + 1);
    }
  
    return dias;
}

function masajes(fecha) {

    const fechaFormat = new Date(fecha)
    const estaciones = data.estaciones
    let proxAño = 0
    
    if (fechaFormat.getMonth() === 11) {
        proxAño += 1;
      }

    Object.keys(estaciones).forEach(estacion => {
        const fechaInicio = new Date(
            new Date().getFullYear(), // Año actual
            estaciones[estacion].fechaInicio.mes - 1, // Mes
            estaciones[estacion].fechaInicio.dia // Día
        );

           //si estamos en verano a principios de diciembre agrega un año más a la fecha fin
        const fechaFin = new Date(

            new Date().getFullYear()+proxAño, // Año actual +1 si estamos en diciembre
            estaciones[estacion].fechaFin.mes - 1, // Mes
            estaciones[estacion].fechaFin.dia // Día
        );

        if (fechaInicio <= fechaFormat && fechaFormat <=fechaFin){
            // console.log(`Estación: ${estacion}`);
            // console.log(`Fecha de inicio: ${fechaInicio.toDateString()}`);
            // console.log(`Fecha de fin: ${fechaFin.toDateString()}`);
            // console.log("---");
        }
      
      });
      
}

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