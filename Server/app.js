require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');

const passport = require("passport");
const generalRoutes = require('./routes/general'); 
const userRoutes = require('./routes/users');
const blogpostRoutes = require('./routes/blogposts');

const questionRoutes = require('./routes/questions');
const confusionAnswerRoutes = require('./routes/questions/confusion');
const indepthAnswerRoutes = require('./routes/questions/indepth');
const personalAnswerRoutes = require('./routes/questions/personal');
const sectionsRoutes = require('./routes/questions/sections');
const simpleAnswerRoutes = require('./routes/questions/simple');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

require("./config/passport")(passport);

app.use(cors());
app.use('/', generalRoutes);
app.use('/api', userRoutes);
app.use('/api', questionRoutes);
app.use('/api', blogpostRoutes);

app.use('/api', confusionAnswerRoutes);
app.use('/api', indepthAnswerRoutes);
app.use('/api', personalAnswerRoutes);
app.use('/api', sectionsRoutes);
app.use('/api', simpleAnswerRoutes);

module.exports = app;
