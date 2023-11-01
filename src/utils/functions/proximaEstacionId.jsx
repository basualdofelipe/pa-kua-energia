export function proximaEstacionId(id){
    const ciclo = [1, 2, 4, 5]

    const indice = ciclo.indexOf(id);
    if (indice !== -1) {
        const siguienteIndice = (indice + 1) % ciclo.length;
        return ciclo[siguienteIndice];
    } else {
        return null;
    }

}