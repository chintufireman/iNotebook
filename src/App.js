import "./App.css";
import { Routes } from "react-router";
import { Route, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
