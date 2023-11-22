import * as fs from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
export const storage = diskStorage({
  destination(req, file, cb) {
    const uploadPath = `./uploads/${req.headers.region}/${req.params.type}`;

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
  },
});
