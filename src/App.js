import "./App.css";
import Login from "./pages/login";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Toaster />
        <Login />
      </header>
    </div>
  );
}

export default App;
