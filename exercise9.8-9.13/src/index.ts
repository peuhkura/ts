import express from 'express';
import diaryRouter from './routes/diaries';
import routerDiagnoses from './routes/routerDiagnoses';
import routerPatients from './routes/routerPatients';

const app = express();
app.use(express.json());

const PORT = 3000;

// Add headers before the routes are defined
app.use(function (_req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', "true");

  // Pass to next layer of middleware
  next();
});

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.use('/api/diagnoses', routerDiagnoses);

app.use('/api/patients', routerPatients);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
