
const { Router } = require("express");
const donor = require("../Controllers/donorController");
const router = Router();

router.post("/addDonor", async (req, res) => {
    const formData = req.body;
    console.log(formData);
    const { name, dob, gender, bloodgroup, weight , city , contact,lastdonated } = formData;


    try {
        const duplicate = await donor.findDuplicate(contact);

        if(duplicate.length > 0)
        return res.json({dup :true,message:"Donor with this contact number already exists"});   

        await donor.addDonor(name,dob,gender,bloodgroup,weight,city,contact,lastdonated);
        return res.sendStatus(200); 
    } catch (error) {
        console.error('Error submitting data:', error.message);
        return res.status(500).send('Internal Server Error'); 
    }
});



router.post("/retrieveDonors", async (req,res) =>{
    const {bloodgroup,city} = req.body;
    console.log(bloodgroup,city);

    try{
        const response = await donor.retrieveDonors(bloodgroup,city);
        console.log(response);
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