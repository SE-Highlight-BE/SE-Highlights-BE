const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const { sequelize } = require("./models/index");

const signRoute = require("./routes/signRoute");
const commentRoute = require("./routes/commentRoute");
const videoRoute = require("./routes/videoRoute");
const evalRoute = require("./routes/evalRoute");
const bookmarkRoute = require("./routes/bookmarkRoute");

const app = express();

//static 폴더 설정 (비디오, 썸네일)
app.use("/images", express.static("images"));
app.use("/videos", express.static("videos"));

app.set("port", process.env.PORT || 3001);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

// DB 연결 확인
sequelize
  .sync()
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error("db연결 에러", err);
  });

// DB 내 table 확인
sequelize
  .getQueryInterface()
  .showAllSchemas()
  .then((tableObj) => {
    console.log("=================", "Tables in DataBase", "=================");
    console.log(tableObj);
  })
  .catch((err) => {
    console.log("showAllSchemas ERROR", err);
  });

app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", signRoute);
app.use("/reply", commentRoute);
app.use("/", videoRoute);
app.use("/likeVideo", evalRoute);
app.use("/bookmark", bookmarkRoute);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
