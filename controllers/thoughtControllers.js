const { User, Thought, Reaction} = require('../models');

module.exports = {
    // getting all thougts
    getThoughts(req, res) {
      Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
    },
    // getting a single thought by _id
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },
    // creating a thought
        // create the thought first
            // find the user by username or id and push the thought in there
    createThought(req, res) {
      Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Thought created, but found no user with that ID' })
          : res.json('Created the thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },

    // PUT to update a thought by its _id
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // DELETE to remove a thougth by its _id
    deleteThought(req, res) {
      Thought.findOneAndDelete(
        { _id: req.params.thoughtId },
      )
        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: 'No thought found with that ID :(' })
            : User.findOneAndUpdate(
              { username: thought.username},
              { $pull: { thoughts: req.params.thoughtId }},
              { runValidators: true, new: true }
            )
        )
        .catch((err) => res.status(500).json(err));
    },

    // * `POST` to create a reaction stored in a single thought's `reactions` array field
    createReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: 'No thought found with that ID :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
    deleteReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: 'No thought found with that ID :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
}
    
  
