import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "../component/Navbar";
import Home from "../component/Home";
import About from "../component/About";
function App() {
  return (
    <>
   <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
    </Routes>
   </Router>
    </>
  );
}

export default App;
