import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cron from 'node-cron';
import * as path from 'path';

import { apiRouter, authRouter } from './app/routes';
import { User } from './app/models';
import { IUser } from '@in-the-house/api-interfaces';

// define initial variables
const app = express();
const PORT = process.env.port || 3333;
const URI = `mongodb+srv://stephenpg:${process.env.DB_PASSWORD}@cluster0.2hnpx.mongodb.net/ith-database?retryWrites=true&w=majority`;

// on the first of every month (at midnight, 00:00), reset every user's
// 'usage_count' to 0:
cron.schedule('0 0 1 * *', async () => {
  const users: IUser[] = await User.find({});
  if (users.length === 0) return;
  users.forEach(user => {
    user.usage_count = 0;
    user.save();
  });
});

/**
 * connect to the database
 * all subsequent app code is run in the `then` block, so the server will not start
 * if the db cannot be reached.
 * 
 */
mongoose.connect(URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('successfully connected to the DB...');
    // define static assets
    app.use(express.static(path.join(__dirname, '..', 'in-the-house')));
    // register middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(compression());
    app.use(cookieParser());

    // API ROUTES
    app.use('/auth', authRouter);
    app.use('/api/v1', apiRouter);

    // Catch all other routes and serve the React app:
    app.get('*', (_, res: express.Response) => {
      res.sendFile(path.join(__dirname, '..', 'in-the-house', 'index.html'));
    });

    // start the server
    const server = app.listen(PORT, () => {
      console.log(`Listening at http://localhost: ${PORT}`);
    });
    server.on('error', console.error);
  })
  .catch(console.error);
