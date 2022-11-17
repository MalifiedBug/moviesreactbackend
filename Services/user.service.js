import { client } from "../index.js";


export async function insertUser(username, hashedpass) {
    return client
        .db("Capstone")
        .collection("Users")
        .insertOne({
            username: username,
            password: hashedpass
        });
}

export async function findUser(username) {
    return await client.db("Capstone").collection("Users").findOne({ username: username });
}
