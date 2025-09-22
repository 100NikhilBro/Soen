const express = require('express');
const app = express();
const hpp = require("hpp");
const helmet = require("helmet");

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PATCH", "DELETE", "PATCH"],
}));

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(hpp());
app.use(helmet());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const userroutes = require('./routes/user.routes.js');
app.use("/api/v1", userroutes);

const projectroutes = require("./routes/project.routes.js");
app.use("/api/v1", projectroutes);

const dbConnect = require('./configs/db');
dbConnect();


app.get("/", (req, res) => {
    res.send(`<h1>Home Page</h1>`)
})

module.exports = app;
