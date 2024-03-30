import express from "express";
import { protect} from "../middleware/authMiddleware.js";
import bodyParser from 'body-parser';
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../Controllers/blogController.js";
import multer from "multer";
import path from "path";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()) // Set unique filename for each uploaded file
  }
});

const upload = multer({ storage: storage });

// GET all products
router.get("/", getBlogs);

// GET a specific product by ID
router.get("/:id", getBlogById);

// Create a new product
router.post("/", protect, upload.single("image"), createBlog);

// Update a product by ID
router.put("/:id", protect, upload.single("image"), updateBlog);

// Delete a product by ID
router.delete("/:id", protect, deleteBlog);

export default router;
