const {Router} = require("express");
const donor = require("../Controllers/adminController");
// const recipent = require("../Controllers/adminController");
const authenticateUser = require("../Middlewares/Auth");


const router = Router();


router.post("/login",donor.checkUser);
router.get("/count-by-bloodgroup",authenticateUser,donor.bloodGroupCount); // count donors for each blood group
router.get("/get-total-count",authenticateUser,donor.totatDonors);// count donors for all blood groups
router.get("/get-recipients",authenticateUser,donor.getRecipient);  // get all recipient to show in table
router.get("/get-donors",authenticateUser,donor.getAllDonors);   // get all donors to show in table



module.exports = router;


