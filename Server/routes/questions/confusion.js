const express = require('express');
const router = express.Router();
const knex = require('../../connect');
const setupPaginator = require('knex-paginator');
setupPaginator(knex);

router.get("/question/:id/help", (req, res) => {
      knex('Help').select().where('question_id', Number(req.params.id)).orderBy('sort_order', 'ASC').then((help) => {
      res.status(200);
          res.json({
              data: help
          });
      }
      );
  });

router.post("/answer/help", (req, res) => {
    knex('Help').insert({
        body: req.body.answer,
        question_id: req.body.question_id,
        sort_order: req.body.sort_order,
        type: req.body.type,
    }, ['id', 'body', 'question_id'])
    .then((newAnswerId) => {
        return res.status(200).json({ message: 'Insert answer success', data: newAnswerId });
    })
    .catch(err => {
        console.log(err);
        return res.status(400).json({ message: 'Error adding answer' });
    });
});

router.delete("/answer/help", (req, res) => {
    knex('Help').where({ id: req.body.id }).del()
    .then((retValue) => {
        return res.status(200).json({ message: 'Deleted answer successfully' });
    });
});

router.patch("/answer/help", (req, res) => {
    knex('Help').where({ id: req.body.id }).update({ body: req.body.body })
    .then((retValue) => {
        return res.status(200).json({ message: 'Updated answer successfully' });
    });
});

router.patch("/answer/help/order", (req, res) => {
    knex('Help').where({ id: req.body.id }).update({ sort_order: req.body.sort_order })
    .then((retValue) => {
        return res.status(200).json({ message: 'Updated sort order successfully' });
    });
});

module.exports = router;
