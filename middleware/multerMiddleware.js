// import multer, { diskStorage } from "multer";

// const storage = diskStorage({
//     destination:(req,file,callback)=>{
//         callback(null,'./uploads')
//     },
//     filename:(req,file,callback)=>{
//         const fileName = `image-${Date.now()}-${file.originalname}`
//         callback(null,fileName)
//     }
// })

// const fileFilter = (req,file,callback)=>{
//     if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
//         return callback(null,true)
//     }
//     req.fileValidationError = 'Only png andd jpg file are allowed'
//      callback(null,false)
   
// }



// const multerConfig = multer({storage,fileFilter})

// export default multerConfig
import multer from "multer";
import path from "path";

// Set up storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure "uploads" directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

// Multer Upload Configuration
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 } // 5MB limit
});

// Configure multiple file fields
const uploadFields = upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "castImages", maxCount: 10 } // Allow up to 10 cast images
]);

export default uploadFields;
