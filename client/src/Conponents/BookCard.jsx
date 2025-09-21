import {Link} from 'react-router-dom'
const BookCard = ({ book, className = "" ,role }) => {
    const { name, auther, imageUrl } = book;

   

    return (
        <div className={`book-card ${className}`}>
            <div className="book-image-container">
                <img src={imageUrl} alt={name} className='book-image' />
                <div className="book-overlay"></div>
                
            </div>
            
            <div className="book-details">
                <h3 className="book-title">{name}</h3>
                <p className="book-author">{auther}</p>
                
            </div>

            {
                role === "admin" &&

                 <div className="book-action">
                <button>
                    <i className="fas fa-edit"></i> 
                    <Link to={`/book/${book._id}`}> EDIT</Link>
                </button>
                <button >
                    <i className="fas fa-trash"></i> 
                    <Link to={`/delete-book/${book._id}`} > DELETE</Link>
                </button>
            </div>

            }

           
        </div>
    )
}

export default BookCard