const express = require('express')
const api = express.Router()
const SongController = require('../controllers/song')
api.get('/:id?', SongController.get_songs)
api.post('/', SongController.save_song)
api.get('/:id/details', SongController.get_song)
api.put('/:id', SongController.update_song)
api.delete('/:id', SongController.remove_song)
module.exports = api