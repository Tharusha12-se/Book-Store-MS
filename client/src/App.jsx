import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Conponents/Navbar'
import Home from './Conponents/Home'
import Login from './Conponents/Login'
import Books from './Conponents/Books'
function App() {
    return (
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/books" element={<Books/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

