import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, LinearScale, TimeScale, PointElement, LineController, defaults } from "chart.js/auto";
import 'chartjs-adapter-date-fns';
import {es, ja} from 'date-fns/locale';
import { format } from 'date-fns';
import {Line} from 'react-chartjs-2'
import { diasEntreFechas } from "../utils/functions/diasEntreFechas";
import { estacion } from "../utils/functions/estacion";
import { calculoSedTonCaniculaPorFecha } from "../utils/functions/calculoSedTonCaniculaPorFecha";

export function GraficoEnergetico({hemisferio}){
    
    const dataAño = diasEntreFechas(new Date(2023,0,1), new Date(2023, 11, 31))

    const arr = dataAño.map((dia) => {
        let res = estacion(dia, hemisferio)
        let [estacionKey, inicio, fin, elementoId, nombre] = res

        const fecha = new Date(dia);

        const datos = calculoSedTonCaniculaPorFecha(inicio, fin, elementoId, dia)
        
        datos.fecha = dia

        return(
           datos
        )
        
    })

    function crearElemento(label, elementoId, color, sentido, proyeccion) {
        return {
          label: label,
          data: arr.map((data) => {
            if(data.sedacion.elemento_id == elementoId){
                return data.sedacion.cant ? data.sedacion.cant*sentido : proyeccion
            } else if(data.tonificacion.elemento_id == elementoId){
                return data.tonificacion.cant ? data.tonificacion.cant*(-sentido) : proyeccion
            } else if(elementoId == 3){
                return data.canicula.cant <= 0 // por algún motivo da -0 qcy
                ? proyeccion 
                : data.canicula.tipo 
                ? data.canicula.cant*(-sentido) 
                : data.canicula.cant*sentido
            } else {
                return proyeccion
            }
        }),
          backgroundColor: color,
          borderColor: color,
          pointRadius: 1
        };
      }

    const [sentido, setSentido] = useState(1);
    const [proyeccion, setProyeccion] = useState(null);

    function cambiarProyeccion(proyeccion){
        return proyeccion == 0 ? null : 0
    }

    const maderaSed = crearElemento("Madera", 1, "#7dbd00", sentido, proyeccion)
    const fuegoSed = crearElemento("Fuego", 2, "#ff5b00", sentido, proyeccion)
    const tierraSed = crearElemento("Tierra", 3, "#dcf600", sentido, proyeccion)
    const metalSed = crearElemento("Metal", 4, "#000000", sentido, proyeccion)
    const aguaSed = crearElemento("Agua", 5, "#FFFFFF", sentido, proyeccion)

    console.log(Date().toLocaleLowerCase())

    return(
        <div>

        <Line style={{backgroundColor: "#E1E1E1"}}
            datasetIdKey='elemento_id'
            data={{
                labels: arr.map(data => new Date(data.fecha)),
                datasets: [
                    maderaSed, fuegoSed, tierraSed, metalSed, aguaSed
                ]
            }}
            options={{
                elements: {
                    line: {
                        tension: 0.4,
                    },
                },
                scales: {
                    x: {
                        date: { locale: es },
                        type: "time",
                        time: {
                            unit: 'month',
                            // displayFormats: {
                            //     month: 'MMMM YYYY', // 'MMMM' mostrará el nombre completo del mes
                            // }
                        },
                      }
                },
            }}
        />

        <button onClick={() => setSentido(-sentido)}>Sentido</button>
        <button onClick={() => setProyeccion(cambiarProyeccion(proyeccion))}>Proyeccion</button>

        </div>
    )
}