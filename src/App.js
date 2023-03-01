import './App.css';
import Graph from './components/Graph.tsx';
import ActiveSymbolsDropDown from './components/ActiveSymbolsDropDown.js';

function App() {
  return (
    <div className="App">
      <ActiveSymbolsDropDown></ActiveSymbolsDropDown>
      <Graph></Graph>
    </div>
  );
}

export default App;
