const jwt = require("jsonwebtoken");

const authenticateUser = (req,res,next)=>{
    const auth = req.headers['authorization'];
    if(!auth)
        return res.status(403).json("Unauthorized user,JWT token is required.Please Login");

try{
        const decoded = jwt.verify(auth,process.env.JWT_SECRET);
        req.user = decoded;
        console.log(req.user);
        next();
}
catch(err){
        console.log(err);
        res.status(403).json("Unauthorized,JWT is wrong or expired");
}

}

module.exports = authenticateUser;