// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import bcrypt from 'bcrypt';
import userRouter from './Routes/user.route.js'
import { Db, MongoClient } from "mongodb";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import cors from 'cors'

dotenv.config();


const app = express();

app.use(cors())

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL

app.use(express.json());



async function createConnection() {
    const client = new MongoClient(MONGO_URL); // dial number
    await client.connect(); // pressing call button
    console.log("Mongo is connected ✌😊");
    return client;
  }
  
  export const client = await createConnection();


export async function generateHashedPassword(password){
    const NO_OF_ROUNDS = process.env.NO_OF_ROUNDS ;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword;
}

app.use("/user", userRouter);

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));


