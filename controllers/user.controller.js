const createError = require('http-errors')
const User = require("../models/User.model");


//CRUD

//READ
module.exports.list = (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
};


//CREATE
module.exports.create = (req, res, next) => {
  User.create(req.body)
  .then(user => {
    console.log('🧍‍♀️🧍‍♂️🧍..................... user created!')
    res.status(201).json(user)})
    .catch(err => console.log(err))
};

//DETAILS
module.exports.detail = (req, res, next) => {
    User.findById(req.currentUser)              //currentUser
    .then(user => {
        if (!user) {
            next(createError(404, 'User not found'))
        } else {
            res.json(user)
        }
    })
    .catch(err => console.log(err))
}

//UPDATE
module.exports.update = (req, res, next) => {
    const { id } =req.params

    User.findByIdAndUpdate(id, req.body, {new: true})
    .then(user => {
        console.log('👍......... user updated!')
        res.status(201).json(user)
    })
    .catch(err => console.log(err))
}

//DELETE
module.exports.delete = (req, res, next) => {
    const { id } = req.params
    User. findByIdAndDelete(id)
    .then(() => {
        //NO SÉ QUE PONER AQUÍ, YA QUE NO NAVEGAMOS, NI REDIRECT DESDE AQUI... ***********************************************
    })
    .catch(err => console.log(err))
}
