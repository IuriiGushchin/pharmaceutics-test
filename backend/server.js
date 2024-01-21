const app = require("./app.js");
require('dotenv').config()

async function start() {
    

    app.listen(process.env.PORT, () => {
        console.log("run")
    })
}

start()