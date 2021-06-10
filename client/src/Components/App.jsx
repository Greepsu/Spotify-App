import '../styles/App.css';
import Dashboard from './Dashboard';
import Login from './Login';

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return (
    <div className="App">
      {code ? <Dashboard code={code} /> : <Login />}
    </div>
  );
}

export default App;
