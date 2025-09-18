import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Conponents/Navbar'
import Home from './Conponents/Home'
import Login from './Conponents/Login'
import Books from './Conponents/Books'
import Dashboard from './Conponents/dashboard'
import AddStudent from './Conponents/AddStudent'
function App() {
    return (
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/books" element={<Books/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/dashboard" element={<Dashboard/>}></Route>
                <Route path="/addstudent" element={<AddStudent/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

