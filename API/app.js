console.log("hello welcome to my LIS app")

const express= require('express');
const mongoose= require('mongoose');
const dotenv= require('dotenv');
const userRoute = require("./Routes/users");
const bookRoute = require("./Routes/books");
const cors = require("cors");

const app = express();
app.use(
    cors({
        origin: "http://127.0.0.1:5500",
    })
)

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
app.use("/api/books", bookRoute);


// user Authentication
const jwt = require("jsonwebtoken");
const createToken = async ()=>{
    const token = await jwt.sign({_id: "619c025829d86f4e64546c93"},"mynameispratikkumarsharmaandiamfromiiitbhubaneswar", {
        expiresIn: "2 seconds"
    });
    console.log(token);

    const userAuth =await jwt.verify(token, "mynameispratikkumarsharmaandiamfromiiitbhubaneswar");
    console.log(userAuth);

}

createToken();


app.listen(8080, ()=>{
    console.log("connected to server...");
})
