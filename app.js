const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/notfound')
const errorHandler = require('./middleware/error-handler')
app.use(express.json())


app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandler)

const port = 3000

const start = async() =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`We are live on port ${port}`)
        })
    }catch(error){
        console.log(error)
    } 
}

start()