import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "../css/Books.css"

const DeleteBook = ({ setRole }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showConfirm, setShowConfirm] = useState(true)
    const [bookInfo, setBookInfo] = useState(null)

    // Fetch book info first to show what's being deleted
    useEffect(() => {
        const fetchBookInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/book/book/${id}`)
                setBookInfo(response.data)
            } catch (err) {
                console.error('Error fetching book info:', err)
                setError('Failed to load book information')
            }
        }

        fetchBookInfo()
    }, [id])

    const handleDelete = async () => {
        setLoading(true)
        setError('')
        
        try {
            const response = await axios.delete(`http://localhost:3001/book/delete/${id}`, {
                withCredentials: true
            })
            
            if (response.data.deleted) {
                alert('Book deleted successfully!')
                navigate('/books')
            }
        } catch (err) {
            console.error('Delete error:', err)
            if (err.response?.status === 401) {
                setError('You need to be logged in as admin to delete books')
                setTimeout(() => {
                    setRole('')
                    navigate('/login')
                }, 2000)
            } else {
                setError('Failed to delete book. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        navigate('/books')
    }

    if (!showConfirm) {
        return (
            <div className="delete-book-container">
                <div className="delete-content">
                    {loading ? (
                        <>
                            <i className="fas fa-spinner fa-spin"></i>
                            <h2>Deleting Book...</h2>
                        </>
                    ) : error ? (
                        <>
                            <i className="fas fa-exclamation-triangle"></i>
                            <h2>Error</h2>
                            <p>{error}</p>
                            <button onClick={handleCancel} className="btn-primary">
                                Back to Books
                            </button>
                        </>
                    ) : null}
                </div>
            </div>
        )
    }

    return (
        <div className="delete-book-container">
            <div className="delete-confirm-modal">
                <div className="modal-header">
                    <i className="fas fa-exclamation-triangle"></i>
                    <h2>Confirm Deletion</h2>
                </div>
                
                <div className="modal-body">
                    {bookInfo ? (
                        <>
                            <p>Are you sure you want to delete this book?</p>
                            <div className="book-preview">
                                <h3>{bookInfo.name}</h3>
                                <p>by {bookInfo.author}</p>
                                {bookInfo.imageUrl && (
                                    <img src={bookInfo.imageUrl} alt={bookInfo.name} className="preview-image" />
                                )}
                            </div>
                            <p className="warning-text">
                                <i className="fas fa-warning"></i>
                                This action cannot be undone.
                            </p>
                        </>
                    ) : (
                        <p>Loading book information...</p>
                    )}
                </div>

                <div className="modal-actions">
                    <button 
                        onClick={handleCancel} 
                        className="btn-cancel"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleDelete} 
                        className="btn-delete"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i>
                                Deleting...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-trash"></i>
                                Delete
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteBook