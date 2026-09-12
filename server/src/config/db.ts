const mongoose = require("mongoose");

const db = () => {
    return mongoose.connect(process.env.MONGO_URI);
};

module.exports = db;