const Recipient = require('../Models/recepientsModel');

const addRecipient = async ({ patientName, bloodgroup, city, phoneNumber, age, lastDonated }) => {
    const newRecipient = new Recipient({
        patientName,
        bloodgroup,
        city,
        phoneNumber,
        age,
        lastDonated
    });

    await newRecipient.save();
    return newRecipient;
}

const findDuplicate = async (phoneNumber) => {
    return await Recipient.find({ phoneNumber });
}




// const getRecipient = async (bloodgroup, city) => {
//     const query = {};
//     if (bloodgroup) query.bloodgroup = bloodgroup;
//     if (city) query.city = city;

//     return await Recipient.find(query)
//         .sort({ patientName: 1 })
//         .select({  });
// }


module.exports = {
    addRecipient,
    findDuplicate,
    // getRecipient
};
