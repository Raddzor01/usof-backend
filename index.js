import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import router from "./routes/router.js";

const port = 8080;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/api", router);

app.listen(port, () => {
    console.log(`Server started at http://127.0.0.1:${port}`);
});