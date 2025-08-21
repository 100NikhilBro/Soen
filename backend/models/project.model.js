const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        unique: [true, "project name is unique"],
        trim: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true });




module.exports = mongoose.model("Project", projectSchema);