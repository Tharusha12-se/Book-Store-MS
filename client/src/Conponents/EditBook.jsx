import '../css/Home.css' 
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {
  const [bookData, setBookData] = useState({
    name: '',
    author: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch book data using GET request
    axios.get(`http://localhost:3001/book/book/${id}`)
     .then(res => {
        console.log("Book data:", res.data);
        setBookData({
          name: res.data.name || '',
          author: res.data.auther || '', // Fixed spelling: auther -> author
          imageUrl: res.data.imageUrl || ''
        });
     })
     .catch(err => {
        console.log("Error fetching book:", err);
        setError('Failed to load book data');
     });
  }, [id]); // Added id as dependency

  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Use PUT request for updating (standard REST practice)
    axios.put(`http://localhost:3001/book/update/${id}`, bookData)
     .then(res => {
        if(res.data.updated){
          alert("Book updated successfully!");
          navigate('/books');
        }
     })
     .catch(err => {
        console.log("Update error:", err);
        setError('Failed to update book');
     })
     .finally(() => {
        setLoading(false);
     });
  }

  return (
    <div className='student-form-container'>
        <form className='student-form' onSubmit={handleSubmit}>
            <h2>Edit Book</h2>

            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            <div className='form-group'>
                <label htmlFor='name'>Book Name:</label>
                <input 
                  type='text' 
                  id='name' 
                  name='name' 
                  value={bookData.name}
                  onChange={handleChange}
                  required
                />
            </div>

            <div className='form-group'>
                <label htmlFor='author'>Author Name:</label>
                <input 
                  type='text' 
                  id='author' 
                  name='author' 
                  value={bookData.author}
                  onChange={handleChange}
                  required
                />
            </div>

            <div className='form-group'>
                <label htmlFor='imageUrl'>Image URL:</label>
                <input 
                  type='text' 
                  id='imageUrl' 
                  name='imageUrl' 
                  value={bookData.imageUrl}
                  onChange={handleChange}
                  required
                />
            </div>

            <button type='submit' disabled={loading}>
              {loading ? 'Updating...' : 'Update Book'}
            </button>

        </form>
    </div>
  )
}

export default EditBook;