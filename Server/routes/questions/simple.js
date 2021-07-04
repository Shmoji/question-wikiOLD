const express = require('express');
const router = express.Router();
const knex = require('../../connect');
const setupPaginator = require('knex-paginator');
setupPaginator(knex);

router.get("/question/:id/simplewiki", (req, res) => {
	knex('SimpleWiki').select().where('question_id', Number(req.params.id)).orderBy('sort_order', 'ASC').then((sWiki) => {
    res.status(200);
		res.json({ data: sWiki });
	});
});

router.post("/answer/simple", (req, res) => {
    knex('SimpleWiki').insert({
        body: req.body.answer,
        question_id: req.body.question_id,
        sort_order: req.body.sort_order,
    }, ['id', 'body', 'question_id'])
    .then((newAnswerId) => {
        return res.status(200).json({ message: 'Insert answer success', data: newAnswerId });
    })
    .catch(err => {
        console.log(err);
        return res.status(400).json({ message: 'Error adding answer' });
    });
});

router.delete("/answer/simple", (req, res) => {
    knex('SimpleWiki').where({ id: req.body.id }).del()
    .then((retValue) => {
        return res.status(200).json({ message: 'Deleted answer successfully' });
    })
});

router.patch("/answer/simple", (req, res) => {
    knex('SimpleWiki').where({ id: req.body.id }).update({ body: req.body.body })
    .then((retValue) => {
        return res.status(200).json({ message: 'Updated answer successfully' });
    })
});

router.patch("/answer/simple/order", (req, res) => {
    knex('SimpleWiki').where({ id: req.body.id }).update({ sort_order: req.body.sort_order })
    .then((retValue) => {
        return res.status(200).json({ message: 'Updated sort order successfully' });
    })
});

module.exports = router;
