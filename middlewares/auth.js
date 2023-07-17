const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function auth(req, res, next) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.send('Please Login first');
        }
      
        const decoded = jwt.verify(token, "secretPass");

        if (!decoded) {
            return res.send("You are not authorized to access this")
        }

        req.body.userId = decoded._id;

        next();
        console.log(decoded, auth);
    } catch (error) {
        res.send(error);
    }

}

module.exports = auth;