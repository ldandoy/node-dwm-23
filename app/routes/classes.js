const express = require('express');
const { v4: uuidv4 } = require('uuid');
const classeModel = require('../models/classe');

let router = express.Router();

let classes = [];

router.post('/', async (request, response) => {
    const {name} = request.body;

    try {
        let classe = await classeModel.create({
            name
        });
        
        return response.status(200).json(classe);
    } catch(error) {
        return response.status(500).json({
            msg: error
        });
    }
});

router.get('/', (request, response) => {
    response.status(200).json(classes);
});

router.get('/:id', (request, response) => {
    const {id} = request.params;

    let classe = classes.find(item => item.id === id);

    response.status(200).json(classe);
});

router.delete('/:id', (request, response) => {
    const {id} = request.params;

    classes = classes.filter(object => { return object.id !== id; });

    response.status(200).json(classes);
});

router.put('/:id', (request, response) => {
    const {id} = request.params;
    const {name} = request.body;

    let classe = classes.find(item => item.id === id);

    classe.name = name;

    response.status(200).json(classe);
})

module.exports = router;