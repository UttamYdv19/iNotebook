import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "../component/Navbar";
import Home from "../component/Home";
import About from "../component/About";
import NoteState from "../context/notes/NoteState"
import Alert from "../component/Alert";
import Login from "../component/Login";
import SignUp from "../component/SignUp";
function App() {
  return (
    <>
    <NoteState>
   <Router>
    <Navbar/>
    <Alert massage={"Wellcome , Its a iNotebook!"}/>
    <div className="container">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    </div>
   </Router>
   </NoteState>
    </>
  );
}

export default App;
