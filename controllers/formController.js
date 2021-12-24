const Forms = require('../models/formModel')

saveForm = (req, res) => 
{
    console.log(req.body);
    const body ={
        title:req.body.title,
        submissionCount : 0,
        formJson : req.body.formJson
    }
    if (!body) 
    {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Forms',
        })
    }

    const forms = new Forms(body)

    if (!forms) {
        return res.status(400).json({ success: false, error: err })
    }

    forms
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                id: forms._id,
                message: 'Form created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Form not created!',
            })
        })
}

updateForm = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Forms.findOne({ _id: req.params.id }, (err, forms) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Forms not found!',
            })
        }
        forms.title = body.title
        forms.formJson = body.formJson       
        forms
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: forms._id,
                    message: 'Form updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Form not updated!',
                })
            })
    })
}

deleteForm = async (req, res) => {
    await Forms.findOneAndDelete({ _id: req.params.id }, (err, forms) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!forms) {
            return res
                .status(404)
                .json({ success: false, error: `Forms not found` })
        }

        return res.status(200).json({ success: true, data: forms })
    }).catch(err => console.log(err))
}

getFormById = async (req, res) => {
    await Forms.findOne({ _id: req.params.id }, (err, forms) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        } 

        if (!forms) {
            return res
                .status(404)
                .json({ success: false, error: `Forms not found` })
        }
        return res.status(200).json({ success: true, data: forms })
    }).catch(err => console.log(err))
}

getForms = async (req, res) => {

    await Forms.find({}).sort({createdAt: -1}).exec((err, forms) => {
           if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!forms.length) {
            return res
                .status(404)
                .json({ success: false, error: `Forms not found` })
        }
      
        return res.status(200).json({ success: true, data: forms })
    })
     .catch(err => console.log(err))

   
}


// user submission handling
saveUserSubmission = (req, res) => 
{
    console.log(req.body);
    const body = req.body
    if (!body) 
    {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Forms',
        })
    }

    const forms = new Users(body)

    if (!forms) {
        return res.status(400).json({ success: false, error: err })
    }

    forms
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                id: forms._id,
                message: 'User submissions created !',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User submissions not created!',
            })
        })
}



module.exports = 
{
    saveForm,
    updateForm,
    deleteForm,
    getForms,
    getFormById,
    saveUserSubmission
}