const express= require('express')
const router=express.Router();
const {signup} = require('../controllers/userController');


  router.post('/signup', signup); // This maps POST /signup to the signup function
 
  module.exports = router; 