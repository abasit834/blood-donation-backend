const express = require("express");
const mongoose=require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app=express();
const PORT = 3005;
app.use(cors());
app.use(bodyParser.json()); 

const mongo_conn_url = process.env.MONGO_CONN;  // encapsulated the connection url 

mongoose.connect(mongo_conn_url
, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{ 
    console.log('MongoDB connected')
})
.catch(err => console.log(err));


app.use("/donors",require("./Routes/donorRoutes"));
app.use("/admin",require("./Routes/adminRoutes"));



app.listen(PORT,()=>{
    console.log(`Server running at: http://localhost:${PORT}`);
})