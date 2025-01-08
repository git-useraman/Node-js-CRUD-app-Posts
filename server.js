const express = require("express");
const app = express()
const path = require('path')
const errorHandler = require('./middleware/error')
const logger = require('./middleware/logger')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB()

// Custom middleware logger
app.use(logger)

// Template engine EJS
app.set('view engine', 'ejs')

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// Built-in middleware for json
app.use(express.json())

// Serve static files
app.use('/', express.static(path.join(__dirname, '/public')))

// Routes
app.use('/posts', require("./routes/api/posts"))
app.get('/', require('./routes/root'))

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connect to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})