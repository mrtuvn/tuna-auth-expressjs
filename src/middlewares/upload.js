const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (_, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

module.exports = {
    uploadAvatar: upload.single('avatar')
}