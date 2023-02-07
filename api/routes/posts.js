const router = require("express").Router();

const User = require("../models/User");
const Post = require("../models/Post");

const { Router } = require("express");

const bcrypt = require('bcrypt');


// Update

router.put("/:id", async (req, res) => {
    if (req.body.userId == req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(401).json("You can update only your account")
    }
})

// Delete

router.delete("/:id", async (req, res) => {
    if (req.body.userId == req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const user = await User.findById(req.params.id)
            try {
                await Post.deleteMany({ username: User.username })
                const updatedUser = await User.findByIdAndDelete(req.params.id);
                res.status(200).json("user was deleted");
            } catch (err) {
                res.status(500).json(err)
            }
        } catch (error) {
            res.status(404).json("no user like this exists")
        }

    } else {
        res.status(401).json("You can delete only your account")
    }
})

// GET USER

router.get("/:id", async (req, res) => {

    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err)
    }

})

module.exports = router