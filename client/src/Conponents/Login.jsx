import '../css/Login.css';
const Login = () => {
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
                type='email' 
                id='email' 
                placeholder='admin@gmail.com'
                defaultValue="admin@gmail.com"
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
              />
            </div>
          </div>

          <div className="form-group">
            <div className="select-with-icon">
              <i className="fas fa-user-tag"></i>
              <select name='role' id='role'>
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

          <button className='btn-login'>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login;