const express =  require('express')
const api = express.Router()
const ArtistController = require('../controllers/artist')
const middlewares = require('../middlewares/check-auth')
const multipart = require('connect-multiparty')
const md_files = multipart({ uploadDir: './uploads/artists' })
api.get('/:page?', middlewares.verify_auth ,ArtistController.get_artists)
api.post('/', middlewares.verify_auth ,ArtistController.save_artist)
api.get('/edit/:id', middlewares.verify_auth , ArtistController.get_artist)
api.put('/:id', middlewares.verify_auth ,ArtistController.update_artist)
api.delete('/:id', middlewares.verify_auth ,ArtistController.delete_artist)
api.post('/add-image/:id', [middlewares.verify_auth ,md_files], ArtistController.add_image)
api.get('/get-image/:image' ,ArtistController.get_image)
module.exports = api
