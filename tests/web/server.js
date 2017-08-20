const express = require('express');
const app = express();
const port = 1500;

app.use(express.static(__dirname));

app.listen(port, () => {
    console.log('listening on port:', port);
});