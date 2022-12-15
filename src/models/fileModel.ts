import mongoose, { Document } from "mongoose";

interface IFile extends Document {
  fileName: string,
  fileSize: string,
  imgWidth: number,
  imgHeight: number,
  imgDesc: string,
  imgType: string,
  imgSource: string,
  imgData: Buffer,
  uploadedAt: Date
}

const FileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    fileSize: { type: String, required: true },
    imgWidth: { type: Number, required: true },
    imgHeight: { type: Number, required: true },
    imgDesc: { type: String, required: true },
    imgType: { type: String, required: true },
    imgSource: { type: String },
    imgData: { type: Buffer, contentType: String },
    uploadedAt: { type: Date, default: Date.now }
  }
);

const File = mongoose.model<IFile>("File", FileSchema);

export default File;