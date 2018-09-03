const fs = require('fs')
const path = require('path')
const Artist = require('../models/Artist')
const Album = require('../models/Album')
const Song = require('../models/Song')
const mongoosePaginate = require('mongoose-pagination')
exports.get_artists = (req, res) => {
    const page = req.params.page ? req.params.page : 1
    const itemsPerPage = 3
    Artist.find()
    .sort('name')
    .paginate(page, itemsPerPage, (err, artists, totalItems) => {
        if (err) {
            return res.status(500).json({
                message: 'Error loading artists',
                error: errr
            })
        }
        else {
            if (!artists) {
                res.status(404).json({
                    message: 'Without artists registered yet'
                })
            }
            else {
                res.status(200).json({
                    message: 'Artist found',
                    total: totalItems,
                    artists
                })
            }
        }
    })

}
exports.save_artist = (req, res) => {
    const artist = new Artist()
    artist.name = req.body.name
    artist.description = req.body.description
    artist.image = 'null'
    artist.save((err, artistStored) => {
        if (err) {
            return res.status(500).json({
                message: 'Error saving the artist',
                error: err
            })
        }
        else {
            if (!artistStored) {
                res.status(404).json({
                    message: 'Error saving the artist'
                })
            }
            else {
                res.status(200).json({
                    message: 'Artist saved correctly',
                    artist: artistStored
                })
            }
        }
    })
}
exports.get_artist = (req, res) => {
    const artistId = req.params.id
    Artist.findById(artistId, (err, artist) => {
        if (err) {
            return res.status(500).json({
                message: 'Error loading the artist',
                error: err
            })
        }
        else {
            if (!artist) {
                res.status(200).json({
                    message: 'Artist not found'
                })
            }
            else {
                res.status(200).json({
                    message:'Artist loaded correctly',
                    artist
                })
            }
        }
    })
}
exports.update_artist = (req, res) => {
    const artistId = req.params.id
    const artist_updated = req.body
    Artist.findByIdAndUpdate(artistId, artist_updated, (err, artistUpdated) => {
        if (err) {
            return res.status(500).json({
                message: 'Error updating the artist',
                error: err
            })
        }
        else {
            if (!artistUpdated) {
                res.status(404).json({
                    message:'Artist not found'
                })
            }
            else {
                res.status(200).json({
                    message: 'Artist updated correctly',
                    artist: artistUpdated
                })
            }
        }
    })
}
exports.delete_artist = (req, res) => {
    const artistId =  req.params.id
    Artist.findOneAndRemove(artistId, (err, artistRemoved) => {
        if (err) {
            return res.status(500).json({
                message: 'Error removing the artist',
                error: err
            })
        }
        else {
            if (!artistRemoved) {
                res.status(404).json({
                    message: 'Artist was not deleted',
                })
            }
            else {
                Album.find({artist: artistRemoved._id})
                .exec((err, albumsFound) => {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error removing the albums of artist',
                            error: err
                        })
                    }
                    else {
                        if (albumsFound) {
                            albumsFound.map((album) => {
                                console.log("removing songs")
                                Song.find({album: album._id}).remove()
                            })
                            Album.find({artist: artistRemoved._id}).remove((err, albumsRemoved) => {
                                if (err) {
                                    console.log("error removing albums")
                                    return res.status(500).json({
                                        error: err,
                                        message: 'Error removing the albums of artist'
                                    })
                                }
                                else {
                                    if (!albumsRemoved) {
                                        console.log("albums not found")
                                        return res.status(404).json({
                                            message: "Artist removed, albums not found"
                                        })
                                    }
                                    else {
                                        console.log('albums removed')
                                        res.status(200).json({
                                            message: 'Artist removed with albums'
                                        })
                                    }


                                }
                            })
                        }
                        else {
                            console.log("artist removed but albums not found")
                            res.status(200).json({
                                message: 'Artist removed'
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
        const artistId = req.params.id
        const file_path = req.files.image.path
        const file_split = file_path.split('\/')[2]
        const file_name = file_split
        const file_ext = file_name.split('\.')[1]
        if (file_ext == 'png' || file_ext == 'jpeg' || file_ext == 'jpg' || file_ext == 'gif') {
            Artist.findOneAndUpdate(artistId, {image: file_name} ,(err, artistUpdated) => {
                if (err) {
                    return res.status(200).json({
                        message: 'Error uploading image',
                        error: err
                    })
                }
                else {
                    if (!artistUpdated) {
                        res.status(404).json({
                            message: 'Artist not found'
                        })
                    }
                    else {
                        res.status(200).json({
                            message: 'Image uploaded correctly',
                            artist: artistUpdated
                        })
                    }
                }
            })
        }
        else{
            res.status(200).json({
                message:'File type is not valid'
            })
        }
    }
    else {
        res.status(200).json({
            message: 'File not preset in the request'
        })
    }
}
exports.get_image =  (req, res) => {
    const path_file = `./uploads/artists/${req.params.image}`
    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file))
        }
        else{
            res.status(404).json({
                message: 'Image not found'
            })
        }
    })
}
