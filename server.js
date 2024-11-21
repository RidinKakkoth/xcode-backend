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
    origin: 'http://localhost:3000',  // Allow requests from localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true,  // If your frontend needs cookies or authentication headers
  };

//middlewares
app.use(express.json())
app.use(cors(corsOptions))


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);



app.listen(port,()=>console.log('server started',port)
)