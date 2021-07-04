const express = require('express');
const router = express.Router();
const knex = require('../../connect');
const setupPaginator = require('knex-paginator');
setupPaginator(knex);

router.get("/section/:id/indepthwiki", (req, res) => {
	knex('InDepthWiki').select().where('section_id', Number(req.params.id)).orderBy('sort_order', 'ASC').then((idWiki) => {
    res.status(200);
		res.json({ data: idWiki });
	}
	);
});

router.post("/answer/indepthwiki", (req, res) => {
    knex('InDepthWiki').insert({
        body: req.body.answer,
        section_id: req.body.section_id,
        sort_order: req.body.sort_order,
    })
    .then((newAnswerId) => {
        return res.status(200).json({ message: 'Insert answer success', data: newAnswerId });
    })
    .catch(err => {
        console.log(err);
        return res.status(400).json({ message: 'Error adding answer' });
    });
});

router.delete("/answer/indepthwiki", (req, res) => {
    knex('InDepthWiki').where({ id: req.body.id }).del()
    .then((retValue) => {
        return res.status(200).json({ message: 'Deleted answer successfully' });
    });
});

router.patch("/answer/indepthwiki", (req, res) => {
    knex('InDepthWiki').where({ id: req.body.id }).update({ body: req.body.body })
    .then((retValue) => {
        return res.status(200).json({ message: 'Updated answer successfully' });
    });
});

router.patch("/answer/indepthwiki/order", (req, res) => {
    knex('InDepthWiki').where({ id: req.body.id }).update({ sort_order: req.body.sort_order })
    .then((retValue) => {
        return res.status(200).json({ message: 'Updated sort order successfully' });
    });
});

module.exports = router;
