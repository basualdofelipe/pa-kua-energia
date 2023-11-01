import data from "../../assets/data/vias.json"

const elementos = data.elementos

export function elementoPorId(id) {
    const elementoEncontrado = elementos.find(elemento => elemento.id === id);
    return elementoEncontrado || null;
}