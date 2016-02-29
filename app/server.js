import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.listen(process.env.PORT || 4000, () => {
  console.log('Listening...');
});
