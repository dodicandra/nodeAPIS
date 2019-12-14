const { AuthenticationError, UserInputError } = require('apollo-server');

const checkAuth = require('../../util/check-auth');
const Post = require('../../models/Post');

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Komen kosong', {
          errors: {
            body: 'komtar tidak boleh kosong',
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError('Postingan tidak ada');
      }
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIdex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIdex].username === username) {
          post.comments.splice(commentIdex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError('perintah tidak memungkinkan');
        }
      } else {
        throw new UserInputError('Postingan tidak ada');
      }
    },
  },
};
