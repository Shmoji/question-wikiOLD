const express = require('express');
const router = express.Router();
const knex = require('../../connect');
const setupPaginator = require('knex-paginator');
setupPaginator(knex);

router.get("/question/:id/personal", (req, res) => {
    knex('_User').select().join('Personal', 'Personal.user_id', '_User.id').select().where('question_id', Number(req.params.id))
    .then((answers) => {
      res.status(200).json({ data: answers });
    });
});

router.post("/answer/personal", (req, res) => {
    knex('Personal').insert({
        user_id: req.body.user_id,
        body: req.body.body,
        home_order: req.body.home_order,
        answer_date: req.body.answer_date,
        upvotes: req.body.upvotes,
        downvotes: req.body.downvotes,
        shares: req.body.shares,
        question_id: req.body.question_id
    }, ['id', 'user_id', 'body', 'question_id'])
    .then((newAnswerId) => {
        return res.status(200).json({ message: 'Insert answer success', data: newAnswerId });
    });
});

router.delete("/answer/personal", (req, res) => {
    knex('Personal').where({ id: req.body.id }).del()
    .then((retValue) => {
        return res.status(200).json({ message: 'Deleted answer successfully' });
    });
});
  
module.exports = router;