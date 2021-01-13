const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    conf_password: {type: String, required: true},
    created_at: {type: String, required: true}
},{ timestamps: false, collection: 'user_login' });

module.exports = mongoose.model('User', UserSchema);