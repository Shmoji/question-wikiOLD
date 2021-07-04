const express = require('express');
const router = express.Router();
const knex = require('../connect');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

router.get("/users", (req, res) => {
  knex('_User').select()
  .then(users => {
		res.status(200).json({ data: users });
	})
  .catch(err => {
    res.status(500).json();
  });
});

router.get("/user/:id", (req, res) => {
  knex('_User').select().where('id', Number(req.params.id))
  .then(users => {
    if (users.length === 0) {
      res.status(404).json();
    } else {
      res.status(200).json({ data: users[0] });
    }
	})
  .catch(err => {
    res.status(500).json();
  });
});

router.get("/user/:id/questions", (req, res) => {
  knex('Questions').select().where('user_id', Number(req.params.id))
  .then(questions => {
    if (questions.length === 0) {
      res.status(404).json();
    } else {
      res.status(200).json({ data: questions });
    }
	})
  .catch(err => {
    res.status(500).json();
  });
});

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  knex('_User')
    .select("email")
    .where("email", req.body.email)
    .then(userList => {
      if (userList.length === 0) {

        return knex('_User')
          .insert({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            date_joined: new Date(),
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            is_admin: false
          }, ['id'])
          .then((newUserId) => {
            return res.status(200).json({ message: 'Insert success', data: newUserId[0] });
          })
          .catch(err => {
            res.status(400).json();
          });
          
      }
      return res.status(400).json({ email: "Email already exists" });
    })
    .catch(err => {
      res.status(500).json();
    });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  knex('_User').select(["email", "password", 'id', 'firstname', 'lastname', 'is_admin'])
    .where("email", req.body.email)
    .then(userList => {
      if (userList.length === 0) {
        return res.status(400).json({ email: "Email does not exist" });
      }
    
      bcrypt.compare(req.body.password, userList[0].password)
      .then(isMatch => {
        if (isMatch) {
          const payload = {
            id: userList[0].id,
            firstname: userList[0].firstname,
            lastname: userList[0].lastname
          };
          
          // Sign token
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 365 * 24 * 60 * 60 },
            (err, token) => {
              res.status(200).json({ success: true, token: "Bearer " + token });
            }
          );
        } else {
          return res.status(400).json({ passwordincorrect: "Password incorrect" });
        }
      });
  
    })
    .catch(err => {
      res.status(500).json();
    });
});

module.exports = router;