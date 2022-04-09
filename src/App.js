import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import './App.css';
import {Mint} from "./components/mint";
import {Doc} from "./components/doc";
import {Vote} from "./components/vote";

function App() {
  return (
    <div className="App">
      <h1>doc dao</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/"           element={<Mint />} />
          <Route path="/doc/:doc"   element={<Doc />} />
          <Route path="/vote/:doc"  element={<Vote />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
