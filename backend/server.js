import app from "./app.js"

async function start() {
    const port = 3000

    app.listen(port, () => {
        console.log("run")
    })
}

start()