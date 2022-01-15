const { Schema, model, Types } = require("mongoose");

// Schema Only
const reactionSchema = new Schema(
    {
        reactionId: {
              type: Schema.Types.ObjectId,
              default: () => new Types.ObjectId(),
            },
        content: {
            type: String,
            default: 'Reaction is showing here'
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

module.exports = reactionSchema;