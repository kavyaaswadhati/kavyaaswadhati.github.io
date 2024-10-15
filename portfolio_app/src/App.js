import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Notebook from './components/Notebook';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Notebook />
      </main>
    </div>
  );
}

export default App;
