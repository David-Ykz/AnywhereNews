const express = require("express");
const cors = require("cors");
const app = express();




app.use(cors());
app.use(express.json());


app.listen(8888, () => {
    console.log(`Server is running on port 8888.`);
});

module.exports = app;
