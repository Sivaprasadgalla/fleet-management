import React from "react";
import FrontPage from "./pages/FrontPage";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Regsiter";

const App = () => {
  return (

    <div>
      
      <Routes>
        <Route path='/' element={<FrontPage />}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>

      </Routes>
    </div>
  );
};

export default App;
