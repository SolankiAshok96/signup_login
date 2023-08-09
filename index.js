const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const ServerConfig = require('./config/server.config')


app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

require('./config/db.Config')


require("./routes/auth.routes")(app)


app.listen(ServerConfig.PORT, () => {
     console.log(`Server is running on port ${ServerConfig.PORT}`) 
})
