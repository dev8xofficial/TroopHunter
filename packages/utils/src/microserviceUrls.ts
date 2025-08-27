interface IMicroservicesBaseUrls {
  auth: string;
  users: string;
  queues: string;
  countries: string;
  businesses: string;
}

export const microservicesBaseUrls: IMicroservicesBaseUrls = {
  auth: 'http://localhost:50005',
  users: 'http://localhost:50017',
  queues: 'http://localhost:50014',
  countries: 'http://localhost:50008',
  businesses: 'http://localhost:50011',
};
