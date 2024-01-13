import React from "react";
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./Login";
import Weather from "./Weather";


function Routing() {
  return (
       <BrowserRouter>
          <Routes>
             <Route path="/login" element={<Login/>} ></Route>
             <Route path="/weather" element={<Weather/>}></Route>
          </Routes>
       </BrowserRouter>
    )
}

export default Routing