const {Router} = require("express");
const donor = require("../Controllers/adminController");
// const recipent = require("../Controllers/adminController");
const authenticateUser = require("../Middlewares/Auth");


const router = Router();


router.post("/login",donor.checkUser);
router.post("/count-by-bloodgroup",authenticateUser); // count donors for each blood group
router.get("/get-recipients",authenticateUser,donor.getRecipient);  // get all recipient to show in table
router.get("/get-donors",authenticateUser,donor.getAllDonors);   // get all donors to show in table



module.exports = router;


