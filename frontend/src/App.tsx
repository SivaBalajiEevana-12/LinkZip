import { useEffect } from 'react'

import './App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import {Route, Routes} from 'react-router-dom'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import LinkDetails from './pages/LinkDetails'
import NotFound from './pages/NotFound'
import CreateLink from './pages/CreateLink'
import Redirect from './pages/Redirect'
import Navbar from './pages/Navbar'
import { useDispatch } from "react-redux";

import type { AppDispatch } from "./stores/store";
import { getMe } from "./stores/authSlice";

function App() {
const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  

  return (<>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/link/:id" element={<LinkDetails />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/create" element={<CreateLink />} />
      <Route path="/r/:shortCode" element={<Redirect />} />

    </Routes>
        
   </>
  )
}

export default App
