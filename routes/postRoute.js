const express = require('express');
const jwt = require('jsonwebtoken');
const PostRouter = express.Router();
const bcrypt = require('bcrypt');
const PostModel = require('../models/postModel');


PostRouter.get('/', async (req, res) => {

    // const ID = req.body.userId;
    // console.log(ID);

    try {
        const posts = await PostModel.find();
        console.log(posts);
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send(error);
    }
});


PostRouter.post('/create', async (req, res) => {
    try {
        const post = await PostModel.create(req.body);
        console.log("added");
        res.status(200).send({ msg: 'Added Successfully', post: post });
    } catch (error) {
        res.status(400).send(error);
    }
});

PostRouter.patch('/update', async (req, res) => {
    try {
        const ID = req.params.id;
        const payload = req.body;

        const findPerson = await PostModel.findOne({ _id: ID });
        const loggedPerson = req.body.userId;

        if (findPerson.userId === loggedPerson) {
            const update = await PostModel.findByIdAndUpdate({ _id: ID }, payload);
            res.status(200).send({ msg: 'Updated Successfully', update: update });
        }

    } catch (error) {
        res.status(400).send(error);
    }
})


PostRouter.delete('/delete', async (req, res) => {
    try {
        const ID = req.params.id;

        const findPerson = await PostModel.findOne({ _id: ID });
        const loggedPerson = req.body.userId;

        if (findPerson.userId === loggedPerson) {
            const update = await PostModel.findByIdAndDelete({ _id: ID });
            res.status(200).send({ msg: 'Deleted Successfully', delete: delete });
        }

    } catch (error) {
        res.status(400).send(error);
    }
})


module.exports = PostRouter;