const express = require('express');
const port = 8000;
const app = express();



app.get('/', function (req, res) {
    res.send("hehe");
})


app.listen(port, function (err) {
    if (err) {
        console.log("error in running server");
        return;
    }
    console.log("server listening on port: " + port);
});