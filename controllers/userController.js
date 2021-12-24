const Users = require('../models/userModel')
const Forms = require('../models/formModel')

saveUserSubmission = (req, res) => 
{
    console.log(req.body);
    const body = req.body
    if (!body) 
    {
        return res.status(400).json({success: false,error: 'You must provide a Forms',})
    }
    const formstaterData = { title:req.body.title, submissionCount : 1, formJson : req.body.formaster }
    const forms = new Users(body)
    const formsData = new Forms(formstaterData)
    if (!forms) {
        return res.status(400).json({ success: false, error: err })
    }
    Forms.countDocuments({title : req.body.title }, function (err, count){ 
        if(count > 0){
            Users.countDocuments({title : req.body.title },(err,count) => {
                Forms.findOneAndUpdate({title : req.body.title},{$set:{submissionCount:count + 1}})
                          .then(() => {
                         forms.save().then(() => {
                            return res.status(200).json({success: true,id: forms._id,message: 'Form created!',})
                        }).catch(error => {
                            return res.status(400).json({error,message: 'Form not created!',
                        })
                    })
                })
                .catch(e => console.log(e))        
            })         
        }else {     
            formsData.save().then(() => {
                forms.save().then(() => {
                    return res.status(200).json({success: true,id: forms._id,message: 'Form created!',})
                }).catch(error => {
                    return res.status(400).json({error,message: 'Form not created!',})
                })
            }).catch(error => {
                    return res.status(400).json({error,message: 'Form not created!',})
            })
        }      
    });                    

}


// save user submission for edit view
saveNewUserSubmissions = (req,res) => {
    console.log(req.body);
    const body = req.body
    if (!body) 
    {
        return res.status(400).json({success: false,error: 'You must provide a Forms',})
    }
    const formstaterData = {title:req.body.title, submissionCount : 1, formJson : req.body.formaster}
    const forms = new Users(body)
    const formsData = new Forms(formstaterData)    
    if (!forms) {
        return res.status(400).json({ success: false, error: err })
    }
    Users.countDocuments({title : req.body.title },(err,count) => {
        Forms.findOneAndUpdate({title : req.body.title},{$set:{submissionCount:count + 1}})
          .then(() => {
                 forms.save().then(() => {
                    return res.status(200).json({success: true,id: forms._id,message: 'Form created!',})
                })
                .catch(error => {
                    return res.status(400).json({error, message: 'Form not created!',})
                })
          })
          .catch(e => console.log(e))        
    })
}

// get submission by form name

getUserSubmissionsByFormName = async (req,res) => {

    await Users.find({ title : req.body.title }).sort({createdAt: -1}).exec((err, submissions) => {
            if (err) {
            return res.status(400).json({ success: false, error: err })
        } 

        if (!submissions) {
            return res.status(404).json({ success: false, error: `Submissions not found` })
        }
        return res.status(200).json({ success: true, data: submissions })
    })
     .catch(err => console.log(err))


    // await Users.find({ title : req.body.title }, (err, submissions) => {
    //     if (err) {
    //         return res.status(400).json({ success: false, error: err })
    //     } 

    //     if (!submissions) {
    //         return res.status(404).json({ success: false, error: `Submissions not found` })
    //     }
    //     return res.status(200).json({ success: true, data: submissions })
    // }).catch(err => console.log(err))
}



updateUserSubmission = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({success: false, error: 'You must provide a body to update',})
    }
    Users.findOne({ _id: req.params.id }, (err, forms) => {
        if (err) {
            return res.status(404).json({err, message: 'Forms not found!',})
        }
        forms.title = body.title
        forms.formJson = body.formJson       
            forms.save().then(() => {
                return res.status(200).json({success: true,id: forms._id,message: 'Form updated!',})
            })
            .catch(error => {
                return res.status(404).json({error,message: 'Form not updated!',})
            })
    })
}

// delete user submission record

deleteUserSubmission =  (req, res) => {
    Users.countDocuments({title : req.body.title},(err,count) => {
       Forms.findOneAndUpdate({_id:req.body.formId},{$set:{submissionCount:count - 1}})
       .then(() => {
            Users.findOneAndDelete({ _id: req.body.id }, (err, submission) => {
               if (err) {
                   return res.status(400).json({ success: false, error: err })
               }
        
               if (!submission) {
                   return res.status(404).json({ success: false, error: `Delete Record Not Found` })
               }
        
               return res.status(200).json({ success: true, data: submission })
           }).catch(err => console.log(err))

       })
       .catch(e => console.log(e))
   })

}

getUserSubmissionById = async (req, res) => {
    await Users.findOne({ formId : req.params.id }, (err, forms) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        } 
        if (!forms) {
            return res.status(404).json({ success: false, error: `Forms not found` })
        }
        return res.status(200).json({ success: true, data: forms })
    }).catch(err => console.log(err))
}


getUserSubmissions = async (req, res) => {
     await Users.find({}).sort({createdAt: -1}).exec((err, forms) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!forms.length) {
            return res.status(404).json({ success: false, error: `Forms not found` })
        }
        return res.status(200).json({ success: true, data: forms })
    })
     .catch(err => console.log(err))

  
}
module.exports = 
{
    saveUserSubmission,
    saveNewUserSubmissions,
    updateUserSubmission,
    deleteUserSubmission,
    getUserSubmissions,
    getUserSubmissionById,
    getUserSubmissionsByFormName
    // saveUserSubmission
}