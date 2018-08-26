const User = require('../models/User')
const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')
const jwtservice = require('../services/jwt')
exports.get_users = (req, res, next) => {
    User.find()
        .select('_id username email name image')
        .exec()
        .then(users => {
            res.status(200).json({
                count: users.length,
                users: users.map(user => {
                    return {
                        email: user.email,
                        name: user.name,
                        username: user.username,
                        _id: user._id,
                        image: user.image,
                        request: {
                            type: 'GET',
                            url: `http://localhost:3000/users/${user._id}`
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}
exports.save_user = (req, res, next) => {
    User.find({
        email: req.body.email
    })
    .exec()
    .then(result => {
        if (result.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists.'
            })
        }
        if (req.body.password) {
            bcrypt.hash(req.body.password,10, (err, hash) => {
                if (err) {
                    return res.status(200).json({
                        error: err,
                        success: false
                    })
                }
                if (req.body.email != null
                    && req.body.name != null
                    && req.body.username != null) {
                    const user = new User()
                    user.name = req.body.name
                    user.email = req.body.email
                    user.username = req.body.username
                    user.image = 'null'
                    user.role = 'ROLE_USER'
                    user.password = hash
                    user.save((err, userStored) => {
                        if (err) {
                            res.status(500).json({
                                error :err,
                                success: false
                            })
                        }
                        if (!userStored) {
                            res.status(401).json({
                                message: 'Error saving user',
                                success: false
                            })
                        }
                        else {
                            res.status(200).json({
                                message: 'User created successfully',
                                user : userStored,
                                success: true
                            })
                        }
                    } )
                    
                }
                else {
                    res.status(200).json({
                        message: 'All fields are required',
                        success: false
                    })
                }
            })
        }
        else{
            res.status(200).json({
                success: false,
                message: 'Password is required'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })
}
exports.login_user = (req, res, next) => {
    console.log(req.body)
    User
    .findOne({email: req.body.email}, (err, user) => {
        if (err) {
            res.status(500).json({
                message: `The emails doesn't exists`,
                error: err
            })
        }
        else {
            
            if (!user) {
                res.status(404).json({
                    message: `This user doesn't exists`,
                })
            }
            else {
                
                bcrypt.compare(req.body.password, user.password, (err, check) => {
                    if (check) {
                        if (req.body.gethash) {
                            token = jwtservice.generate_token(user)
                            res.status(200).json({
                                user,
                                token
                            })
                        }
                        else {
                            res.status(200).json({
                                user
                            })
                        }
                    }
                    else {
                        res.status(404).json({
                            message: 'Login fails, bad password',
                        })
                    }
                })
            }
        }
    })
}
exports.update_user = (req, res, next) => {
    const userId = req.params.id
    const newData = req.body
    User.findByIdAndUpdate(userId, newData, (err, userUpdated) => {
        if (err) {
            return res.status(500).json({
                error: err,
                message: 'Error updating the user'
            })
        }
        else {
            if (!userUpdated) {
                res.status(404).json({
                    message: 'User not found'
                })
            }
            else {
                res.status(200).json({
                    user: userUpdated,
                    message: 'User modified correctly'
                })
            }
        }
    })
}
exports.add_avatar = (req, res, next) => {
    if (req.files) {
        const userId = req.params.id
        const file_path = req.files.avatar.path
        const file_split = file_path.split('\/')[2]
        const filename = file_split
        const file_ext = filename.split("\.")[1]
        if (file_ext == 'png' || file_ext == 'jpeg' || file_ext == 'jpg' || file_ext == 'gif') {
            User.findByIdAndUpdate(userId, {image: filename}, (err, userUpdated) => {
                if (err) {
                    return res.status(500).json({
                        error: err,
                        message: 'A error was ocurred'
                    })
                }
                else {
                    if (!userUpdated) {
                        res.status(401).json({
                            message: 'User not found'
                        })
                    }
                    else {
                        res.status(200).json({
                            message: 'Avatar uploaded correclty',
                            user: userUpdated,
                            image: filenam
                        })
                    }
                }
            })
        }
        else {
            res.status(200).json({
                message: 'File type is not valid'
            })
        }
    }
    else {
        res.status(200).json({
            message: 'file is neccesary, valid extensions: png, jpg, gif'
        })
    }
}
exports.get_image_file = (req, res) => {
    const image_file = req.params.imagefile

    const path_image_file = `./uploads/users/${image_file}` 
    fs.exists(path_image_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_image_file))
        }
        else {
            res.status(200).json({
                message : 'File does not exists'
            })
        }
    })
}