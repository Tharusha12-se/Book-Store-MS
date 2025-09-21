import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import BookCard from "./BookCard"
import "../css/Books.css"

const Books = ({role}) => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:3001/book/books')
    .then(res => {
      setBooks(res.data)
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setError("Failed to load books. Please try again later.")
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="book-list loading">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="book-list">
        <div className="error-state">
          <i className="fas fa-exclamation-triangle" style={{fontSize: '3rem', marginBottom: '1rem'}}></i>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="book-list">
      {books.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-book-open" style={{fontSize: '3rem', marginBottom: '1rem'}}></i>
          <p>No books available in our library</p>
        </div>
      ) : (
        books.map((book, index) => (
          <BookCard 
            key={book._id || book.id} 
            book={book} 
            className={index < 3 ? "featured" : ""}
            role = {role}
          />
        ))
      )}
    </div>
  )
}

export default Books