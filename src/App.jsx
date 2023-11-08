import { CalcFechas2 } from "./components/CalcFechas2";
import { GraficoEnergetico } from "./components/GraficoEnergetico";


function App() {

  
  return (
    <div>
      <GraficoEnergetico hemisferio={1}/>

      <CalcFechas2 hemisferio={1}>
        {Date()}
      </CalcFechas2>
      <CalcFechas2 hemisferio={1}>
        {new Date(2023, 2, 29)}
      </CalcFechas2>

    </div>
  );
}

export default App;