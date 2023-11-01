import data from "../../assets/data/vias.json"

const elementos = data.elementos

export function elementoPorId(id) {
    const elementoEncontrado = elementos.find(elemento => elemento.id === id);
    return elementoEncontrado || null; // Retorna el elemento si se encuentra, o null si no se encuentra.
}