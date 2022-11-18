import express from "express";
import {generateHashedPassword} from "../index.js"
import bcrypt from 'bcrypt';
import { insertUser, findUser } from "../Services/user.service.js";
import jwt from 'jsonwebtoken'




const router = express.Router();





router.post("/signup", async function (request, response) {
  const {username, password} = request.body;
  const hashedpass = await generateHashedPassword(password);

  const user = await findUser(username)
  if(user){
    response.send({msg: "user already present"})
  }else{

    const result = await insertUser(username, hashedpass);
    response.send({result, msg:`db updated with username ${username}`});   

  }
  
    
});

router.post("/login", async function (request, response) {
    const {username, password} = request.body;
   

    const user = await findUser(username)

    if(!user){
        response.status(401).send({message: "Invalid Credentials"})
    }else{
        const storedPassword = user.password;
        const PasswordMatch = await bcrypt.compare(password, storedPassword);
        console.log(PasswordMatch)
        if(PasswordMatch){
          const token = jwt.sign({id: user._id},process.env.MY_SECRET)
            response.send({
                message:"Successful Login",
                token: token                
            })
        }else{
            response.status(401).send({
                message:"Invalid Credentials"
            })
        }
        
    }
    
      
  });


export default router;




