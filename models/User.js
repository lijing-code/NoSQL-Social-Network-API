// **User**:
const { Schema, model } = require("mongoose");

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email:{
            type: String,
            trim: true,
            unique: true,
            required: true,
            validate: [validateEmail, 'Please fill a valid gmail address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid gmail address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
)

// **Schema Settings**:
// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
userSchema
    .virtual('friendCount')
    .get(function() {
        return this.friends.length;
    });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;