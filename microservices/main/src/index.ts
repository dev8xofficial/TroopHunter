import { formatResponse, sanitizeResponse } from '@repo/middlewares';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import express, { type Request, type Response } from 'express';

// import { rateLimiter } from './middlewares/rateLimiter';
import { requestLogger } from './middlewares/requestLogger';
import { authProxyMiddleware } from './proxies/AuthProxy';
import { businessesProxyMiddleware } from './proxies/BusinessesProxy';
import { citiesProxyMiddleware } from './proxies/CitiesProxy';
import { cityQueuesProxyMiddleware } from './proxies/CityQueuesProxy';
import { countriesProxyMiddleware } from './proxies/CountriesProxy';
import { leadsProxyMiddleware } from './proxies/LeadsProxy';
import { queuesProxyMiddleware } from './proxies/QueuesProxy';
import { statesProxyMiddleware } from './proxies/StatesProxy';
import { usersProxyMiddleware } from './proxies/UsersProxy';

const app = express();

// Load environment-specific .env file
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

app.use(cors({ origin: '*', methods: 'GET,POST,PUT,DELETE,OPTIONS', allowedHeaders: 'Content-Type,Authorization' }));

// Response Handler
app.use(formatResponse);
app.use(sanitizeResponse);

app.use(requestLogger);
// app.use(rateLimiter(10));

app.use('/auth', authProxyMiddleware);
app.use('/countries', countriesProxyMiddleware);
app.use('/states', statesProxyMiddleware);
app.use('/cities', citiesProxyMiddleware);
app.use('/users', usersProxyMiddleware);
app.use('/businesses', businessesProxyMiddleware);
app.use('/leads', leadsProxyMiddleware);
app.use('/queues', queuesProxyMiddleware);
app.use('/city-queues', cityQueuesProxyMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('Main Service (API Gateway) is running');
});

export default app;
