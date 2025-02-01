const express= require('express');
const { connectToDatabase } = require('./database');
const app= express();
const DB= require('./database').connectToDatabase;
const userRouter=require("./routes/userRouter")
const cors = require('cors');
const cookieParser = require("cookie-parser");
const categoryRouter=require("./routes/categoryRouter")
// Run the database connection
connectToDatabase();

app.use(express.json());
app.use(cookieParser()); // ✅ Middleware to handle cookies




app.use(cors({
    origin: "http://localhost:3001", // Allow your frontend domain
    credentials: true, // Allow credentials like cookies
}));

app.options('*', cors());


app.use("/api/users", userRouter)
app.use("/api/category", categoryRouter)


app.get("/", (req,res)=>{res.send("hello")})



//Set up port
app.listen(3000, ()=>{
    console.log('Listening on port 3000')
})