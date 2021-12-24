var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
const FormsCtrl = require('../controllers/formController')
const UserCtrl = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.post('/saveForm', FormsCtrl.saveForm)
router.put('/updateForm/:id', FormsCtrl.updateForm)
router.delete('/deleteForm/:id', FormsCtrl.deleteForm)
router.get('/getFormById/:id', FormsCtrl.getFormById)
router.get('/getAllForm', FormsCtrl.getForms)



// user submission routes
router.post('/saveUserSubmission', UserCtrl.saveUserSubmission)
router.post('/saveNewUserSubmissions', UserCtrl.saveNewUserSubmissions)
router.put('/updateUserSubmission/:id', UserCtrl.updateUserSubmission)
router.post('/deleteUserSubmission', UserCtrl.deleteUserSubmission)
router.get('/getUserSubmissionById/:id', UserCtrl.getUserSubmissionById)
router.get('/getAllUserSubmission', UserCtrl.getUserSubmissions)
router.post('/getAllUserSubmissionByFormName', UserCtrl.getUserSubmissionsByFormName)

module.exports = router;
