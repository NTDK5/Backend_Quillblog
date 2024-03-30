import Blog from "../models/blogModel.js";

// @route   GET /api/Blogs
// @desc    Get all Blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get a single blog by ID
// @route   GET /api/Blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: "blog not found" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a new blog
// @route   POST /api/Blogs
// @access  Private
const createBlog = async (req, res) => { 
  try {
    const newBlog = new Blog({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category,
      tags: req.body.tags,
      images: req.body.imageUrl,
      user: req.user._id // Assuming you have access to the authenticated user's ID
    });

    const createdBlog = await newBlog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error.message);
  }
};

// @desc    Update a blog by ID
// @route   PUT /api/Blogs/:id
// @access  Private
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      blog.title = req.body.title || blog.title;
      blog.body = req.body.body || blog.body;
      blog.category = req.body.category || blog.category;
      blog.tags = req.body.tags || blog.inventory;
      blog.images = req.body.imageUrl || blog.images;
      blog.user = req.user._id; // Update user ID

      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: "blog not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};

// @desc    Delete a blog by ID
// @route   DELETE /api/Blogs/:id
// @access  Private
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      await blog.deleteOne();
      res.json({ message: "blog removed" });
    } else {
      res.status(404).json({ message: "blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};

