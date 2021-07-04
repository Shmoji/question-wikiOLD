const express = require('express');
const router = express.Router();
const knex = require('../../connect');
const setupPaginator = require('knex-paginator');
setupPaginator(knex);

router.get("/question/:id/indepthwiki/sections", (req, res) => {
    if (req.params.id === undefined) {
        return res.status(400).json({ message: 'Error retrieving sections - No ID specified' });
    }
    knex('Sections').select().where('question_id', Number(req.params.id)).orderBy('sort_order', 'ASC')
    .then((sects) => {
        res.status(200).json({ data: sects });
    })
    .catch(err => {
        console.log(err);
        return res.status(400).json({ message: 'Error retrieving sections' });
    });
});

router.post("/section/indepthwiki", (req, res) => {
    knex('Sections').insert({
        title: req.body.title,
        question_id: req.body.question_id,
        sort_order: req.body.sort_order,
    })
    .then((newAnswerId) => {
        return res.status(200).json({ message: 'Insert section success', data: newAnswerId });
    })
    .catch(err => {
        console.log(err);
        return res.status(400).json({ message: 'Error adding section' });
    });
});

router.delete("/section/indepthwiki", (req, res) => {
    knex('Sections').where({ id: req.body.id }).del()
    .then((retValue) => {
        return res.status(200).json({ message: 'Deleted section successfully' });
    });
});

router.patch("/section/indepthwiki", (req, res) => {
    knex('Sections').where({ id: req.body.id }).update({ title: req.body.title })
    .then((retValue) => {
        return res.status(200).json({ message: 'Updated section successfully' });
    });
});

router.patch("/section/indepthwiki/order", (req, res) => {
    knex('Sections').where({ id: req.body.id }).update({ sort_order: req.body.sort_order })
    .then((retValue) => {
        return res.status(200).json({ message: 'Updated sort order successfully' });
    });
});

module.exports = router;
