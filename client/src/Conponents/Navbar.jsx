import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = ({role}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='navbar-left'>
          <Link to="/" className='navbar-brand'>
            <i className="fas fa-book-open"></i>
            Book Store
          </Link>
        </div>
        
        <div className={`navbar-right ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/books" className='navbar-link' onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-book"></i>
            Books
          </Link>

          {role === 'admin' && <>
          <Link to="/addbook" className='navbar-link' onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-plus-circle"></i>
            Add Books
          </Link>
          <Link to="/addstudent" className='navbar-link' onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-user-plus"></i>
            Add Student
          </Link>
          <Link to="/dashboard" className='navbar-link' onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-tachometer-alt"></i>
            Dashboard
          </Link>
          </>}
          {role === "" ? 
          <Link to="/login" className='navbar-link navbar-login' onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-user"></i>
            Login
          </Link>   : 
          <Link to="/logout" className='navbar-link navbar-login' onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-user"></i>
            Logout
          </Link>
          }

          
          
        </div>
        
        <div className='menu-toggle' onClick={toggleMenu}>
          <span className={isMenuOpen ? 'open' : ''}></span>
          <span className={isMenuOpen ? 'open' : ''}></span>
          <span className={isMenuOpen ? 'open' : ''}></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;