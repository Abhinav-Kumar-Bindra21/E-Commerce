import multer from "multer";
import { Request, Response } from "express";

const storage = multer.diskStorage({
  filename: function (req: Request, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
