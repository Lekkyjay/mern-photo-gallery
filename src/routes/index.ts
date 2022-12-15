import express, { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import path from 'path'
import File from '../models/fileModel'

const router = express.Router()

// test route
router.get('/test', (req: Request, res: Response) => {
  res.send('Welcome to image api')
})

//get all images
router.get('/', async (req, res) => {
  try {
    const results = await File.find({}).sort({'uploadedAt': 'desc'})
    const files = results.map(result => (
      {
        fileName: result.fileName,
        fileSize: result.fileSize,
        imgWidth: result.imgWidth,
        imgHeight: result.imgHeight,
        imgDesc: result.imgDesc,
        imgType: result.imgType,
        imgSource: result.imgSource,
        uploadedAt: result.uploadedAt,
        imgData: result.imgData
      }
    ))
    res.status(200).json(files)
  } 
  catch (error) {
    res.send(`error, soemthing went wrong: ${error}`)
  }  
})

//upload an image
router.post('/upload', async (req: Request, res: Response) => {  
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No file was uploaded.')
    return
  }  

  const file = req.files.file as UploadedFile
  const fileName = file.name
  const fileSize = file.size
  const imgData = file.data
  const imgWidth = req.body.imgWidth
  const imgHeight = req.body.imgHeight
  const imgDesc = req.body.imgDesc
  const imgType = req.body.imgType
  const imgSource = req.get('origin')

  const extensionName = path.extname(file.name);
  const allowedExtension = ['.png', '.PNG','.jpg','.jpeg']

  if(!allowedExtension.includes(extensionName)){
    return res.status(422).send("Invalid Image")
  }

  try {
    const image = await File.create({ fileName, fileSize, imgWidth, imgHeight, imgDesc, imgType, imgSource, imgData })
    return res.status(200).json({ 
      msg: 'File uploaded successfuly',
      data: { fileName, fileSize, imgWidth, imgHeight, imgDesc, imgSource }
    })
  } 
  catch (error) {
    return res.status(500).json({ msg: 'database error' })
  }
})

export default router