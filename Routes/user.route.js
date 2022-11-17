import express from "express";
import {generateHashedPassword} from "../index.js"
import bcrypt from 'bcrypt';
import { insertUser, findUser } from "../Services/user.service.js";


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
            response.send({
                message:"Successful Login"                
            })
        }else{
            response.status(401).send({
                message:"Invalid Credentials"
            })
        }
        
    }
    
      
  });


export default router;




