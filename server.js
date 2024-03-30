import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors'
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import blogRoutes from "./routes/blogRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// import productRoutes from "./routes/productRoutes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.port || 5000;
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/blogs", blogRoutes);
app.use(notFound);
app.use(errorHandler);
app.options('*', cors());
app.listen(port, () => console.log(`server started on port ${port} `));

