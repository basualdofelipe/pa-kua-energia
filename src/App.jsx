import { CalcFechas2 } from "./components/CalcFechas2";


function App() {

  
  return (
    <div>

      <CalcFechas2 hemisferio={1}>
        {Date()}
      </CalcFechas2>
      <CalcFechas2 hemisferio={1}>
        {new Date(2023, 2, 20)}
      </CalcFechas2>
    </div>
  );
}

export default App;