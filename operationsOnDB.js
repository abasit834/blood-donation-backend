const donor=require('./Models/donorsModel');

const addDonor=async(name,bg,dob,ld,cn)=>{
    const add=new donor;
    add.name=name;
    add.bloodgroup=bg;
    add.dateofbirth=dob;
    add.contactNumber=cn;
    add.lastDonated=ld;

    await add.save();

    return add;
}

// const retrieveDonors=async(bg,city)=>{
    
//     const blood = await donor.find({
//         $and: [
//             {
//                 $or: [
//                     { lastdonated: { $lt: new Date(new Date().setMonth(new Date().getMonth() - 3)) } },
//                     { lastdonated: "" }
//                 ]
//             },
//             { bloodgroup: bg },
//             { city: city }
//         ]
//     }, 
//     {
//         name: 1,
//         city: 1,
//         bloodgroup: 1
//     });
    

//     return blood;

// }





module.exports.addDonor=addDonor;
module.exports.retrieveDonors=retrieveDonors;