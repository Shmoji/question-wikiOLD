const express = require('express');
const router = express.Router();
const knex = require('../connect');
const setupPaginator = require('knex-paginator');
setupPaginator(knex);

router.get("/questions", (req, res) => {
	knex('Questions').select().then((questions) => {
    res.status(200).json({ data: questions });
	}
	);
});

router.get("/unanswered", (req, res) => {
  knex('Personal').select('question_id').distinct('question_id').pluck('question_id')
  .then(questionIds => {
    knex('Questions').select().whereNotIn('id', questionIds)
    .paginate(15, req.query.page || 1, true)
    .then(questions => {
      res.status(200).json({ questions });
    })
  });
});

router.get("/question/:id", (req, res) => {
	knex('Questions').select().where('id', Number(req.params.id)).then((question) => {
    res.status(200).json({ data: question });
	}
	);
});

// Get all the very first answer of every question (if no answers for that question, then it not included)
router.get("/answers-for-home", (req, res) => {
  knex('Personal').select()
    .where('home_order', 0)
    .join('_User', 'Personal.user_id', '_User.id').select()
    .join('Questions', 'Personal.question_id', 'Questions.id').select().orderBy('question_id')
    .paginate(15, req.query.page || 1, true)
    .then((answers) => {
      res.status(200).json({ answers });
    });
});

router.get("/question/:id/discussions", (req, res) => {
  knex('Discussion').select().where('question_id', Number(req.params.id))
    .join('_User', 'Discussion.user_id', '_User.id').select().then((discussions) => {
      res.status(200).json({
        data: discussions
      });
    });
});

router.get("/question/:id/edits", (req, res) => {
  knex('Edits').select().where('question_id', Number(req.params.id))
    .join('_User', 'Edits.user_id', '_User.id').select().then((edits) => {
      res.status(200).json({
        data: edits
      });
    }
    );
});

router.post("/new-question", (req, res) => {
  
  knex('Questions').insert({
    user_id: req.body.user_id,
    view_count: req.body.view_count,
    title: req.body.title,
  }, ['id'])
  .then((newQuestion) => {
    
    knex('Sections').insert({
      title: 'Main',
      question_id: newQuestion[0].id,
      sort_order: 0,
    }, ['id'])
    .then(out => {});

    return res.status(200).json({ message: 'Insert question success', data: newQuestion[0].id });
  });

})

module.exports = router;