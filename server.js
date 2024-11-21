import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import authRoutes from './routes/authRoute.js'
import postRoutes from './routes/postRoutes.js'

//app config

const app=express()
const port=process.env.PORT||4000
connectDB()
connectCloudinary()

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? "https://xcode-insta-frontend.onrender.com" 
    : "http://localhost:3000", 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};


//middlewares
app.use(express.json())
app.use(cors(corsOptions))


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);



app.listen(port,()=>console.log('server started',port)
)