const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

//db bağlantısı
require('./src/config/database');

//routerlar include edilir
const authRouter = require('./src/routers/auth_router.js');

//formdan gelen değerlerin okunabilmesi için
app.use(express.urlencoded({extended: true}));

//template engine ayarları
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

app.use(expressLayouts);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));


app.get('/',(req,res) => {
    res.json({mesaj: "Hi"});
})

app.use('/', authRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server ${process.env.PORT} portundan çalıştı`);
});