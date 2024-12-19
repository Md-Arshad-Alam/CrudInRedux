import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./component/CreateUser";
import Navbar from "./component/Navbar";
import Home from "./component/Home";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create/>} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
