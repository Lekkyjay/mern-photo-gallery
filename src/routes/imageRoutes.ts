import express, { Request, Response } from 'express'
import upload from '../utils/multer'
import Image from '../models/Image'
import cloudinary from '../utils/cloudinary'

const router = express.Router()

// test route
router.get('/test', (req: Request, res: Response) => {
  res.send('Welcome to image api')
})

//get all images
router.get('/', async (req, res) => {
  try {
    const results = await Image.find({}).sort({'uploadedAt': -1})
    const files = results.map(result => (
      {
        fileName: result.fileName,
        fileSize: result.fileSize,
        imgWidth: result.imgWidth,
        imgHeight: result.imgHeight,
        imgDesc: result.imgDesc,
        imgType: result.imgType,
        imgSource: result.imgSource,
        imgUrl: result.imgUrl,
        uploadedAt: result.uploadedAt
      }
    ))
    res.status(200).json(files)
  } 
  catch (error) {
    res.send(`error, soemthing went wrong: ${error}`)
  }  
})

//upload an image
router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {  
  if (!req.file) {
    return res.status(400).send('No file was uploaded.')    
  }  

  try {
    const result = await cloudinary.uploader.upload(req.file!.path, {folder: 'gallery'}) 

    const fileName = req.body.name
    const imgWidth = req.body.imgWidth
    const imgHeight = req.body.imgHeight
    const fileSize = req.body.size
    const imgDesc = req.body.imgDesc
    const imgType = req.body.imgType
    const imgSource = req.get('origin')
    const imgUrl = result.secure_url
    const cloudinary_id = result.public_id

    await Image.create({ fileName, fileSize, imgWidth, imgHeight, imgDesc, imgType, imgSource, imgUrl, cloudinary_id })

    return res.status(200).json({ 
      msg: 'File uploaded successfuly',
      data: { fileName, fileSize, imgWidth, imgHeight, imgDesc, imgType, imgSource, imgUrl }
    })
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'database error' })
  }
})

export default router