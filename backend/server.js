const app = require('./app.js');

const http = require('http');

const server = http.createServer(app);


require('dotenv').config();
const PORT = process.env.PORT || 7689;

server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})