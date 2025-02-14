import multer from "multer";
import path from "path";

// Set up storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); 
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
