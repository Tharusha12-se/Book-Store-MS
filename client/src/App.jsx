import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Conponents/Navbar'
import Home from './Conponents/Home'
import Login from './Conponents/Login'
import Books from './Conponents/Books'
import Dashboard from './Conponents/dashboard'
import AddStudent from './Conponents/AddStudent'
import { useState } from 'react'
import Logout from './Conponents/Logout'
function App() {
    const [role, setRole] = useState('')
    return (
        <BrowserRouter>
        <Navbar role = {role}/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/books" element={<Books/>}></Route>
                <Route path="/login" element={<Login setRole = {setRole} />}></Route>
                <Route path="/dashboard" element={<Dashboard/>}></Route>
                <Route path="/addstudent" element={<AddStudent/>}></Route>
                <Route path="/logout" element={<Logout setRole = {setRole} />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

