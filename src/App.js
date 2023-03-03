import './App.css';
import {Graph} from './components/Graph.tsx';
import ActiveSymbolsDropDown from './components/ActiveSymbolsDropDown.js';

function App() {
  return (
    <div className="App">
      <div className='app-title'>Deriv API Ticks Chart Demo</div>
      <ActiveSymbolsDropDown></ActiveSymbolsDropDown>
      <Graph></Graph>

    </div>
  );
}

export default App;
