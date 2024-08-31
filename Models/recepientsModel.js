const mongoose = require("mongoose");

const AddRecipientSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    bloodgroup: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true 
    },
    age: {
        type: Number,
        required: true
    },
    requestDate: {
        type: Date,
        required : true
    }
});


const RecipientModel = mongoose.model('Recipient', AddRecipientSchema);

module.exports = RecipientModel;