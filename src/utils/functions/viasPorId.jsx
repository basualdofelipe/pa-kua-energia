import data from "../../assets/data/vias.json"

const vias = data.vias_de_energia

export function viasPorId(id) {
    const viaDeEnergia = vias.find(vias => vias.id === id);
    return viaDeEnergia || null;
}