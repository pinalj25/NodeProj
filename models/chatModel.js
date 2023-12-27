const mongoose = require('mongoose')


const chatsSchema = new mongoose.Schema({
    sender_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users'
    },
    
    receiver_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users'
    },
    message: { 
        type: String, 
        required: true 
    }
}, { timestamps: true }
)

module.exports = mongoose.model('chat', chatsSchema);