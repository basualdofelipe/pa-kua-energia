import { CalcFechas } from "./components/CalcFechas";
import { GraficoEnergetico } from "./components/GraficoEnergetico";
import "./App.scss"


function App() {

  
  return (
    <div>
      {/* <GraficoEnergetico hemisferio={1}/> */}

      <CalcFechas hemisferio={1}>
        {new Date(2023, 2, 8)}
      </CalcFechas>

    </div>
  );
}

export default App;