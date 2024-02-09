
import {BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Serch from "./Routes/Serch";
import Header from "./Routes/Components/Header";


function App() {

    return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/tv" element={<Tv />}/>
          <Route path="/serch" element={<Serch />}/>
        </Routes>
      </Router>

    );
  
  
  }
  
  
export default App;
