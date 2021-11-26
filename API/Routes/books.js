const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");

// Add a new BOOK ------------------------------------------------------------------------

router.post("/new", async (req, res )=>{
    try{
        const newBook = new Book({
            bookName : req.body.bookName,
            author : req.body.author,
            isbn: req.body.isbn
        });

            // save new book and return res

        const book = await newBook.save();
        res.status(200).json(book);
    }catch(err){
        res.status(500).json(err);
    }
})

// update a book--------------------------------------------------------------------

router.put("/:id", async (req, res)=>{
    if(req.body.isAdmin){
        try{

            const book = await Book.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            });
            res.status(200).json(book);
        }catch(err){
            res.status(500).json(err);
        }

    }
    else{
        return res.status(404).json("Book not found!")
    }
});


// delete book---------------------------------------------------------------

router.delete("/:id", async (req, res) =>{
        try{
            
            const book = await Book.findByIdAndDelete(req.params.id);
            res.status(200).json("Book has been deleted successfully!!!");
        }catch(err){
            res.status(500).json(err);
        }
});

// get a book ----------------------------------------------------------------------

router.get("/", async (req, res) =>{
    const bookId = req.query.bookId;
    const bookName = req.query.bookName;
    
    try{

        const book = bookId
        ? await Book.findById(bookId)
        : await Book.findOne({bookName : bookName});

        res.status(200).json(book);

    }catch(err){

        res.status(500).json(err);

    }
});

// get all the books

router.get("/getbooks", async (req, res)=>{
    try{
        const book = await Book.find({});
        res.status(200).json(book);
    }catch(err){
        res.status(500).json(err);
    }
})


// get available books 

router.get("/available_books", async (req, res)=>{
    try{
        const book = await Book.find({isIssued: false});

        res.status(200).json(book);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;