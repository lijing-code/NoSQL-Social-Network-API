// * `thoughtText`
const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
              type: Schema.Types.ObjectId,
              default: () => new Types.ObjectId(),
            },
        content: {
            type: String,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)
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
            type: String,
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