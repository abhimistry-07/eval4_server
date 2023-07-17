const express = require('express');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const UserRouter = express.Router();
const bcrypt = require('bcrypt');

UserRouter.get('/', (req, res) => {
    console.log("users");
    res.send("From users")
})

UserRouter.post("/register", async (req, res) => {
    try {
        const { name, email, gender, password } = req.body;

        const newPass = await bcrypt.hash(password, 5);

        const user = await UserModel.create({ name, email, gender, password: newPass });

        return res.status(200).send({ msg: "Registered", user: user });
    } catch (error) {
        res.status(400).send(error);
    }
});

UserRouter.post("/login", async (req, res) => {
    try {
        const { name, email, gender, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).send({ msg: "No user found" });
        }

        const verify = await bcrypt.compare(password, user.password);

        if (!verify) {
            return res.send("Wrong Credentials");
        }

        const token = jwt.sign({ _id: user._id }, "secretPass");

        return res.status(200).send({ msg: "Logg in succesfull", token: token });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = UserRouter;