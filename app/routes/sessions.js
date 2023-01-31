const express = require('express');

const sessionModel = require('../models/session');
const lessonsModel = require('../models/lesson');

let router = express.Router();

router.post('/', async (request, response) => {
    const {lessonId} = request.body;

    try {
        let session = await sessionModel.create({
            lesson: lessonId
        });
        session = await session.populate('lesson')

        await lessonsModel.findOneAndUpdate({
            _id: lessonId
        }, {
            "$push": {"sessions": session._id}
        },{
            new: true
        })

        return response.status(200).json(session);
    } catch(error) {
        console.log(error)
        return response.status(500).json({
            msg: error
        });
    }
});

router.delete('/lessions/:lessionId/sessions/:sessionId', async (request, response) => {
    const {lessionId, sessionId} = request.params;

    try {
        // On gère la session
        await sessionModel.findOneAndDelete({
            _id: sessionId
        });

        // Il faut supp de la lession lié
        await lessonsModel.findOneAndUpdate({
            _id: lessionId
        }, {
            "$pull": { "sessions": sessionId }
        })

        response.status(200).json({
            msg: "Session bien supprimée !"
        });
    } catch(error) {
        return response.status(500).json({
            msg: error
        });
    }
});

module.exports = router;