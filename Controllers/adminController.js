const db = require("../Models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.checkUser = async (req,res) => {
    const {username,password} =  req.body;

    try{
        const admin = await db.findOne({
            username : username
        });
        
        if(admin)
        {
            const passwordMatch = await bcrypt.compare(password,admin.password);
            if(!passwordMatch)
            return res.status(401).json("Incorrect Password !");
            
            const jwtoken = jwt.sign({username : admin.username, _id : admin._id},
                process.env.JWT_SECRET,
                {expiresIn : '24h'}
            );
            console.log("Login Successfull");
            return res.status(200).json({message : "Logged in successfully!",token: jwtoken});
        }

        return res.status(400).json("Incorrect Username and Password");

    } catch(err){
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }

}