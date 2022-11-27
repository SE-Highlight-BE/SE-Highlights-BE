const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const cors = require('cors');

require("dotenv").config();


const { sequelize, User, Comment } = require('./models'); 

const signRoute = require('./routes/signRoute');
const commentRoute = require('./routes/commentRoute');

const app = express();
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

// DB 연결 확인
sequelize.sync({force: false})
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

// DB 내 table 확인
sequelize.getQueryInterface().showAllSchemas().then((tableObj) => {
    console.log('=================','Tables in DataBase', '=================');
    console.log(tableObj);
})
.catch((err) => {
    console.log('showAllSchemas ERROR',err);
})

app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use("/auth", signRoute);
app.use("/reply", commentRoute);

app.listen(app.get('port'), () =>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});