import { viasPorElementoId } from "../utils/functions/viasPorElementoId";

export function Vias({children}){
    const viasYin = viasPorElementoId(children).yin
    const viasYang = viasPorElementoId(children).yang

    return (
        <div>
            <h2>Vías</h2>
            {viasYin.map((e, index) => (
                <p key={index}>{e.via}</p>
            ))}
            {viasYang.map((e, index) => (
                <p key={index}>{e.via}</p>
            ))}
        </div>
    );

}