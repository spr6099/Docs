// install multer
// add this in router
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // .jpg
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/", upload.single("file"), createProduct)

// controller
req.file.filename;

// indexedDB.js
app.use("/uploads", express.static("uploads"));





// ================== CLOUDINARY ===========================

//1) npm install cloudinary multer-storage-cloudinary

//2) Create config/cloudinary.js
// ---------------------------------
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// export default cloudinary;

// 3) productRoutes.js
// ------------------------
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "products", // folder name in cloudinary
//     allowed_formats: ["jpg", "png", "jpeg"],
//   },
// });

// const upload = multer({ storage });

// 4) update in controller
// ---------------------------
    const image = req.file?.path; 
    // 🔥 cloudinary gives URL in path

