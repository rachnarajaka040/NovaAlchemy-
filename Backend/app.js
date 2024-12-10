const express = require('express');
const mongoose = require('mongoose');
const spaceRoutes = require('./routes/spaceRoutes');
const cors = require('cors');


const app = express();
app.use(cors()); 
app.use(express.json());
app.use('/api/spaces', spaceRoutes);


// MongoDB connection
mongoose.connect("mongodb+srv://rachnarajak040:rachna1234@cluster1.mehbt5n.mongodb.net/?retryWrites=true&w=majority&appName=cluster1", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

module.exports = app;
