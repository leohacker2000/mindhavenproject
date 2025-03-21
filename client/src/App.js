import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Startmain from "./pages/startpage/Startmain";
import Mentaltest from "./pages/mentaltest/Mentaltest";
import VideosPage from './pages/videoPage/VideoPage';
import  Aboutus from "./pages/aboutus/Aboutus";

import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register/>} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login /> } />
        <Route path="/register" element={user ?  <Navigate to="/" /> : <Register /> } />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/startpage" element={<Startmain />} />
        <Route path="/mentaltest" element={<Mentaltest />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/aboutus" element={<Aboutus />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;