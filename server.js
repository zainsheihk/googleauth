const express = require("express");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");

dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);


const app = express();
app.use(express.json());


const user = [];

function upsert(array, item) {
    const i = array.findIndex((_item) => _item.email === item.email);
    if (i > -1) array[i] = item;
    else array.push(item);
}
app.post("/api/google-login", async (req, res) => {

    const { token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
    })
    const { name, email, picture } = ticket.getPayload();
    upsert(user, { name, email, picture })
    res.send(201);
    res.json({ name, email, picture })
})

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is ready at ", process.env.PORT || 5000)
})