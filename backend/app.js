import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/DB.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import coordinatorRoutes from './routes/coordinatorRoutes.js'
import userRoutes from './routes/userRoutes.js'
import morgan from 'morgan'

const app = express()
dotenv.config()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.json())

connectDB();


app.use('/api/coordinator',coordinatorRoutes)
app.use('/api/users',userRoutes)


if(process.env.NODE_ENV==='production'){
    app.use(express.static('frontend/build'))
}else{
    app.get('/', (req,res) => {
        res.send('api is running');
    })
}



app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000
app.listen(PORT,function(){
    console.log(`backend is running on port ${PORT}`)
})