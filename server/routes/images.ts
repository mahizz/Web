import * as path from 'path';
import { NextFunction, Request, Response, Router } from "express";
import * as multer from 'multer';
//import * as rimraf from 'rimraf';

const imagesRouter: Router = Router();

let storage: multer.StorageEngine = multer.diskStorage({
  destination: path.resolve(__dirname, '../../../src/assets/'), //'/var/www/html/aqueous-citadel-50092/src/assets',
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
  }
});

let upload: multer.Instance = multer({ storage: storage });

imagesRouter.post('/', upload.any(), (req: Request, res: Response) => {
  //rimraf.sync('uploads/**/*');
  res.status(200).json(req.files);
});


export { imagesRouter };