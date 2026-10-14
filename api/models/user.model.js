import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    fullname: {
        type: String,
        default: '',
    },
    bio: {
        type: String,
        maxLength: 250,
        default: '',
    },
    headline: {
        type: String,
        default: '',
    },
    socialLinks: {
        website: { type: String, default: '' },
        youtube: { type: String, default: '' },
        facebook: { type: String, default: '' },
        twitter: { type: String, default: '' },
        linkedin: { type: String, default: '' },
    },
    }, {timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;
