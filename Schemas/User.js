const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    conf_password: {type: String, required: true},
    created_at: {type: Date, required: true}
},{ timestamps: true, collection: 'user_login' });

const User = mongoose.model('User', UserSchema);

module.exports = User;