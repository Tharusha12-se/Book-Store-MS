import '../css/Home.css';

const Home = () => {
  return (
    <div className='hero'>
        <div className="hero-content">
            <h1 className='hero-text'>BookVerse</h1>
            <p className='hero-description'>
                Discover our curated collection of the most fascinating books. 
                You will definitely find what you are looking for in our vast library.
            </p>
            <div className="hero-buttons">
                <button className="btn-primary">Explore Books</button>
                <button className="btn-secondary">Join Now</button>
            </div>
        </div>
        <div className='hero-image'>
            <div className="book-stack">
                <div className="book book-1"></div>
                <div className="book book-2"></div>
                <div className="book book-3"></div>
                <div className="book book-4"></div>
            </div>
        </div>
    </div>
  )
}

export default Home;