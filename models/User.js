// **User**:

const { Schema } = require("mongoose");

// * `username`
//   * String
//   * Unique
//   * Required
//   * Trimmed

// * `email`
//   * String
//   * Required
//   * Unique
//   * Must match a valid email address (look into Mongoose's matching validation)

// * `thoughts`- an array, need to populate all the thougths in userControllers
//   * Array of `_id` values referencing the `Thought` model
thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }
]

// * `friends`
//   * Array of `_id` values referencing the `User` model (self-reference)
// activitiy populate 23
friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
]
// **Schema Settings**:
// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
// look at activity virtuals 21
userSchema
    .virtual('friendCount')
    .get(function() {
        return this.friends.length;
    });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;