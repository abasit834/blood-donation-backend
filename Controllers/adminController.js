const db = require("../Models/adminModel");
const jwt = require("jsonwebtoken");

exports.checkUser = async (req,res) => {
    const {username,password} =  req.body;

    try{
        const admin = await db.findOne({
            username : username,
            password : password
        })

        if(!admin){
            console.log("User does not exist");
            return res.status(404).json("User does not exist");;
        }


        const jwtoken = jwt.sign({username : admin.username, _id : admin._id},
            process.env.JWT_SECRET,
            {expiresIn : '24h'}
        );
        console.log(jwtoken);
        console.log("Login Successfull");
        return res.status(200).json({message : "Logged in successfully!",token: jwtoken});

    } catch(err){
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }

}