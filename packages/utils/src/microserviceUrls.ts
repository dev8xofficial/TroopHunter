interface IMicroservicesBaseUrls {
  auth: string;
  users: string;
  queues: string;
  countries: string;
  businesses: string;
}

export const microservicesBaseUrls: IMicroservicesBaseUrls = {
  auth: 'https://localhost:50003',
  users: 'https://localhost:50015',
  queues: 'https://localhost:50012',
  countries: 'https://localhost:50006',
  businesses: 'https://localhost:50009',
};
