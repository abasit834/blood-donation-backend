const mongoose = require("mongoose");


const AddDonorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateofbirth: {
        type: Date,
        required: true
    },
    gender : {
        type : String,
        required : true
    },
    bloodgroup: {
        type: String,
        required: true
    },
    weight : {
        type : Number,
        required : true
    },
    city :{
        type : String,
        required : true
    },
    contactNumber:{
        type : String,
        required : true
    },
    lastDonated: {
        type: Date,
    }
});


const DonorModel = mongoose.model('Donor', AddDonorSchema);

module.exports = DonorModel;
