"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const db = () => {
    return mongoose.connect(process.env.MONGO_URI);
};
module.exports = db;
//# sourceMappingURL=db.js.map