"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const clickSchema = new Schema({
    linkId: {
        type: Schema.Types.ObjectId,
        ref: "Link",
        required: true,
    },
    ip: String,
    userAgent: String,
    device: String,
    browser: String,
    os: String,
    country: String,
    referer: String,
}, {
    timestamps: true,
});
module.exports = mongoose.model("Click", clickSchema);
//# sourceMappingURL=click.js.map