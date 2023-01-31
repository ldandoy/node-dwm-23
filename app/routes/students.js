const express = require('express');
const bcrypt = require('bcrypt');

const studentModel = require('../models/student');

const router = express.Router();

router.post('/register', async (request, response) => {
    const { email, 
        email_cfg, 
        password, 
        password_cfg, 
        firstname, 
        lastname 
    } = request.body;

    if ( (typeof email === 'undefined' || email.trim() === "") 
        || (typeof password === 'undefined' || password.trim() === "")
    ) {
        return response.status(500).json({
            msg: "Il faut remplir tous les champs !"
        });
    }

    if (email !== email_cfg || password !== password_cfg) {
        return response.status(500).json({
            msg: "Les confirmations ne sont pas exactes !"
        });
    }

    try {
        let exists = await studentModel.findOne({email});

        if (exists) {
            return response.status(500).json({
                msg: "Le compte existe déjà !"
            });
        }

        let student = await studentModel.create({
            email: email.trim(),
            password: bcrypt.hashSync(password.trim(), 10),
            firstname: typeof firstname !== 'undefined' ? firstname.trim() : "",
            lastname: typeof lastname !== 'undefined' ? lastname.trim() : ""
        });

        return response.status(200).json(student);
    } catch(error) {
        console.log(error);
        return response.status(500).json({
            msg: "Erreur lors de la création du compte !"
        });
    }
});

router.post('/login', async (request, response) => {
    const { email, 
        password 
    } = request.body;

    if ( (typeof email === 'undefined' || email.trim() === "") 
        || (typeof password === 'undefined' || password.trim() === "")
    ) {
        return response.status(500).json({
            msg: "Il faut remplir tous les champs !"
        });
    }

    try {
        let student = await studentModel.findOne({email: email.trim()});

        if (!student) {
            return response.status(500).json({
                msg: "Erreur d'authentification !"
            });
        }

        let compare = bcrypt.compareSync(password.trim(), student.password);

        if (!compare) {
            return response.status(500).json({
                msg: "Erreur d'authentification !"
            });
        }

        request.session.student = student;
        return response.status(200).json(student);
    } catch(error) {
        console.log(error);
        return response.status(500).json({
            msg: "Erreur lors de la création du compte !"
        });
    }
});

router.get('/me', async (request, response) => {
    let student = await studentModel.findOne({email: request.session.student.email.trim()});
    request.session.student = student
    return response.status(200).json(request.session.student);
});

module.exports = router;