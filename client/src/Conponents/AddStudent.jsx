import '../css/Home.css'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddStudent = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    grade: '',
    roll: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/auth/add-student', {
        role: 'student',
        username: formData.username,
        password: formData.password,
        grade: formData.grade
      }, {
        withCredentials: true
      });

      if (response.data.registered) {
        console.log("Student registered successfully", response.data);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || 'Failed to register student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='student-form-container'>
      <form className='student-form' onSubmit={handleSubmit}>
        <h2>Add Student</h2>

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <div className='form-group'>
          <label htmlFor='roll'>Roll No :</label>
          <input 
            type='text' 
            id='roll' 
            name='roll' 
            value={formData.roll}
            onChange={handleChange}
            placeholder='Enter roll number'
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='username'>Username :</label>
          <input 
            type='text' 
            id='username' 
            name='username' 
            value={formData.username}
            onChange={handleChange}
            placeholder='Enter username'
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='grade'>Grade :</label>
          <input 
            type='text' 
            id='grade' 
            name='grade' 
            value={formData.grade}
            onChange={handleChange}
            placeholder='Enter grade'
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password :</label>
          <input 
            type='password' 
            id='password' 
            name='password' 
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter password'
            required
          />
        </div>

        <button type='submit' disabled={loading}>
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Registering...
            </>
          ) : (
            'Register Student'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddStudent;