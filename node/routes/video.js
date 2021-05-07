const express = require("express");
const {getVideo,uploadVideo} = require("./../controllers/video");
const router = express.Router();

router.post('/getVideo',getVideo);
router.post('/uploadVideo',uploadVideo);



module.exports = router;