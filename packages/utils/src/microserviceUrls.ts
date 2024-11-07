interface IMicroservicesBaseUrls {
  auth: string;
  countries: string;
  states: string;
  cities: string;
  businesses: string;
  leads: string;
  users: string;
  queues: string;
  cityQueues: string;
}

export const microservicesBaseUrls: IMicroservicesBaseUrls = {
  auth: 'https://localhost:50001',
  countries: 'https://localhost:50002',
  states: 'https://localhost:50002',
  cities: 'https://localhost:50002',
  businesses: 'https://localhost:50003',
  leads: 'https://localhost:50003',
  users: 'https://localhost:50018',
  queues: 'https://localhost:50004',
  cityQueues: 'https://localhost:50004',
};
