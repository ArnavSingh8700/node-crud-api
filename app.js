const express = require("express");
require("./db/conn");
const router =require("./Routes/router")
const PORT=5000;



const app = express();
app.use(express.json())
app.use(router);


app.listen(PORT, () => {
    console.log(`connection is live at port no. ${PORT}`);
})
