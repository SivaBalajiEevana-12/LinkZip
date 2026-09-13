"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require('dotenv').config();
const User = require('./models/user');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
const linkRoutes = require('./routes/link');
const clickRoutes = require('./routes/click');
app.use(bodyParser.json());
const allowedOrigins = [
    "http://localhost:5173",
    "https://linkzip-kappa.vercel.app",
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(cookieParser());
const port = 3000;
const db = require('./config/db');
app.use('/api/user', userRoutes);
app.use('/api/link', linkRoutes);
app.use("/c", clickRoutes);
db().then(() => {
    console.log('Database connected successfully');
}).catch((err) => {
    console.log(err);
});
app.get('/', async (req, res) => {
    console.log("/get");
    const users = await User.find();
    return res.json(users);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map