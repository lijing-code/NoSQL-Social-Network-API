// * `thoughtText`
//   * String
//   * Required
//   * Must be between 1 and 280 characters

// * `createdAt`
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query

// * `username` (The user that created this thought)
//   * String
//   * Required

// * `reactions` (These are like replies)
//   * Array of nested documents created with the `reactionSchema`
// import reactionSchema, and link here, like activities 17
reactions: [reactionSchema],

// **Schema Settings**:

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length;
    });

// Initialize our User model
const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;