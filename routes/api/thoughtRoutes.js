const router = require('express').Router();

const{
    // getting all thougts
    getThoughts,
    // getting a single thought by _id
    getSingleThought,
    // creating a thought
    createThought,
    // PUT to update a thought by its _id
    updateThought,
    // DELETE to remove a thougth by its _id
    deleteThought,
    // create a reaction stored in a single thought's `reactions` array field
    createReaction,
    // pull and remove a reaction by the reaction's `reactionId` value
    deleteReaction,
  } = require('../../controllers/thoughtControllers');
  
// /api/thoughts
router
    .route('/')
    .get(getThoughts)
    .post(createThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction);

module.exports = router;