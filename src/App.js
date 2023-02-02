import "./App.css";
import { Routes } from "react-router";
import { Route, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <NavBar />
          {/* <Alert message="this is amazing"/> */}
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes> 
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
