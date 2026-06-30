import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

const baseUploadDir = path.join(__dirname, "../../uploads");

// ensure a subfolder exists, creating it if needed
const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDir(baseUploadDir);

const createStorage = (folder: string) => {
  const dir = path.join(baseUploadDir, folder);
  ensureDir(dir);

  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = uuidv4();
      const extension = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
    },
  });
};

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"));
  }
  cb(null, true);
};

const createUploader = (folder: string) =>
  multer({
    storage: createStorage(folder),
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5mb limit
  });

// Pre-built uploaders per resource type
const profileUpload = createUploader("profiles");
const phoneUpload = createUploader("phones");
const categoryUpload = createUploader("categories");

export const uploads = {
  profile: {
    single: (fieldName: string) => profileUpload.single(fieldName),
    array: (fieldName: string, maxCount: number) =>
      profileUpload.array(fieldName, maxCount),
  },
  phone: {
    single: (fieldName: string) => phoneUpload.single(fieldName),
    array: (fieldName: string, maxCount: number) =>
      phoneUpload.array(fieldName, maxCount),
  },
  category: {
    single: (fieldName: string) => categoryUpload.single(fieldName),
    array: (fieldName: string, maxCount: number) =>
      categoryUpload.array(fieldName, maxCount),
  },
};
