// Devuelve un array con todas las fechas entre dos que le pidamos

export function diasEntreFechas(fechaInicio, fechaFin) {
    const dias = [];
    let fechaActual = new Date(fechaInicio);
  
    while (fechaActual <= fechaFin) {
        const fechaFormateada = fechaActual.toDateString();
        dias.push(fechaFormateada);
        fechaActual.setDate(fechaActual.getDate() + 1);
    }
  
    return dias;
}