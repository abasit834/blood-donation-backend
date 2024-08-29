const { Router } = require("express");
const recipientController = require("../Controllers/recipientController");
const router = Router();

router.post("/addRecipient", async (req, res) => {
    const { patientName, bloodgroup, city, phoneNumber, age, lastDonated } = req.body;

    try {
        const duplicate = await recipientController.findDuplicate(phoneNumber);

        if (duplicate.length > 0) {
            return res.json({ dup: true, message: "Recipient with this contact number already exists" });
        }

        await recipientController.addRecipient({ patientName, bloodgroup, city, phoneNumber, age, lastDonated });
        return res.sendStatus(200);
    } catch (error) {
        console.error('Error submitting data:', error.message);
        return res.status(500).send('Internal Server Error');
    }
});

router.post("/getRecipient", async (req, res) => {
    const { bloodgroup, city } = req.body;

    try {
        const recipients = await recipientController.getRecipient(bloodgroup, city);
        if (recipients.length < 1) {
            return res.json("No recipient exists");
        }
        return res.json(recipients);
    } catch (err) {
        console.log(err);
        return res.status(500).json("Error Occurred");
    }
});

module.exports = router;