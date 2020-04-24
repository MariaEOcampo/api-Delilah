/* const http = require ('http'); */
const app = require ('./app');
const http = require ('dotenv')

require ('dotenv').config()


const port = process.env.PORT;

app.listen(port, ()=>{
    console.log (`Server is running on port ${process.env.PORT}`)
});