const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const createError = require('http-errors')
const logger = require('morgan')
const jwt = require('jsonwebtoken')



const app = express()
require('dotenv').config()
require('./config/db.config')


app.use(logger('dev'))
app.use(express.json())

const routes = require('./config/routes.config')
app.use('/api', routes)


app.use ((req, res, next) => {
    next(createError(404, 'Route not found'))
})

app.use((error, req, res, next) => {
    console.error(error)
    if (error instanceof mongoose.Error.ValidationError) {
        error = createError(400, error);
      } else if (error instanceof mongoose.Error.CastError) {
        error = createError(404, "Resource not found");
      } else if (error.message.includes("E11000")) {
        error = createError(400, "Already exists");
      } else if (error instanceof jwt.JsonWebTokenError) {                
        error = createError(401, error);
      } else if (!error.status) {
        error = createError(500, error);
      }
    
      if (error.status >= 500) {
        console.error(error);
      }



const data = {}
data.message = error.message
data.errors= error.errors

    ? Object.keys(error.errors).reduce(
        (errors, key) => ({
            ...errors,
            [key]: error.errors[key].message || error.errors[key],
        }), {}
    )
    :undefined

    res.status(error.status).json(data)
})

app.listen(process.env.PORT || 3001, () => {
    console.log(`server started on port ${process.env.PORT}`);
})