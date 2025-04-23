const express = require('express');
const app = express();
const cors = require('cors')
const indexRouter = require('./routes/indexRouter')
const cookieParser = require('cookie-parser')

// setup middlewares
app.use(cookieParser());

// cors needs to know where the front end is, and to require a token to make requests
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use("/", indexRouter)

console.log("live on 3000")
app.listen(3000);
