const {Router} = require("express");
const donor = require("../Controllers/adminController");
const bcrypt = require("bcrypt");

const router = Router();


router.post("/login",donor.checkUser);
router.post("/encrypt",async(req,res)=>{
    const {password} = req.body;
})


module.exports = router;


