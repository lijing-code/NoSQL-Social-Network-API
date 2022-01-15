// * `thoughtText`
const { Schema, model, Types } = require('mongoose');
const { reactionSchema } = require('./Reaction')
// Schema to create Thougth model
const thoughtSchema = new Schema(
    {
        text:{
            //   * String
            type: String,
            //   * Required
            required: true,
            //   * Must be between 1 and 280 characters
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

// **Schema Settings**:
// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length;
    });

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;