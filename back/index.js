const express = require('express');
const { getConnection } = require("./db/db-connection-mongo");
const cors = require("cors");
const app = express();
const port = 4000;

getConnection();

// Permitir solicitudes desde el frontend local y desde el frontend en Render
const allowedOrigins = [
  "http://localhost:3000", // Frontend local
  "https://front-j7df.onrender.com" // Frontend en Render
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  }
}));

app.use(express.json());

app.use("/genero", require("./router/genero"));
app.use("/director", require("./router/director"));
app.use("/productora", require("./router/productora"));
app.use("/tipo", require("./router/tipo"));
app.use("/media", require("./router/media"));

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
