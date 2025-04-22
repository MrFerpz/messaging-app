const express = require('express');
const app = express();
const cors = require('cors')
const indexRouter = require('./routes/indexRouter')

// setup middlewares
app.use(cors());
app.use(express.json());

app.use("/", indexRouter)

console.log("live on 3000")
app.listen(3000);
