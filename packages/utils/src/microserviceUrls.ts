interface IMicroservicesBaseUrls {
  auth: string;
  users: string;
  queues: string;
  countries: string;
  businesses: string;
}

export const microservicesBaseUrls: IMicroservicesBaseUrls = {
  auth: 'https://localhost:50005',
  users: 'https://localhost:50017',
  queues: 'https://localhost:50014',
  countries: 'https://localhost:50008',
  businesses: 'https://localhost:50011',
};
