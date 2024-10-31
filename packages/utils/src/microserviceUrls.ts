interface IMicroservicesBaseUrls {
  auth: string;
  businesses: string;
  leads: string;
  users: string;
  queues: string;
}

export const microservicesBaseUrls: IMicroservicesBaseUrls = {
  auth: 'https://localhost:50001',
  businesses: 'https://localhost:50003',
  leads: 'https://localhost:50003',
  users: 'https://localhost:50018',
  queues: 'https://localhost:50004',
};
