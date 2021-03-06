const {Router} = require('express');
const multer = require('multer');
const path = require('path');


const photoPath = path.resolve(__dirname, '../../client/photo-viewer.html')
const storage = multer.diskStorage({
  destination: 'api/uploads/',
  filename: filename,
});

const router = Router();

const upload = multer({
  fileFilter: fileFilter,
  storage,
});

router.post('/upload', upload.single('photo'), (req, res) => {
  if (req.fileValidationError) {
    res.status(400).json({error: req.fileValidationError});
  } else {
    res.status(201).json({success: true});
  }
});

router.get('/photo-viewer', (req, res) => {
  res.sendFile(photoPath)
})

function filename(request, file, callback) {
  callback(null, file.originalname);
}

function fileFilter(request, file, callback) {
  if (file.mimetype !== 'image/png') {
    request.fileValidationError = 'Wrong file type';
    callback(null, false, new Error('Wrong file type'));
  } else {
    callback(null, true);
  }
}

module.exports = router;
