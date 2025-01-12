import express from 'express'
import { generateImage , getUserGallery} from '../controllers/imageController.js'
import userAuth from '../middlewares/auth.js'

const imageRouter = express.Router()

imageRouter.post('/generate-image', userAuth, generateImage)
imageRouter.get('/gallery/:userId', getUserGallery)

export default imageRouter