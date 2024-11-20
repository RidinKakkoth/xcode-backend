import mongoose from 'mongoose'


const connectDB=async()=>{
    
    mongoose.connection.on('connected',()=>console.log('Database connected'))

    await mongoose.connect("mongodb+srv://ridinksr:Mw2WsTtxSKgsgOjO@cluster0.bdd03.mongodb.net/instagram?retryWrites=true&w=majority&appName=Cluster0")
    // await mongoose.connect(`${process.env.MONGODB_URI}`)
}


export default connectDB