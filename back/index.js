const express = require('express')
const {getConnection } = require("./db/db-connection-mongo")
const cors = require ("cors")
const app = express()
const port = 4000

getConnection(); 

app.use(cors({origin: "http://localhost:3000"}))
app.use(cors({origin: "https://front-j7df.onrender.com/"}))
app.use(express.json())

app.use("/genero", require("./router/genero"));
app.use("/director", require("./router/director"));
app.use("/productora", require("./router/productora"));
app.use("/tipo", require("./router/tipo"));
app.use("/media", require("./router/media"));









app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
