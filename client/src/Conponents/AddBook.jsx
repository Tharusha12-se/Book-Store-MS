import '../css/Home.css' 
import { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AddBook = () => {

  const [name, setName] = useState('')
  const [auther, setAuther] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const navigate = useNavigate()

    const handleSubmit = (e) => {
     e.preventDefault()
     axios.post('http://localhost:3001/book/add', {name, auther, imageUrl})
     .then(res => {
          if(res.data.aded){
            alert("Book Aded..")
            navigate('/books')
          }
          console.log(res)      
     })
     .catch(err => console.log(err))
  }

  return (
    <div className='student-form-container'>
        <form className='student-form' onSubmit={handleSubmit}>
            <h2>Add Book </h2>

            <div className='form-group'>
                <label htmlFor='book'>Book Name :</label>
                <input type='text' id='book' name='book' 
                onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className='form-group'>
                <label htmlFor='auther'>Auther Name :</label>
                <input type='text' id='auther' name='auther' 
                onChange={(e) => setAuther(e.target.value)}/>
            </div>

            <div className='form-group'>
                <label htmlFor='image'>Image URL :</label>
                <input type='text' id='image' name='image' 
                onChange={(e) => setImageUrl(e.target.value)}/>
            </div>


            <button type='submit'>Add Book</button>

        </form>
    </div>
  )
}

export default AddBook