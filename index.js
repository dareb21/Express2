require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
app.use(express.json());

const routes = require("./routes/api");
app.use(routes);

app.listen(port,()=>{
  console.log(`server corriendo en puerto ${port}`);
});
