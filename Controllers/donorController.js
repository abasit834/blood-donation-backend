const donor=require('../Models/donorsModel');


const addDonor=async(name,dob,gender,bg,weight,city,cn,ld)=>{

    const add=new donor;
    add.name=name;
    add.dateofbirth=dob;
    add.gender = gender;
    add.bloodgroup=bg;
    add.weight = weight;
    add.city = city;
    add.contactNumber=cn;
    add.lastDonated=ld;

    await add.save();

    return add;
}

const findDuplicate = async (contact) =>{
    const duplicate = await donor.find({  
        contactNumber : contact
    });

    return duplicate;
}


const retrieveDonors=async(bg,city)=>{
    
    const blood = await donor.find({
        $and: [
            {
                $or: [
                    { lastdonated: { $lt: new Date(new Date().setMonth(new Date().getMonth() - 3)) } },
                    { lastdonated: "" }
                ]
            },
            { bloodgroup: bg },
            { city: city }
        ]
    }, 
    {
        name: 1,
        city: 1,
        bloodgroup: 1
    });
    

    return blood;

}






module.exports.addDonor=addDonor;
module.exports.findDuplicate=findDuplicate;
module.exports.retrieveDonors=retrieveDonors;
