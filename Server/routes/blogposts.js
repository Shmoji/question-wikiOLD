const express = require('express');
const router = express.Router();
const knex = require('../connect');
const setupPaginator = require('knex-paginator');
setupPaginator(knex);

router.get("/blogposts", (req, res) => {
  knex('BlogPosts').select()
    .orderBy('post_date', 'desc')
    .paginate(10, req.query.page || 1, true)
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch(err => {
      res.status(500).json();
    });
});

router.get("/blogpost/:id", (req, res) => {
  knex('BlogPosts').select().where('id', Number(req.params.id))
  .then((post) => {
    if (post.length === 0) {
      res.status(404).json();
    } else {
      res.status(200).json({ post: post[0] });
    }
	})
  .catch(err => {
    res.status(500).json();
  });
});

router.post("/blogpost", (req, res) => {
  // If this is only ever going to be for admins, then we should really check if the
  // user making the post is an admin. (Remember to update the tests!)

  knex('BlogPosts').insert({
    title: req.body.title,
    body: req.body.body,
    post_date: req.body.post_date,
    user_id: req.body.user_id,
  }, ['id', 'title', 'body', 'post_date', 'user_id'])
  .then((post) => {
    return res.status(200).json({ post: post[0], message: 'Insert new Blog Post success' });
  })
  .catch(err => {
    console.log(req.body);
    res.status(400).json();
  });
});



module.exports = router;