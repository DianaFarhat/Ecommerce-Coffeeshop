const express= require('express');
const { connectToDatabase } = require('./database');
const app= express();
const DB= require('./database').connectToDatabase;
const userRouter=require("./routes/userRouter")
const cors = require('cors');
const cookieParser = require("cookie-parser");
const categoryRouter=require("./routes/categoryRouter")
const productRouter=require("./routes/productRouter")
const orderRoutes= require('./routes/orderRouter')

// Run the database connection
connectToDatabase();

//Add necessary middleware
app.use(express.json());
app.use(cookieParser()); // ✅ Middleware to handle cookies

// TODO: Check the below 
/*app.use(express.urlencoded({extended:true})) Was used in project setup */

app.use(cors({
    origin: "http://localhost:3001", // Allow your frontend domain
    credentials: true, // Allow credentials like cookies
}));

app.options('*', cors());


app.use("/api/users", userRouter)
app.use("/api/category", categoryRouter)
app.use("/api/products", productRouter)
app.use("/api/orders", orderRoutes)



app.get("/", (req,res)=>{res.send("hello")})



//Set up port
app.listen(3000, ()=>{
    console.log('Listening on port 3000')
})