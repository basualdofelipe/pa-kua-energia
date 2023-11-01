//import { CalculoFecha } from "./CalculoFechas";
import { CalcFechas2 } from "./components/CalcFechas2";


function App() {

  
  return (
    <div>

      <CalcFechas2 hemisferio={1}>
        {Date()}
      </CalcFechas2>
    </div>
  );
}

export default App;