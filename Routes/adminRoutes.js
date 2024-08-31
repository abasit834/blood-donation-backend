const {Router} = require("express");
const admin = require("../Controllers/adminController");
const authenticateUser = require("../Middlewares/Auth");


const router = Router();


router.post("/login",admin.checkUser);
router.get("/count-by-bloodgroup",authenticateUser,admin.bloodGroupCount); // count donors for each blood group
router.get("/get-total-count",authenticateUser,admin.totatDonors);
router.get("/get-recipients",authenticateUser,admin.getAllRecipients);  // get all recipient to show in table
router.get("/get-donors",authenticateUser,admin.getAllDonors);    // get all donors to show in table



module.exports = router;


