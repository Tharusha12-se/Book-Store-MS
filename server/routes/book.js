import express from 'express'
import { Book } from '../models/Book.js'
import { verifyAdmin } from './auth.js'

const router = express.Router()

router.post('/add', verifyAdmin, async (req, res) => {
    try{

        const {name, auther, imageUrl} = req.body;

        const newbook = new Book({
            name,
            auther,
            imageUrl 
        })
        await newbook.save()
        return res.json({aded: true})

    }catch(err){
        return res.json({message: "Error in adding book"})
    }
})

router.get('/books', async (req, res) => {
    try{
        const books = await Book.find()
        return res.json(books)
    }catch(err){
        return res.json(err)
    }
})

// router.get('/book/:id', async (req, res) => {
    
//     try{
//         const id = req.params.id;
//         const book = await Book.findById({_id: id})
//         return res.json(book)
//     }catch(err){
//         return res.json(err)
//     }
// })

// Get single book by ID
router.get('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        return res.json(book);
    } catch (err) {
        console.error("Get book error:", err);
        return res.status(500).json({ message: "Error fetching book" });
    }
});

// Update book by ID
router.put('/update/:id', verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const { name, author, imageUrl } = req.body;

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { name, author, imageUrl },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.json({ updated: true, book: updatedBook });

    } catch (err) {
        console.error("Update book error:", err);
        return res.status(500).json({ message: "Error updating book" });
    }
});

// Delete book by ID
router.delete('/delete/:id', verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.json({ deleted: true });

    } catch (err) {
        console.error("Delete book error:", err);
        return res.status(500).json({ message: "Error deleting book" });
    }
});

export {router as bookRouter}

