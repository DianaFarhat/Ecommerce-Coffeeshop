const express= require('express');
const { connectToDatabase } = require('./database');
const app= express();
const DB= require('./database').connectToDatabase;
const userRouter=require("./routes/userRouter")
const cors = require('cors');

// Run the database connection
connectToDatabase();

app.use(express.json());
app.use(cors());
app.options('*', cors());

app.use("/api/users", userRouter)

app.get("/", (req,res)=>{res.send("hello")})
//Set up port
app.listen(3000, ()=>{
    console.log('Listening on port 3000')
})