//Import styles
import "../styles/App.css";

//Import Components
import Login from "./Login";
import Routes from "./Routes";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return <div className="App">{code ? <Routes code={code} /> : <Login />}</div>;
}

export default App;
