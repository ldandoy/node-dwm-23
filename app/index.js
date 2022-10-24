const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const classesRouter = require('./routes/classes');

app.get("/", (req, res) => {
    res.status(200).send('<h1>Hello World !</h1>');
});

app.use('/classes', classesRouter);

app.listen(4500, () => {
    console.log('Server is running on http://127.0.0.1:4500');
});