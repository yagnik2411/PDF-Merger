import PDFMerger from "pdf-merger-js";
import fs from "fs";

/**
 * Merges two PDF files and saves the merged result with metadata.
 * @param {string} pdf1 - Path to the first PDF file.
 * @param {string} pdf2 - Path to the second PDF file.
 */
export async function mergePDFs(pdf1, pdf2) {
  // Create a PDFMerger instance
  const merger = new PDFMerger();

  try {
    // Add both PDFs to the merger
    await merger.add(pdf1);
    await merger.add(pdf2);

    // Set metadata for the merged PDF
    await merger.setMetadata({
      producer: "pdf-merger-js based script",
      author: "Yagnik Panchal",
      creator: "Yagnik Panchal",
      title: "Merged PDF",
    });

    // Save the merged PDF to the specified path
    await merger.save("./merge/merged.pdf");

    // Delete the original PDF files
    deleteFiles([pdf1, pdf2]);
  } catch (error) {
    console.error(`Error merging PDFs: ${error.message}`);
  }
}

/**
 * Deletes the specified files.
 * @param {string[]} files - Array of file paths to be deleted.
 */
function deleteFiles(files) {
  files.forEach((file) => {
    try {
      fs.unlinkSync(file);
    } catch (err) {
      console.error(`Error deleting file ${file}: ${err.message}`);
    }
  });
}
