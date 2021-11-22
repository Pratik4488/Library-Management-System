console.log("hello welcome to my LIS app")

const express= require('express');
const mongoose= require('mongoose');
const dotenv= require('dotenv');
const userRoute = require("./Routes/users")

const app = express();
dotenv.config();


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedtopology: true
});

mongoose.connection.on("connected", ()=>{
    console.log("Database Connected !!!");
});


app.use(express.json());

// routes end points

app.get("/", (req, res)=>{
    res.status(200).send("welcome to api path");
})

app.use("/api/users",userRoute );

app.listen(8080, ()=>{
    console.log("connected to server...");
})