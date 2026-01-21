const express = require('express');
const auth = require('../middleware/authorization');
const { createUser, login, verifyUser, updateUserById, deleteUserById } = require('../controllers/user.controller');
const authAdmin = require('../middleware/authAdmin');
const userRouter = express.Router();

userRouter.post('/register', authAdmin, createUser);// localhost:3000/users/register
userRouter.post('/login', login);// localhost:3000/users/login
userRouter.get('/verify', auth, verifyUser);// localhost:3000/users/verify
userRouter.put('/:id',auth, updateUserById);// localhost:3000/users/:id
userRouter.delete('/:id',auth, deleteUserById);// localhost:3000/users/:id

module.exports = userRouter;