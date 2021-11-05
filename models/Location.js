const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        lat: String,
        long: String,
        address: String,
        sector: String,
    }
)

module.exports = mongoose.models.Location || mongoose.model('Location', LocationSchema);