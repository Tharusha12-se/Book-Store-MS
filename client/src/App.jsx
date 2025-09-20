import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Conponents/Navbar'
import Home from './Conponents/Home'
import Login from './Conponents/Login'
import Books from './Conponents/Books'
import Dashboard from './Conponents/dashboard'
import AddStudent from './Conponents/AddStudent'
import { useState } from 'react'
import Logout from './Conponents/Logout'
import { useEffect } from 'react';
import axios from 'axios'
import AddBook from './Conponents/AddBook'
import EditBook from './Conponents/EditBook'
function App() {
    const [role, setRole] = useState('')

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/auth/verify')
        .then(res => {

            if(res.data.login){
               setRole(res.data.role)
            }else{
                setRole('')
            }
            console.log(res)

        }).catch(err => console.log(err))
    }, [])

    return (
        <BrowserRouter>
        <Navbar role = {role}/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/books" element={<Books/>}></Route>
                <Route path="/login" element={<Login setRoleVar = {setRole} />}></Route>
                <Route path="/dashboard" element={<Dashboard/>}></Route>
                <Route path="/addstudent" element={<AddStudent/>}></Route>
                <Route path="/logout" element={<Logout setRole = {setRole} />}></Route>
                <Route path="/addbook" element={<AddBook/>}></Route>
                <Route path="/book/:id" element={<EditBook/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

