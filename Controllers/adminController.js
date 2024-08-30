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

exports.getRecipient = async (bloodgroup, city) => {
    const query = {};
    if (bloodgroup) query.bloodgroup = bloodgroup;
    if (city) query.city = city;

    return await Recipient.find(query)
        .sort({ patientName: 1 })
        .select({ patientName: 1, bloodgroup: 1, city: 1, phoneNumber: 1, age: 1, lastDonated: 1 });
}


exports.getAllDonors = async () => {
    const donarsss = await donar.find({})
        .sort({ name: 1 })
        .select({
            name: 1,
            dateofbirth: 1,
            gender: 1,
            bloodgroup: 1,
            weight: 1,
            city: 1,
            contactNumber: 1,
            lastDonated: 1
        });

    return donarsss; 
}
