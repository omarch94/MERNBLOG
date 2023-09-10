const jwt=require('jsonwebtoken');
//verify Token

function verifyToken(req, res, next) {
  const authToken = req.headers.authorization;
  if (authToken) {
    const token =authToken.split(" ")[1];
    console.log("Extracted Token:", token);
    try {
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedPayload;
      const payload = jwt.decode(token);
      console.log("Decoded Payload:", decodedPayload);
      next();
    } catch (error) {
      console.error("Token Verification Error:", error.message);
    
      // Log the token and secret key for debugging
      console.log("Token:", token);
      console.log("JWT_SECRET:", process.env.JWT_SECRET);
      return res.status(401).json({ message: "invalid token, access denied" });
    }    
  } else {
    return res
      .status(401)
      .json({ message: "no token provided, access denied" });
  }
  }

//verifyToken and admin 

function verifyTokenAndAdmin(req,res,next){
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
          next();
        } else {
          return res.status(403).json({ message: "not allowed, only admin" });
        }
      });
}

// verifyToken and admin 

function verifyTokenAndOnlyUser(req,res,next){
  console.log("Starting verifyTokenAndOnlyUser middleware");
  verifyToken(req, res,()=>{
    console.log("req.user.id:", req.user.id);
    console.log("req.params.id:", req.params.id);
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res.status(403).json({ message: "not allowed, only user himself" });
    }
  });
}

module.exports={verifyToken,verifyTokenAndAdmin,verifyTokenAndOnlyUser}