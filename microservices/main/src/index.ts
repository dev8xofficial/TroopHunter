import { formatResponse, sanitizeResponse } from '@repo/middlewares';
import cors from 'cors';
import express, { type Request, type Response } from 'express';

// import { rateLimiter } from './middlewares/rateLimiter';
import { requestLogger } from './middlewares/requestLogger';
import { authProxyMiddleware } from './proxies/AuthProxy';
import { businessesProxyMiddleware } from './proxies/BusinessesProxy';
// import { citiesProxyMiddleware } from './proxies/CitiesProxy';
// import { cityQueuesProxyMiddleware } from './proxies/CityQueuesProxy';
import { countriesProxyMiddleware } from './proxies/CountriesProxy';
// import { leadsProxyMiddleware } from './proxies/LeadsProxy';
import { queuesProxyMiddleware } from './proxies/QueuesProxy';
// import { statesProxyMiddleware } from './proxies/StatesProxy';
import { usersProxyMiddleware } from './proxies/UsersProxy';

const app = express();

app.use(cors({ origin: '*', methods: 'GET,POST,PUT,DELETE,OPTIONS', allowedHeaders: 'Content-Type,Authorization' }));

// Response Handler
app.use(formatResponse);
app.use(sanitizeResponse);

app.use(requestLogger);
// app.use(rateLimiter(10));

app.use('/auth', authProxyMiddleware);
app.use('/countries', countriesProxyMiddleware);
// app.use('/states', statesProxyMiddleware);
// app.use('/cities', citiesProxyMiddleware);
app.use('/users', usersProxyMiddleware);
app.use('/businesses', businessesProxyMiddleware);
// app.use('/leads', leadsProxyMiddleware);
app.use('/queues', queuesProxyMiddleware);
// app.use('/city-queues', cityQueuesProxyMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('Main Service (API Gateway) is running');
});

export default app;
