const express = require('express');

const classeModel = require('../models/classe');
const studentModel = require('../models/student');

let router = express.Router();

router.post('/', async (request, response) => {
    const {label} = request.body;

    if (typeof label == "undefined" || label == "") {
        return response.status(500).json({
            msg: "Vous devez donner un nom à votre classe !"
        });
    }

    try {
        let classe = await classeModel.create({
            label
        });
        
        return response.status(200).json(classe);
    } catch(error) {
        return response.status(500).json({
            msg: error
        });
    }
});

router.post('/add-student', async (request, response) => {
    const {studentId, classeId} = request.body;

    try {
        const classe = await classeModel.findOneAndUpdate({
            _id: classeId
        }, {
            "$push": { "students": studentId }
        },{
            new: true
        }).populate('students');

        await studentModel.findOneAndUpdate({
            _id: studentId
        }, {
            classe: classe
        });

        return response.status(200).json(classe);
    } catch(error) {
        return response.status(500).json({
            msg: error
        });
    }
});

router.get('/', async (request, response) => {
    try {
        classes = await classeModel.find()
            .populate({ path: 'students', select: '-password' })
            .populate({ path: 'lessons'});

        return response.status(200).json(classes);
    } catch(error) {
        return response.status(500).json({
            msg: error
        });
    }
});

router.get('/:id', async (request, response) => {
    const {id} = request.params;

    try {
        let classe = await classeModel.findOne({
            _id: id
        });

        response.status(200).json(classe);
    } catch(error) {
        return response.status(500).json({
            msg: error
        });
    }
});

router.delete('/:id', async (request, response) => {
    const {id} = request.params;

    try {
        await classeModel.findOneAndDelete({
            _id: id
        });

        response.status(200).json({
            msg: "Classe bien supprimée !"
        });
    } catch(error) {
        return response.status(500).json({
            msg: error
        });
    }
});

router.put('/:id', async (request, response) => {
    const {id} = request.params;
    const {name} = request.body;

    try {
        let classe = await classeModel.findOneAndUpdate({
            _id: id
        }, {
            name
        }, {
            new: true
        });

        response.status(200).json(classe);
    } catch(error) {
        return response.status(500).json({
            msg: error
        });
    }
});

module.exports = router;