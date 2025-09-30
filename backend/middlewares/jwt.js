import jwt from 'jsonwebtoken';


export function jwtAuth(req, res, next){

    const admintoken = req.cookies.admintoken;
    
   
    console.log(req.cookies.admintoken);

    if(!admintoken){
        return res.json({success:false, status:400, message:'Login In again'})
    }

   
    try{
        const decode = jwt.verify(admintoken, process.env.JWT_SECRET_KEY);
        // console.log(decode);
        req.email = decode.email;

         if(req.url === "/is-login"){
            return res.json({message:'loggedIn', success:true, status:200})
        }

        next();
    }
    catch(error){
        return res.json({status:403, message:error.message});
    }

    
}

export function generateToken(payload){
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn:600})
}