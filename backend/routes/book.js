const router = require('express').Router()
const Book = require("../models/book")
const User = require("../models/user")
const Author = require("../models/author")
const { authenticateToken } = require("./userAuth")
const Fuse = require('fuse.js');
const natural = require("natural");
const cosineSimilarity = require("compute-cosine-similarity");


router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        // Check if the user is an admin
        if (user.role !== "admin") {
            return res
                .status(403)
                .json({ message: "Access Denied" });
        }
        // Create a new book instance
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            publication: req.body.publication,
            price: req.body.price,
            pages: req.body.pages,
            desc: req.body.desc,
            lang: req.body.lang,
            genre: req.body.genre,
            rating: req.body.rating
        });
        // Save the book to get its ID
        // Find the author by name and push the book's ObjectId to their list of books
        const author = await Author.findOneAndUpdate(
            { name: req.body.author }, // Look up the author by name
            { $push: { books: book._id } }, // Add the book's ObjectId to their list
            { new: true }
        );
        // Check if the author was found
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }
        else{
          await book.save();
        res.status(200).json({ message: "Book added successfully" });
      }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log(error);
    }
});

router.put("/update-book", authenticateToken, async (req,res) => {
    try{
        const { bookid } =  req.headers;
        await Book.findByIdAndUpdate(bookid, { 
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            publication: req.body.publication,
            price: req.body.price,
            pages: req.body.pages,
            desc: req.body.desc,
            lang: req.body.lang,
            genre: req.body.genre,
            rating: req.body.rating
        })
        
        return res.status(200).json({ message: "Book Updated successfully" })
    } catch{
        res.status(500).json({ message: "Internal server error" })
    }
});

router.delete("/delete-book", authenticateToken, async (req,res) => {
    try{
        const { bookid } =  req.headers
        await Book.findByIdAndDelete(bookid)
        return res.status(200).json({ message: "Book Deleted successfully" })
    } catch(error){
        res.status(500).json({ message: "Internal server error" })
    }
});

router.post('/book-click', authenticateToken, async (req, res) => {
  const { bookid } = req.headers;
  //console.log({bookid})
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookid,
      { $inc: { clickCount: 1 } },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    console.log('Click tracked');
    res.status(200).json({ message: 'Click tracked successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
function addDocumentAndGetVector(text) {
 	const tfidfModel.addDocument(text);
 	const termWeights = tfidfModel.listTerms(tfidfModel.documents.length - 1).reduce((acc, cur) => {
 	acc[cur.term] = cur.tfidf;
 	return acc;
 }, {});
 return tfidfModel.vocabulary.map(term => termWeights[term] || 0);
}
router.get("/recommend-content-enhanced", authenticateToken, async (req, res) => {
 try {
 if (!tfidfModel) {
 await initializeTfidfModel();
 }

 const {id} = req.headers;
 const user = await User.findById(id).populate("favourites");
 
 if (!user || user.favourites.length === 0) {
 return res.json([]);
 }

 // Get reference book and validate it exists in our corpus
 const referenceBook = user.favourites[user.favourites.length - 1];
 const referenceText = referenceBook.desc;

 // Try to find the reference book in our pre-built book list
 const referenceBookIndex = tfidfModel.books.findIndex(book => 
 book._id.toString() === referenceBook._id.toString()
 );

 if (referenceBookIndex === -1) {
 // Reference book not found in corpus, return empty recommendations
 return res.json([]);
 }

 // Create a temporary TF-IDF document for the reference text
 // We'll rebuild the model with this reference document
 const tempTfidf = new natural.TfIdf();
 const corpus = [...tfidfModel.books.map(book => book.desc)];
 corpus.push(referenceText);
 
 // Add all documents
 corpus.forEach(doc => tempTfidf.addDocument(doc));
 
 // Create vector for reference document
 const refTermWeights = tempTfidf.listTerms(tempTfidf.documents.length - 1).reduce((acc, cur) => {
 acc[cur.term] = cur.tfidf;
 return acc;
 }, {});
 
 const refVector = tfidfModel.vocabulary.map(term => refTermWeights[term] || 0);
 
 // Calculate similarities
 const userFavourites = new Set(user.favourites.map(f => f._id.toString()));
 const recommendations = tfidfModel.books
 .filter(book => !userFavourites.has(book._id.toString()))
 .map((book) => {
 const bookVector = tfidfModel.bookVectors[tfidfModel.books.indexOf(book)];
 const sim = cosineSimilarity(refVector, bookVector);
 return { book, score: sim };
 })
 .sort((a, b) => b.score - a.score)
 .slice(0, 5);
 
 res.status(200).json(recommendations.map(r => r.book));
 } catch (err) {
 console.error("Enhanced recommend error:", err);
 res.status(500).json({ message: "Recommendation failed", error: err });
 }
});
router.get("/get-allbooks", async (req, res) => {
  const { search } = req.query;

  try {
    const books = await Book.find({ _id: { $exists: true }, title: { $exists: true } });

    if (!search) return res.json(books);

    const searchLower = search.toLowerCase();

    const matchedBooks = books
      .map(book => {
        const titleScore = natural.JaroWinklerDistance(book.title.toLowerCase(), searchLower);
        const authorScore = natural.JaroWinklerDistance(book.author.toLowerCase(), searchLower);
        console.log({ title: book.title, titleScore, authorScore });
        return { book, score: Math.max(titleScore, authorScore) };
      })
      .filter(item => item.score > 0.7) // Adjust threshold for similarity
      .sort((a, b) => b.score - a.score) // Highest score (best match) first
      .map(item => item.book);

    res.json(matchedBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/get-recentbooks", async (req,res) => {
    try{
        const books = await Book.find().sort({ createdAt: -1 }).limit(5)
        return res.json({
            status: "Success",
            data: books
        });
    } catch{
        res.status(500).json({ message: "Internal error occured" })
    }
});

router.get("/get-bookbyid/:id", async (req,res) => {
    try{
        const { id } = req.params
        const book = await Book.findById(id)
        return res.json({
            status: "Success",
            data: book
        });
    } catch{
        res.status(500).json({ message: "Internal error occured" })
    }
});

router.get('/get-trending-books', async (req, res) => {
  try {
    const trendingBooks = await Book.find()
      .sort({ clickCount: -1 })     // Sort by clickCount descending
      .limit(5);                    // Top 5 only

    res.json(trendingBooks);
  } catch (err) {
    res.status(500).json({ message: 'Error getting books', error: err });
  }
});

router.get('/get-top-rated-books', async (req, res) => {
  try {
    const topRated = await Book.find().sort({ rating: -1 }).limit(5);
    res.json(topRated);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
// Global variable to store the TF-IDF model (singleton pattern)
let tfidfModel = null;

// Function to initialize/pre-build the TF-IDF model
async function initializeTfidfModel() {
  try {
    console.log("Initializing TF-IDF model...");
    const books = await Book.find();
    const corpus = books.map(book => book.desc);
    
    tfidfModel = new natural.TfIdf();
    corpus.forEach(doc => tfidfModel.addDocument(doc));
    
    // Build and store vocabulary
    const vocabulary = new Set();
    for (let i = 0; i < books.length; i++) {
      tfidfModel.listTerms(i).forEach(term => vocabulary.add(term.term));
    }
    tfidfModel.vocabulary = Array.from(vocabulary); // Store vocabulary
    
    // Pre-compute vectors for all books (optional but faster for repeated searches)
    tfidfModel.bookVectors = books.map((_, index) => {
      const termWeights = tfidfModel.listTerms(index).reduce((acc, cur) => {
        acc[cur.term] = cur.tfidf;
        return acc;
      }, {});
      return tfidfModel.vocabulary.map(term => termWeights[term] || 0);
    });
    
    tfidfModel.books = books; // Store book references
    tfidfModel.vocabularySize = tfidfModel.vocabulary.length;
    
    console.log(`TF-IDF model initialized with ${books.length} books and ${tfidfModel.vocabularySize} unique terms`);
    return tfidfModel;
  } catch (err) {
    console.error("Error initializing TF-IDF model:", err);
    throw err;
  }
}

// API endpoint that uses the pre-built model
router.get('/advanced-search', async (req, res) => {
  try {
    // Check if model is initialized, if not, initialize it
    if (!tfidfModel) {
      await initializeTfidfModel();
    }

    const { q } = req.query;
    if (!q || q.trim().length === 0) {
      return res.status(400).json({ message: "Query string is empty" });
    }

    // Add query to the existing TF-IDF model
    tfidfModel.addDocument(q);
    
    // Convert query to vector using pre-built vocabulary
    const termWeights = tfidfModel.listTerms(tfidfModel.documents.length - 1).reduce((acc, cur) => {
      acc[cur.term] = cur.tfidf;
      return acc;
    }, {});
    
    const queryVector = tfidfModel.vocabulary.map(term => termWeights[term] || 0);
    
    // Calculate cosine similarity using pre-computed book vectors
    const results = tfidfModel.books.map((book, index) => {
      const bookVector = tfidfModel.bookVectors[index];
      const sim = cosineSimilarity(queryVector, bookVector);
      return { book, score: sim };
    });

    const sortedResults = results
      .filter(r => r.score > 0.1)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(r => r.book);

    res.json(sortedResults);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Search failed", error: err });
  }
});

// Optional: Endpoint to refresh/rebuild the model (useful when books are updated)
router.post('/admin/refresh-search-index', async (req, res) => {
  try {
    tfidfModel = null; // Clear existing model
    await initializeTfidfModel();
    res.json({ message: "Search index refreshed successfully" });
  } catch (err) {
    console.error("Error refreshing search index:", err);
    res.status(500).json({ message: "Failed to refresh search index", error: err });
  }
});

// Optional: Get model statistics
router.get('/admin/search-stats', async (req, res) => {
  try {
    if (!tfidfModel) {
      return res.json({ 
        status: "Not initialized",
        initialized: false,
        books: 0,
        vocabularySize: 0
      });
    }
    
    res.json({
      status: "Initialized",
      initialized: true,
      books: tfidfModel.books.length,
      vocabularySize: tfidfModel.vocabularySize,
      documentsInModel: tfidfModel.documents.length
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", error: err });
  }
});
module.exports = router
