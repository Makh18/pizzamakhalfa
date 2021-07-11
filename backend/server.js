import  express from 'express';
import  products from './Data/products.js'
import  dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import {notFound,errorHandler } from './middelware/errorMiddelware.js'
import productRoutes from "./routes/productRoutes.js"
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import path from 'path'
import uploadRoutes from './routes/uploadRoutes.js'
const app=express()

dotenv.config()

connectDB()


app.use(express.json())

app.use('/api/products',productRoutes)
app.use(express.json());
app.use('/api/users', userRoutes)
app.use(express.json())

app.use('/api/orders', orderRoutes)

app.use(express.json())

app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/api/config/paypal',(req,res)=>
res.send(process.env.PAYPAL_CLIENT_ID))
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }

app.use(notFound)

app.use(errorHandler)
const PORT=process.env.PORT || 5000
app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV}  on port ${PORT}`.yellow.bold))

console.log(`my host is ${process.env.DB_HOST}`)
