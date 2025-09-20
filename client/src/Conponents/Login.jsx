import { useState } from 'react';
import '../css/Login.css';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Login = ({setRole}) => {

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  const handleSubmit = () => {
     axios.post('http://localhost:3001/auth/login', {username, password, role})
     .then(res => {
      if(res.data.login && res.data.role === 'admin'){
        setRole('admin')
        navigate('/dashboard')
      }else if(res.data.login && res.data.role === 'student'){
        setRole('student')
        navigate('/')
      }
     })
     .catch(err => console.log(err))
  }

  return (
    <div className='login-page'>
      <div className="login-container">
        <div className="login-header">
          <i className="fas fa-book-reader"></i>
          <h2>Welcome Back</h2>
        </div>
        
        <div className="login-form">
          <div className="form-group">
            <div className="input-with-icon">
              <i className="fas fa-envelope"></i>
              <input 
                type='username' 
                id='username' 
                placeholder='Enter Username'
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input 
                type='password' 
                id='password' 
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="select-with-icon">
              <i className="fas fa-user-tag"></i>
              <select name='role' id='role' onChange={(e) => setRole(e.target.value)}>
                <option value='admin'>Admin</option>
                <option value='student'>Student</option>
              </select>
            </div>
          </div>

          <div className="remember-me">
            <label className="checkbox-container">
              <input type="checkbox" defaultChecked />
              <span className="checkmark"></span>
              Remember me
            </label>
          </div>

          <button className='btn-login' onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login;