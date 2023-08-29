var express = require('express');
const cors = require('cors');
const axios = require('axios');
var path = require('path');
const multer = require('multer');
require('dotenv').config();
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(express.json());
app.use(cors());

const classifyUploadImage = async (req, res) => {
  const imageBuffer = req.file.buffer;
  //test
  // Custom Vision API endpoint and prediction key
  const apiUrl =
    'https://carrecognition-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/ec0a3564-e910-4696-85c0-4bfc5bcad21c/classify/iterations/Iteration2/image';
  const predictionKey = 'deada5e2d236460abff2bf2b0c9f1616';

  try {
    const response = await axios.post(apiUrl, imageBuffer, {
      headers: {
        'Prediction-Key': predictionKey,
        'Content-Type': 'application/octet-stream',
      },
    });

    // Respond with the classification result
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

app.post('/classifyuploadimage', upload.single('image'), classifyUploadImage);
module.exports = app;
