import mongoose, { Document } from "mongoose";

interface IImage extends Document {
  fileName: string,
  fileSize: string,
  imgWidth: number,
  imgHeight: number,
  imgDesc: string,
  imgType: string,
  imgSource: string,
  imgUrl: string,
  cloudinary_id: string
  uploadedAt: Date
}

const ImageSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    fileSize: { type: String, required: true },
    imgWidth: { type: Number, required: true },
    imgHeight: { type: Number, required: true },
    imgDesc: { type: String, required: true },
    imgType: { type: String, required: true },
    imgSource: { type: String },
    imgUrl: { type: String },
    cloudinary_id: { type: String },
    uploadedAt: { type: Date, default: Date.now }
  }
);

const Image = mongoose.model<IImage>("Image", ImageSchema);

export default Image;