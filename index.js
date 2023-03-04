require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
mongoose.set('strictQuery', false);
// connect to db
mongoose.connect(process.env.MONGO)
  .then(() => {
    // listen for requests
    app.listen(4000, () => {
      console.log('connected to db & listening on port 4000')
    })
  })
  .catch((error) => {
    console.log(error)
  })