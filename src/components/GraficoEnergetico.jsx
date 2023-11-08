import { Chart as ChartJS, defaults } from "chart.js/auto";
import {Line} from 'react-chartjs-2'
import { diasEntreFechas } from "../utils/functions/diasEntreFechas";
import { estacion } from "../utils/functions/estacion";
import { calculoSedTonCaniculaPorFecha } from "../utils/functions/calculoSedTonCaniculaPorFecha";

export function GraficoEnergetico({hemisferio}){
    
    const dataAño = diasEntreFechas(new Date(2023,0,1), new Date(2023, 11, 31))
    console.log(dataAño)

    const arr = dataAño.map((dia) => {
        let res = estacion(dia, hemisferio)
        let [estacionKey, inicio, fin, elementoId, nombre] = res

        const datos = calculoSedTonCaniculaPorFecha(inicio, fin, elementoId, dia)
        

        return(
            {
                fecha: dia,
                elemento_id: datos.sedacion.elemento_id,
                sedaciones:datos.sedacion.cant
            }
        )
        
    })

    function crearElemento(label, elementoId, color) {
        return {
          label: label,
          data: arr.map((data) => {
            return data.elemento_id == elementoId ? data.sedaciones : null
        }),
          backgroundColor: color,
          borderColor: color,
        };
      }

    const maderaSed = crearElemento("Madera", 1, "#7dbd00")
    const fuegoSed = crearElemento("Fuego", 2, "#ff5b00")
    const tierraSed = crearElemento("Tierra", 3, "#dcf600")
    const metalSed = crearElemento("Metal", 4, "#000000")
    const aguaSed = crearElemento("Agua", 5, "#FFFFFF")


    return(
        <div>

        <Line style={{backgroundColor: "#E1E1E1"}}
            datasetIdKey='elemento_id'
            data={{
                labels: arr.map(data => data.fecha),
                datasets: [
                    maderaSed, fuegoSed, tierraSed, metalSed, aguaSed
                ]
            }}
            options={{
                elements: {
                    line: {
                        tension: 0.4,
                    }
                },
                plugins: {
                    customCanvasBackgroundColor: {
                        color: '#7dbd00'
                      }
                }
            }}
        />

        <Line
            datasetIdKey='id'
            data={{
                labels: ['Jun', 'Jul', 'Aug'],
                datasets: [
                {
                    id: 1,
                    label: 'uno',
                    data: [5, 6, 7],
                },
                {
                    id: 2,
                    label: 'dos',
                    data: [1, 2, 4],
                },
                {
                    id: 3,
                    label: 'tres',
                    data: [3, 5, 1],
                },
                {
                    id: 4,
                    label: 'cuatro',
                    data: [1, 9, 7],
                },
                {
                    id: 5,
                    label: 'cinco',
                    data: [3, 2, 1],
                },
                ],
            }}
        />

        </div>
    )
}