import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { Message } from '@in-the-house/api-interfaces';

const app = express();
const PORT = process.env.port || 3333;
const URI = `mongodb+srv://stephenpg:${process.env.DB_PASSWORD}@cluster0.2hnpx.mongodb.net/ith-database?retryWrites=true&w=majority`;

mongoose.connect(URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('successfully connected to the DB...');
  app.use(express.static(path.join(__dirname, '..', 'in-the-house')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  
  const greeting: Message = { message: 'Welcome to api!' };
  
  app.get('/api', (_, res: express.Response) => {
    res.send(greeting);
  });
  
  app.get('/*', (_, res: express.Response) => {
    res.sendFile(path.join(__dirname, '..', 'in-the-house', 'index.html'));
  });
  
  const server = app.listen(PORT, () => {
    console.log('Listening at http://localhost:' + PORT + '/api');
  });
  server.on('error', console.error);
})
.catch(err => console.error(err));
