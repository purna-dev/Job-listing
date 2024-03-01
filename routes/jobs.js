const express = require('express')
const router = express.Router()
const {createjob,jobDiscription,editjob,getAllJobs} = require('../controller/jobs')
const verifyToken = require('../middleware/authMiddleware')
router.post('/createjob',verifyToken,createjob)

router.get('/:jobid',jobDiscription)
router.get('/',getAllJobs)
router.put('/edit/:jobid',verifyToken,editjob)


module.exports = router