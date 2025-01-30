const express= require('express')
const router=express.Router();
const {signup,login} = require('../controllers/userController');


  router.post('/signup', signup); // This maps POST /signup to the signup function
  router.post('/auth', login); // This maps POST /signup to the signup function

 
  module.exports = router; 