const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');

const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const { default: mongoose } = require('mongoose');

mongoose
  .connect('mongodb+srv://user:123@cluster0.lbbstum.mongodb.net/test', {
    useNewUrlParser: true,
  })
  .then(() => {
    const app = express();
    const corsOptions = {
      origin: 'http://sguitars.herokuapp.com',
      optionsSuccessStatus: 200,
      credentials: true,
    };
    app.use(cors(corsOptions));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(
      session({
        secret: 'br.+ma4:FqFvmK9?6/6}8:%?]Cq)[<XYy}2~n/^MWE!+D<;Z',
        resave: false,
        credentials:true,
        saveUninitialized: false,
        cookie: { 
          httpOnly: false,
          maxAge: null,
          secure:false
        }

      })
    );
    app.use(routes);
    app.listen(process.env.PORT || 5000);
  });
