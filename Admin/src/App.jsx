import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './Pages/Home';
import AnimePage from './Pages/AnimePage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import DbList from './Pages/DbList';
import Approval from './Pages/Approval ';

function App() {
  return (
    <div className='bg-black text-white'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/db-list" element={<DbList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/approval" element={<Approval />} />
        <Route path="/anime/:id" element={<AnimePage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App