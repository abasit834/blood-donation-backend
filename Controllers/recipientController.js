const Recipient = require('../Models/recepientsModel');

const addRecipient = async ({ patientName, bloodgroup, city, phoneNumber, age, date }) => {
    const newRecipient = new Recipient({
        patientName,
        bloodgroup,
        city,
        phoneNumber,
        age,
        requestDate : date
    });

    await newRecipient.save();
    return newRecipient;
}

const findDuplicate = async (phoneNumber) => {
    return await Recipient.find({ phoneNumber });
}

const getRecipient = async (bloodgroup, city) => {
    const query = {};
    if (bloodgroup) query.bloodgroup = bloodgroup;
    if (city) query.city = city;

    return await Recipient.find(query)
        .sort({ patientName: 1 })
        .select({ patientName: 1, bloodgroup: 1, city: 1, phoneNumber: 1, age: 1, lastDonated: 1 });
}

module.exports = {
    addRecipient,
    findDuplicate,
    getRecipient
};
