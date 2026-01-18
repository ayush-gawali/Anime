import React from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from "./pages/Catalog";
import AnimePage from './pages/AnimePage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ContextProvider from './store/context';
import ProtectedRoute from "./components/ProtectedRoute";
import { Analytics } from '@vercel/analytics/react';
import CollectionsPage from './pages/Collection';

function App() {
  return (
    <>
      <ContextProvider>
        <div className='bg-black text-white'>
          <Navbar />
          <Routes>

            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/anime/:id" element={<AnimePage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<h1 className='text-center mt-20'>404 Not Found</h1>} />

            <Route path="/collection" element={<CollectionsPage />} />

          </Routes>
          <Footer />

        </div>
      </ContextProvider>
      {import.meta.env.PROD && <Analytics />}
    </>

  )
}

export default App