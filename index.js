const express = require('express');
const app = express();
const port = 5000;
// const bodyParser = require('body-parser')
// is deprecated
const cookieParser = require('cookie-parser');
const { User } = require('./models/User');
const config = require('./config/key');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post('/login', (req, res) => {
  //step1. find requested email from DB
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "There's no user matches email"
      });
    } else {
      //step2. check password
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: "Wrong password"
          });
        } else {
          //step3. create token for user
          user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);

            //save token as cookie
            res.cookie('x_auth', user.token)
              .status(200)
              .json({
                loginSuccess: true,
                userId: user._id
              });
          });
        }
      });

    }
  });
});





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});