const express = require('express');
const cors = require("cors");
const multer = require("multer");

const upload = multer();
const app = express();
const port = 9090;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/api/registration', upload.none(), (req, res) => {
    console.log('Получен POST-запрос на /api/registration');
    console.log('Тело запроса:');
    console.log(req.body);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    const { name, email, phone, msg } = req.body;
    const errors = {};
    if (!regex.test(email) && email !== '') {
        errors.email = "Поле заполнено неверно";
    }
    if (!name) {
        errors.name = "Имя не введено";
    }
    if (!email) {
        errors.email = "Поле 'email' не заполнено";
    }
    if (!phone) {
        errors.phone = "Поле 'phone' не заполнено";
    }
    if (!msg) {
        errors.msg = "Поле 'msg' не заполнено";
    }

    if (Object.keys(errors).length > 0) {
        // Действия, если есть ошибки
        res.status(400).send({
            status: 'error',
            fields: errors
        });
    } else {
        res.status(200).send({
            status: 'success',
            message:'Данные успешно получены и обработаны!'
        });
    }
});


app.get("/api/ping", (req, res) => {
    res.statusCode = 200;
    res.send({
        status: "success",
        message: "Server is ready",
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
