require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

// usar ngrok http 3000

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://fran:EC8dZ1XdC1xghd9j@cluster0-k1dhu.mongodb.net/silsTrack?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('contectado a mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.log('ups paso algo', err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Tu email es: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('escuchando puerto 3000');
});