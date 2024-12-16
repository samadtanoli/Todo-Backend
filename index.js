require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const BookModel = require("./models/hookmodel");
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Server started");
});

// Middleware to validate ObjectId
function validateObjectId(req, res, next) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      isSuccessfull: false,
      message: "Invalid ID format",
    });
  }
  next();
}

// Route to fetch all books
app.get("/book", async (req, res) => {
  try {
    const result = await BookModel.find({});
    res.status(200).json({
      isSuccessfull: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      isSuccessfull: false,
      error: error.message,
    });
  }
});

// Route to fetch a single book by ID
app.get("/book/:id", validateObjectId, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await BookModel.findById(id);
    if (!result) {
      return res.status(404).json({
        isSuccessfull: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      isSuccessfull: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      isSuccessfull: false,
      error: error.message,
    });
  }
});

// Route to add a new book
app.post("/book", async (req, res) => {
  try {
    const { title, description, author, noOfpages } = req.body;

    if (!title || !description || !author || !noOfpages) {
      return res.status(400).json({
        isSuccessfull: false,
        message: "All fields are required",
      });
    }

    const obj = {
      title,
      description,
      author,
      noOfpages: Number(noOfpages),
    };

    const modelObj = new BookModel(obj);

    const result = await modelObj.save();
    res.status(201).json({
      isSuccessfull: true,
      data: result,
      message: "Book added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      isSuccessfull: false,
      error: error.message,
    });
  }
});

// Route to update a book by ID
app.put("/book/:id", validateObjectId, async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, author, noOfpages } = req.body;

    if (!title || !description || !author || !noOfpages) {
      return res.status(400).json({
        isSuccessfull: false,
        message: "All fields are required for update",
      });
    }

    const updatedBook = await BookModel.findByIdAndUpdate(
      id,
      { title, description, author, noOfpages: Number(noOfpages) },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedBook) {
      return res.status(404).json({
        isSuccessfull: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      isSuccessfull: true,
      data: updatedBook,
      message: "Book updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      isSuccessfull: false,
      error: error.message,
    });
  }
});

// Route to delete a book by ID
app.delete("/book/:id", validateObjectId, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBook = await BookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        isSuccessfull: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      isSuccessfull: true,
      data: deletedBook,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      isSuccessfull: false,
      error: error.message,
    });
  }
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is listening on http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });