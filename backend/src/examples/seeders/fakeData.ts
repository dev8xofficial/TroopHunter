import casual from 'casual';
import User from '../../models/User';
import Business from '../../models/Business';
import Lead from '../../models/Lead';
import Lists from '../../models/Lists';
import { UserAttributes } from '../../types/user';
import { BusinessAttributes } from '../../types/business';
import { LeadAttributes } from '../../types/lead';
import { ListsAttributes } from '../../types/lists';

const seedUsers = async (count: number) => {
  const users: UserAttributes[] = [];

  for (let i = 0; i < count; i++) {
    const user: UserAttributes = {
      firstName: casual.first_name,
      lastName: casual.last_name,
      email: casual.email,
      password: casual.password,
      role: casual.random_element(['guest', 'user', 'admin']),
    };

    users.push(user);
  }

  await User.bulkCreate(users);
  console.log('Users:::::::::::::::::::::::::::::: ', users[0]);
};

const seedBusinesses = async (count: number) => {
  const cities = [
    { name: 'New York', state: 'New York', country: 'United States', postalCode: '10001' },
    { name: 'San Francisco', state: 'California', country: 'United States', postalCode: '94101' },
    { name: 'London', state: 'London', country: 'United Kingdom', postalCode: 'SW1A 1AA' },
    { name: 'Berlin', state: 'Berlin', country: 'Germany', postalCode: '10115' },
    { name: 'Sydney', state: 'New South Wales', country: 'Australia', postalCode: '2000' },
  ];

  const businesses: BusinessAttributes[] = [];

  for (let i = 0; i < count; i++) {
    const city = casual.random_element(cities);

    const business: BusinessAttributes = {
      name: casual.company_name,
      description: casual.catch_phrase,
      category: casual.random_element([casual.word, casual.words(2)]),
      address: casual.address,
      city: city.name,
      state: city.state,
      country: city.country,
      postalCode: city.postalCode,
      phone: casual.phone,
      email: casual.email,
      website: casual.url,
      rating: casual.integer(1, 5),
      reviews: casual.integer(0, 1000),
      timezone: casual.timezone,
      photos: [casual.url, casual.url, casual.url],
      source: casual.random_element(['Google', 'Yelp', 'Facebook']),
      operatingStatus: casual.random_element(['open', 'closed', 'temporarily closed']),
      socialMedia: [casual.url, casual.url, casual.url],
      openingTime: casual.time('HH:mm'),
      closingTime: casual.time('HH:mm'),
    };

    businesses.push(business);
  }

  await Business.bulkCreate(businesses);
  console.log('Businesses:::::::::::::::::::::::::::::: ', businesses[0]);
};

const seedLeads = async (count: number) => {
  const cities = [
    { name: 'New York', state: 'New York', country: 'United States', postalCode: '10001' },
    { name: 'San Francisco', state: 'California', country: 'United States', postalCode: '94101' },
    { name: 'London', state: 'London', country: 'United Kingdom', postalCode: 'SW1A 1AA' },
    { name: 'Berlin', state: 'Berlin', country: 'Germany', postalCode: '10115' },
    { name: 'Sydney', state: 'New South Wales', country: 'Australia', postalCode: '2000' },
  ];

  const leads: LeadAttributes[] = [];

  const users = await User.findAll();

  for (let i = 0; i < count; i++) {
    const city = casual.random_element(cities);

    const lead: LeadAttributes = {
      title: casual.title,
      ownerId: casual.random_element(users).id!,
      search: casual.word,
      keywords: casual.words(5),
      address: casual.address,
      city: city.name,
      state: city.state,
      country: city.country,
      postalCode: city.postalCode,
      phone: casual.phone,
      email: casual.email,
      website: casual.url,
      rating: casual.integer(1, 5),
      reviews: casual.integer(0, 1000),
      timezone: casual.timezone,
      operatingStatus: casual.random_element(['open', 'closed', 'temporarily closed']),
      openingTime: casual.time('HH:mm'),
      closingTime: casual.time('HH:mm'),
    };

    leads.push(lead);
  }

  await Lead.bulkCreate(leads);
  console.log('Leads:::::::::::::::::::::::::::::: ', leads[0]);
};

const seedLists = async (count: number) => {
  const lists: ListsAttributes[] = [];

  const users = await User.findAll();
  const leads = await Lead.findAll();

  for (let i = 0; i < count; i++) {
    const list: ListsAttributes = {
      titles: casual.words(2),
      ownerId: casual.random_element(users).id!,
      leads: Array.from({ length: casual.integer(1, 10) }, () => casual.random_element(leads.map((lead) => lead.id!))),
    };

    lists.push(list);
  }

  await Lists.bulkCreate(lists);
  console.log('List:::::::::::::::::::::::::::::: ', lists[0]);
};

// Usage example:
const seedDatabase = async () => {
  // Seed 100 users
  await seedUsers(100);

  // Seed 50,000 businesses
  await seedBusinesses(50000);

  // Seed 10,000 leads
  await seedLeads(10000);

  // Seed 10,000 lists
  await seedLists(10000);

  console.log('Seeding completed!');
};

export default seedDatabase;
