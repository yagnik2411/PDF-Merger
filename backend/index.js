// Import necessary modules and libraries
import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import { merge } from "./pdfmerge.mjs";

// Create an Express application
const app = express();
const port = 8080;

// Set up Multer for handling file uploads
const upload = multer({ dest: "uploads/" });

// Get the current filename and directory
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Configure Express to use EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Enable parsing of URL-encoded and JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'merge' directory
app.use("/", express.static("merge"));

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle POST requests to the root URL
app.post("/", upload.any(), async (req, res) => {
  try {
    // Retrieve the uploaded PDF files
    const pdf1 = req.files[0];
    const pdf2 = req.files[1];

    // Perform the merge operation
    await merge(pdf1.path, pdf2.path);

    // Redirect to the merged PDF file
    res.redirect("http://localhost:8080/merged.pdf");
  } catch (error) {
    // Handle any errors during the merge operation
    console.error("Merge error:", error);
    res.status(500).send("Internal Server Error");
  }
});
