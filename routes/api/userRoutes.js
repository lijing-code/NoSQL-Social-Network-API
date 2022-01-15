const router = require('express').Router();

// userRoutes
const {
    // getting all users
    getUsers,
    // getting a single user by its _id
    getSingleUser,
    // creating a user (POST)
    createUser,
    // update a user (PUT)
    updateUser,
    // delete a user
    deleteUser,
    // add a new friend to a user's friend list
    addFriend,
    // remove a friend from a user's friend list
    deleteFriend,
} = require('../../controllers/userController');

// /api/users
router
    .route('/')
    .get(getUsers)
    .post(createUser);

// /api/users/:userId
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
    .route('/:userId/assignments')
    .post(addFriend)
    .delete(deleteFriend);


module.exports = router;




