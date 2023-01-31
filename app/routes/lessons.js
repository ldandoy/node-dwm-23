const express = require('express');

const lessonModel = require('../models/lesson');
const classeModel = require('../models/classe');

let router = express.Router();

router.post('/', async (request, response) => {
    const {label, classeId} = request.body;

    if (typeof label == "undefined" || label == "") {
        return response.status(500).json({
            msg: "Vous devez donner un nom à votre lesson !"
        });
    }

    try {
        let lesson = await lessonModel.create({
            label,
            classe: classeId
        });

        await classeModel.findOneAndUpdate({
            _id: classeId
        }, {
            "$push": { "lessons": lesson._id }
        })
        
        return response.status(200).json(lesson);
    } catch(error) {
        console.log(error)
        return response.status(500).json({
            msg: error
        });
    }
});

router.get('/', async (request, response) => {
    try {
        let lessons = await lessonModel
            .find()
            .populate('classe')
            .populate('sessions');
        
        return response.status(200).json(lessons);
    } catch(error) {
        return response.status(500).json({
            msg: error
        });
    }
});

router.get('/:id', async (request, response) => {
    const {id} = request.params;

    try {
        let lesson = await lessonModel
            .findOne({_id: id})
            .populate('classe')
            .populate('sessions');
        
        return response.status(200).json(lesson);
    } catch(error) {
        console.log(error)
        return response.status(500).json({
            msg: error
        });
    }
});

router.delete('/:id', async (request, response) => {
    const {id} = request.params;

    try {
        await lessonModel.findOneAndDelete({
            _id: id
        });

        response.status(200).json({
            msg: "Lesson bien supprimée !"
        });
    } catch(error) {
        return response.status(500).json({
            msg: error
        });
    }
});

module.exports = router;