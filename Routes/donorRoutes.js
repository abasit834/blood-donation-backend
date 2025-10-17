const { Router } = require("express");
const donor = require("../Controllers/donorController");
const router = Router();

router.post("/addDonor",async (req, res) => {
    const formData = req.body;
    console.log(formData);
    const { name, dob, gender, bloodgroup, weight , city , contact,lastdonated } = formData;


    try {
        const duplicate = await donor.findDuplicate(contact);

        if(duplicate.length > 0)
        return res.json({dup :true, success : false , message:"Donor with this contact number already exists"});   

        await donor.addDonor(name,dob,gender,bloodgroup,weight,city,contact,lastdonated);
        return res.json({dup : false , success : true , message : "Donor Added Successfully!"}); 
    } catch (error) {
        console.error('Error submitting data:', error.message);
        return res.status(500).send('Internal Server Error'); 
    }
});



router.get("/retrieveDonors",async (req,res) =>{
    const {bloodgroup,city} = req.query;

    try{
        const response = await donor.retrieveDonors(bloodgroup,city);
        if(response.length < 1)
        return res.json("No donor exists");
        
        return res.json(response);
    }
    catch(err){
        console.log(err);
        return res.sendStatus(404).json("Error Occurred");
    }

});

module.exports = router;