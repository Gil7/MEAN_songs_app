const Song = require('../models/Song')
const fs = require('fs')
const path = require('path')
exports.get_songs = (req, res) => {
    const albumId =  req.params.id
    let find = null
    if (!albumId) {
        find = Song.find().sort('number')
    }
    else {
        find = Song.find({album: albumId}).sort('number')
    }
    find.populate({
        path: 'album',
        populate: {
            path: 'artist',
            model: 'Artist'
        }
    })
    .exec((err, songs) => {
        if (err) {
            return res.status(500).json({
                message: 'Error loading songs',
                error: err
            })
        }
        else {
            if (!songs) {
                res.status(404).json({
                    message: 'Songs not registered yet'
                })
            }
            else {
                res.status(200).json({
                    songs
                })
            }
        }
    })
}
exports.get_song = (req, res) => {
    const songId =  req.params.id
    Song.findById(songId)
    .populate('album')
    .exec((err, song) => {
        if (err) {
            return res.status(500).json({
                message: 'Error loading the song',
                error: err
            })
        }
        else {
            if (!song) {
                res.status(404).json({
                    message: 'Song not found'
                })
            }
            else {
                res.status(200).json({
                    song
                })
            }
        }
    })
}
exports.save_song = (req, res) => {
    const song = new Song()
    song.number = req.body.number
    song.duration = req.body.duration
    song.file = 'null'
    song.album = req.body.album
    song.save((err, songStored) => {
        if (err) {
            return res.status(500).json({
                message: 'Error saving the song',
                error: err
            })
        }
        else {
            if (!songStored) {
                res.status(404).json({
                    message: 'ups! error saving the song'
                })
            }
            else {
                res.status(200).json({
                    message: 'Song saved correctly',
                    song: songStored
                })
            }
        }
    })

} 
exports.update_song = (req, res) => {
    const songId = req.params.id
    const fields_to_update = req.body
    Song.findByIdAndUpdate(songId, fields_to_update, (err, songUpdated) => {
        if (err) {
            return res.status(500).json({
                message:'Error updating the song',
                error: err
            })
        }
        else {
            if (!songUpdated) {
                res.status(404).json({
                    message: 'Song not found'
                })
            }
            else {
                res.status(200).json({
                    message: 'Song modified',
                    song: songUpdated
                })
            }
        }
    })
}
exports.remove_song = (req, res) => {
    const songId = req.params.id
    Song.findByIdAndRemove(songId, (err, songRemoved) => {
        if (err) {
            return res.status(500).json({
                message: 'Error removing the song',
                error: err
            })
        }
        else {
            if (!songRemoved) {
                res.status(404).json({
                    message:'Song not found'
                })
            }
            else {
                res.status(200).json({
                    message: 'Song removed',
                    song: songRemoved
                })
            }
        }
    })
}
exports.add_file = (req, res) => {
    if (req.files) {
        const songId = req.params.id
        const file_path = req.files.file.path
        const file_split = file_path.split('\/')[2]
        const filename = file_split
        const file_ext = filename.split('\.')[1]
        if (file_ext == 'mp3' || file_ext == 'ogg') {
            Song.findByIdAndUpdate(songId, {file : filename}, (err, songUpdated) => {
                if (err) {
                    return res.status(200).json({
                        message: 'Error uploading the file',
                        error: err
                    })
                }
                else {
                    if (!songUpdated) {
                        res.status(404).json({
                            message:'Song not found'
                        })
                    }
                    else {
                        res.status(200).json({
                            song: songUpdated
                        })
                    }
                }
            })
        }
        else{
            res.status(200).json({
                message: 'File type not valid, only mp3 and ogg'
            })
        }
    }
    else {
        res.status(200).json({
            message: 'File not present in the request'
        })
    }
}
exports.get_file = (req, res) => {
    const filename = req.params.filename
    const path_file = `./uploads/songs/${filename}`
    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file))
        }
        else {
            res.status(404).json({
                message:'File not found'
            })
        }
    })
}