import data from "../../assets/data/vias.json"

// La siguiente función toma una fecha y el hemisferio y devuelve la fecha de inicio y fin de la estación y el elemento a la que corresponde

export function estacion(fecha, hemisferio){
    const estaciones = data.estacionesNS
    let proxAño = 0
    let antAño = 0
    const fechaFormat = new Date(fecha)
    let res = []

    Object.keys(estaciones).forEach(nombreEstacion => {

        let fechaInicio = 0
        let fechaFin = 0
        if(hemisferio == 0){
            fechaInicio = estaciones[nombreEstacion].norte.inicio
            fechaFin = estaciones[nombreEstacion].norte.fin
        } else {
            fechaInicio = estaciones[nombreEstacion].sur.inicio
            fechaFin = estaciones[nombreEstacion].sur.fin
        }

        if(fechaFormat.getMonth() == 11 && fechaInicio[1] == 12){
            proxAño = 1
        }
        if(fechaFormat.getMonth() <= 3 && fechaInicio[1] == 12){
            antAño = 1
        }

        const fechaInicioDate = new Date(fechaFormat.getFullYear()-antAño, fechaInicio[1]-1, fechaInicio[0])
        const fechaFinDate = new Date(fechaFormat.getFullYear()+proxAño, fechaFin[1]-1, fechaFin[0])
        proxAño = 0
        antAño = 0


        if(fechaInicioDate <= fechaFormat && fechaFormat <=fechaFinDate){
            res = [fechaInicioDate, fechaFinDate, estaciones[nombreEstacion].elemento_id]
        }

      });

      return res

}