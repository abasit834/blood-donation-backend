const db = require("../Models/adminModel");
const donor = require("../Models/donorsModel")
const recipient = require("../Models/recepientsModel")
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

        return res.status(400).json("Incorrect Username or Password");

    } catch(err){
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }

}

exports.bloodGroupCount = async (req,res)=>{

        try{
            const bloodgroups = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];
             // Map each blood group to a promise that resolves with the count
            const countPromises = bloodgroups.map((group) => donor.find({ bloodgroup: group }).countDocuments());

            // Await all promises concurrently
            const bloodcount = await Promise.all(countPromises);
            // const obj = {
            //     A_positive : bloodcount[0],
            //     A_negative : bloodcount[1],
            //     B_positive : bloodcount[2],
            //     B_negative : bloodcount[3],
            //     AB_positive : bloodcount[4],
            //     AB_negative : bloodcount[5],
            //     O_positive : bloodcount[6],
            //     O_negative : bloodcount[7],
            // }
            return res.status(200).json(bloodcount);

        }catch(err){
            console.log(err);
            return res.status(500).json(0);
        }
}

exports.totatDonors = async (req,res) =>{
    try{
        const [totalDonors, totalRecipients] = await Promise.all([
            donor.countDocuments(),
            recipient.countDocuments()
        ]);

        return res.status(200).json({donors : totalDonors, recipients : totalRecipients});

    }catch(err)
    {
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }
}