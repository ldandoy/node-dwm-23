const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
var cookieParser = require('cookie-parser');

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'Secret12',
}));

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
}, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('BD connect !');
    }
})

const classesRouter = require('./routes/classes');
const studentsRouter = require('./routes/students');
const lessonsRouter = require('./routes/lessons');
const sessionsRouter = require('./routes/sessions');

app.get("/", (req, res) => {
    res.status(200).send('<h1>Hello World !</h1>');
});

app.use('/classes', classesRouter);
app.use('/students', studentsRouter);
app.use('/lessons', lessonsRouter);
app.use('/sessions', sessionsRouter);

app.listen(4500, () => {
    console.log('Server is running on http://127.0.0.1:4500');
});