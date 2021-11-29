const express = require('express');
const cors = require('cors');
require('dotenv').config();
const routers = require('./routers');

const PORT = process.env.PORT || 5000;

const app = express();

app.use('/api', routers);
app.use('**', (req, res) => {
    res.status(404).json({error: 'Not found'});
});

app.use(cors);

app.listen(PORT, () => console.log(`Runing on port ${PORT}`))
