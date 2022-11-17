import  jwt  from "jsonwebtoken";

const SECRET_KEY =  "SECRET_KEY";

export const auth = (request, response, next)=>{
    const token = request.header("x-auth-token");
    jwt.verify(token, SECRET_KEY);
    next();
}