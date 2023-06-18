// Require modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


//Routes to call
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");




// Create server
const app = express();
const port = 4000;


// Connect to our MongoDB database
mongoose.connect("mongodb+srv://admin:admin@coursebooking.lupvtnf.mongodb.net/ecommerce-app?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Set notification for connection success or failure
let db = mongoose.connection;
db.on("error",console.error.bind(console, "Connection error"));

db.once("open", () => console.log ("We're connected to the cloud database."));

// Middlewares
// To allow resources to access our backend application
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// Routes for our API
// localhost:4000/users
app.use("/users", userRoutes);
app.use("/products", productRoutes);




// Listening port
// This syntax will allow flexibility when using the applictaion locally or as a hosted application (online)
app.listen(process.env.PORT || port, () =>{
	console.log(`API is now online on port ${process.env.PORT || port}`)
})


