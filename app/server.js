import express from 'express';
import morgan from 'morgan';
import Router from './router';

const app = express();

app.use(morgan('dev'));

Router.init(app);

app.listen(process.env.PORT || 4000, () => {
  console.log('Listening...');
});
