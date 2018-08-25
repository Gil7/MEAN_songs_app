const Album =  require('../models/Album')
const Song = require('../models/Song')
const fs = require('fs')
const path = require('path')

exports.get_albums = (req, res) => {
    const artistId =  req.params.artist
    let find = null
    if (!artistId) {
        find = Album.find({}).sort('title')
    }
    else {
        find = Album.find({artist: artistId}).sort('year')
    }
    find.populate('artist', 'name description')
        .exec((err, albums) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error loading albums',
                    error: err
                })
            }
            else {
                if (!albums) {
                    res.status(404).json({
                        message: 'There are not albums registered yet'
                    })
                }
                else {
                    res.status(200).json({
                        albums
                    })
                }
            }
        })
}
exports.save_album = (req, res) => {
    const album = new Album()
    album.title = req.body.title
    album.description = req.body.description
    album.year = req.body.year
    album.image = 'null',
    album.artist = req.body.artist
    album.save((err, albumStored) => {
        if (err) {
            return res.status(500).json({
                message: 'Error saving the album',
                error: err
            })
        }
        else {
            if (!albumStored) {
                res.status(404).json({
                    message: 'Error saving the album'
                })
            }
            else {
                res.status(200).json({
                    message: 'Album saved correctly',
                    album: albumStored
                })
            }
        }
    })
}
exports.get_album = (req, res) => {
    const albumId = req.params.id
    Album.findById(albumId)
    .populate('artist', 'name description')
    .exec((err, album) => {
        if (err) {
            return res.status(500).json({
                message: 'Error loading the album'
            })
        }
        else {
            if (!album) {
                res.status(404).json({
                    message: 'Album not found'
                })
            }
            else {
                res.status(200).json({
                    album
                })
            }
        }
    })
    
}
exports.update_album = (req, res) => {
    const albumId = req.params.id
    const album_changed = req.body
    Album.findByIdAndUpdate(albumId, album_changed, (err, albumUpdated) => {
        if (err) {
            return res.status(500).json({
                message:'Error saving the album',
                error: err
            })
        }
        else {
            if (!albumUpdated) {
                res.status(404).json({
                    message: 'Album not found'
                })
            }
            else {
                res.status(200).json({
                    message: 'Album updated',
                    album: albumUpdated
                })
            }
            
        }
    })
}
exports.remove_album = (req, res) => {
    const albumId = req.params.id
    Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
        if (err) {
            return res.status(500).json({
                message: 'Error removing the album',
                error: err
            })
        }
        else {
            if (!albumRemoved) {
                res.status(404).json({
                    message: 'Album not found'
                })
            }
            else {
                Song.find({ album: albumId }).remove((err, songsDeleted) => {
                    if (err) {
                        return res.status(500).json({
                            message: 'Album deleted but songs not deleted',
                            error: err
                        })
                    }
                    else {
                        if (!songsDeleted) {
                            res.status(200).json({
                                message: 'Album deleted correctly'
                            })
                        }
                        else {
                            res.status(200).json({
                                message: 'Album and songs deleted'
                            })
                        }
                    }
                })
            }
            
            
        }
    })
}
exports.add_image = (req, res) => {
    if (req.files) {
        const albumId = req.params.id
        const file_path = req.files.image.path
        const file_split = file_path.split('\/')[2]
        const file_name = file_split
        const file_ext = file_name.split('\.')[1]
        if (file_ext == 'png' || file_ext == 'jpeg' || file_ext == 'jpg' || file_ext == 'gif') {
            Album.findOneAndUpdate(albumId, { image: file_name }, (err, albumUpdated) => {
                if (err) {
                    return res.status(200).json({
                        message: 'Error uploading image',
                        error: err
                    })
                }
                else {
                    if (!albumUpdated) {
                        res.status(404).json({
                            message: 'Album not found'
                        })
                    }
                    else {
                        res.status(200).json({
                            message: 'Image uploaded correctly',
                            album: albumUpdated
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
            message: 'File not present in the request'
        })
    }
}
exports.get_image = (req, res) => {
    const path_image = `./uploads/albums/${req.params.image}`
    fs.exists(path_image, (exists) => {
        if (!exists) {
            res.status(404).json({
                success: false,
                message: 'Image not found'
            })
        }
        else {
            res.sendFile(path.resolve(path_image))
        }
    })
}