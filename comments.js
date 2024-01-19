//Create web server
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth'); //middleware to check token
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   POST api/comments/:id
// @desc    Comment on a post
// @access  Private
router.post(
  '/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    //check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //if there are errors, send back 400 error
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //get user
      const user = await User.findById(req.user.id).select('-password');
      //get post
      const post = await Post.findById(req.params.id);

      //create new comment object
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id, //id of user
      };

      post.comments.unshift(newComment); //add comment to post

      await post.save(); //save post

      res.json(post.comments); //send back all comments
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/comments/:id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete('/:id/:comment_id', auth, async (req, res) => {
  //get post
  const post = await Post.findById(req.params.id);

  try {
    //find comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //check if comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    //check if user is comment owner
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' }); //401 means not authorized
    }

    //get index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1); //remove comment

    await post.save(); //save post

    res.json(post.comments); //send back all comments
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
});