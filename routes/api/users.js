const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../../models/User.js");

router.get("/", (req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json({msg: "No users in the DB!"}));
});

router.post("/", async(req, res) => {
    const hashedPssw = await bcrypt.hash(req.body.password, 10);
    User.create({username: req.body.username, password: hashedPssw})
    .then(user => res.json({msg: "User added correctly!"}))
    .catch(err => res.status(400).json({msg: "User not added!"}));
});

router.post("/login", async(req, res) => {
    const user = await User.find({username: req.body.username});
    if (user.length == 0) {
        return res.send('Cannot find user')
    } else {
        try {
            if (await bcrypt.compare(req.body.password, user[0].password)) {
                res.send("Success");
            } else {
                res.send("Not Success");
            };
        } catch {
            res.status(500).send()
        };
    };
});

module.exports = router;