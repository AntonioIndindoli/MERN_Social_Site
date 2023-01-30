const User = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createJWT, } = require("../utils/auth");
const multer = require('multer');
const sharp = require("sharp");
const crypto = require("crypto");
const storage = multer.memoryStorage()
const upload = multer();

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const signup = (req, res, next) => {
    let { name, email, password, password_confirmation } = req.body; let errors = [];
    let img = 'noImage'
    let bio = 'No information given.'
    if (!name) {
        errors.push({ name: "required" });
    } if (!email) {
        errors.push({ email: "required" });
    } if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid" });
    } if (!password) {
        errors.push({ password: "required" });
    } if (!password_confirmation) {
        errors.push({
            password_confirmation: "required",
        });
    } if (password != password_confirmation) {
        errors.push({ password: "mismatch" });
    } if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    } User.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(422).json({ errors: [{ user: "email already exists" }] });
            } else {
                const user = new User({
                    name: name,
                    email: email,
                    password: password,
                    bio: bio,
                    img: img,
                }); bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) throw err;
                        user.password = hash;
                        user.save()
                            .then(response => {
                                res.status(200).json({
                                    success: true,
                                    result: response
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    errors: [{ error: err }]
                                });
                            });
                    });
                });
            }
        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Something went wrong' }]
            });
        })
}
const signin = (req, res) => {
    let { email, password } = req.body; let errors = [];
    if (!email) {
        errors.push({ email: "required" });
    } if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid email" });
    } if (!password) {
        errors.push({ password: "required" });
    } if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    } User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.status(404).json({
                errors: [{ user: "not found" }],
            });
        } else {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch) {
                    return res.status(400).json({
                        errors: [{
                            password:
                                "incorrect"
                        }]
                    });
                } let access_token = createJWT(
                    user.email,
                    user._id,
                    3600
                );
                jwt.verify(access_token, process.env.TOKEN_SECRET, (err,
                    decoded) => {
                    if (err) {
                        res.status(500).json({ errors: err });
                    }
                    if (decoded) {
                        return res.status(200).json({
                            success: true,
                            token: access_token,
                            message: user
                        });
                    }
                });
            }).catch(err => {
                res.status(500).json({ errors: err });
            });
        }
    }).catch(err => {
        res.status(500).json({ errors: err });
    });
}

const updateUser = async (req, res) => {

    // Get the id off the url
    const userName = req.params.user;
    var img = 'noImage'
    // Get the data off the req body
    const { bio } = req.body;
    if (req.file) {
        img = await sharp(req.file.buffer)
            .resize({ width: 144 })
            .toBuffer()
        img = Buffer.from(img).toString('base64')
        if (!bio.length) {
            await User.findOneAndUpdate({ "name": userName }, {
                img
            });
        }
        else {
            await User.findOneAndUpdate({ "name": userName }, {
                bio,
                img
            });
        }
    } else if (bio.length) { {
            await User.findOneAndUpdate({ "name": userName }, {
                bio
            });
        }
    }

    // Find updated User
    const users = await User.find({ "name": userName });

    // Respond with it
    res.json({ users });
};

const fetchUsers = async (req, res) => {
    // Find the users
    const users = await User.find();

    // Respond with them
    res.json({ users });
};

const fetchUser = async (req, res) => {
    // Get id off the url
    var userurl = req.params.user;
    const user = await User.find({ "name": userurl });

    // Respond with the user
    res.json({ user });
};

const deleteUser = async (req, res) => {
    // get id off url
    const userId = req.params.id;

    // Delete the record
    await user.deleteOne({ id: userId });

    // Respond
    res.json({ success: "Record deleted" });
};

module.exports = {
    fetchUsers,
    fetchUser,
    signin,
    signup,
    updateUser,
    deleteUser,
};