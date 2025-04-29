const multer = require('multer');  // Correct import

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileName = file.originalname.split('.').slice(0, -1).join('.');
        cb(null, file.fieldname + '-' + uniqueSuffix + ".png");
    }
});

exports.upload = multer({ storage: storage });