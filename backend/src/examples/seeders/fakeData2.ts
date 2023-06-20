import casual from 'casual';
import { faker } from '@faker-js/faker';
import User from '../../models/User';
import Business from '../../models/Business';
import Lead from '../../models/Lead';
import List from '../../models/List';
import { UserAttributes } from '../../types/user';
import { BusinessAttributes } from '../../types/business/business';
import { LeadAttributes } from '../../types/lead';
import { ListAttributes } from '../../types/list';
import BusinessCategory from '../../models/BusinessCategory';
import BusinessClosingHour from '../../models/BusinessClosingHour';
import Location from '../../models/Location';
import PostalCode from '../../models/PostalCode';
import BusinessOpeningHour from '../../models/BusinessOpeningHour';
import BusinessOperatingStatus from '../../models/BusinessOperatingStatus';
import BusinessPhone from '../../models/BusinessPhone';
import BusinessPhoto from '../../models/BusinessPhoto';
import BusinessRating from '../../models/BusinessRating';
import BusinessSocialMedia from '../../models/BusinessSocialMedia';
import BusinessSource from '../../models/BusinessSource';
import Timezone from '../../models/Timezone';
import { BusinessCategoryAttributes } from '../../types/business/businessCategory';
import { OpeningTimeAttributes } from '../../types/business/openingHour';
import { LocationAttributes } from '../../types/business/location';
import { OperatingStatusAttributes } from '../../types/business/operatingStatus';
import { PhoneAttributes } from '../../types/business/phone';
import { PhotoAttributes } from '../../types/business/photo';
import { RatingAttributes } from '../../types/business/rating';
import { SourceAttributes } from '../../types/business/source';
import { TimezoneAttributes } from '../../types/business/timezone';
import { SocialMediaAttributes } from '../../types/business/socialMedia';
import { ClosingTimeAttributes } from '../../types/business/closingHour';
import { PostalCodeAttributes } from '../../types/business/postalCode';
import { RBusinessAttributes } from '../../types/rbusiness';
import RBusiness from '../../models/RBusiness';

const seedBusinessCategories = async (count: number): Promise<BusinessCategoryAttributes[]> => {
  try {
    const categories: Partial<BusinessCategoryAttributes>[] = [];
    const values: string[] = ['Corporation', 'Limited liability company', 'Retail', 'Retail Estate', 'Cooperative', 'Marketing', 'Advertising', 'Finance', 'Nonprofit Organization', 'Agriculture', 'S corporation', 'C corporation', 'Construction', 'Manufacturing', 'Restaurant', 'Investing', 'Limited Company', 'Financial Services', 'Bank', 'Food Service', 'Convenience Store', 'Bakery'];

    for (let i = 0; i < count; i++) {
      const category: Partial<BusinessCategoryAttributes> = {
        name: values[Math.floor(Math.random() * 21)],
      };

      categories.push(category);
    }

    const categoriesData = await BusinessCategory.bulkCreate(categories);
    console.log(`Successfully seeded ${count} categories.`);
    return categoriesData;
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }
};

const seedBusinessLocations = async (count: number): Promise<LocationAttributes[]> => {
  try {
    const cities = [
      { name: 'New York', state: 'New York', country: 'United States', postalCode: '10001' },
      { name: 'San Francisco', state: 'California', country: 'United States', postalCode: '94101' },
      { name: 'London', state: 'London', country: 'United Kingdom', postalCode: 'SW1A 1AA' },
      { name: 'Berlin', state: 'Berlin', country: 'Germany', postalCode: '10115' },
      { name: 'Sydney', state: 'New South Wales', country: 'Australia', postalCode: '2000' },
    ];
    const locations: Partial<LocationAttributes>[] = [];

    for (let i = 0; i < count; i++) {
      const city = cities[i];
      const location: Partial<LocationAttributes> = {
        city: city.name,
        state: city.state,
        country: city.country,
      };

      locations.push(location);
    }

    const locationsData = await Location.bulkCreate(locations);
    console.log(`Seeding of Location table complete.`);
    return locationsData;
  } catch (error) {
    console.error(`Error seeding Location table: ${error}`);
    throw error;
  }
};

const seedPostalCodes = async (count: number): Promise<PostalCodeAttributes[]> => {
  try {
    const cities = [
      { name: 'New York', state: 'New York', country: 'United States', postalCode: '10001' },
      { name: 'San Francisco', state: 'California', country: 'United States', postalCode: '94101' },
      { name: 'London', state: 'London', country: 'United Kingdom', postalCode: 'SW1A 1AA' },
      { name: 'Berlin', state: 'Berlin', country: 'Germany', postalCode: '10115' },
      { name: 'Sydney', state: 'New South Wales', country: 'Australia', postalCode: '2000' },
    ];
    const postalCodes: PostalCodeAttributes[] = [];

    for (let i = 0; i < count; i++) {
      const city = cities[i];
      const postalCode: PostalCode = await PostalCode.create({
        code: city.postalCode,
      });

      postalCodes.push(postalCode.toJSON());
    }

    console.log(`Seeding of Location table complete.`);
    return postalCodes;
  } catch (error) {
    console.error(`Error seeding Location table: ${error}`);
    throw error;
  }
};

const seedBusinessOperatingStatuses = async (count: number): Promise<OperatingStatusAttributes[]> => {
  try {
    const operatingStatuses: Partial<OperatingStatusAttributes>[] = [];
    const values: string[] = ['open', 'close', 'temporarily-close'];

    for (let i = 0; i < count; i++) {
      const operatingStatus: Partial<OperatingStatusAttributes> = {
        operatingStatus: values[Math.floor(Math.random() * 3)],
      };
      operatingStatuses.push(operatingStatus);
    }

    const operatingStatusesData = await BusinessOperatingStatus.bulkCreate(operatingStatuses);
    console.log(`${count} records inserted into BusinessOperatingStatus table.`);
    return operatingStatusesData;
  } catch (error) {
    console.error('Error seeding BusinessOperatingStatus:', error);
    throw error;
  }
};

const seedBusinessPhones = async (count: number): Promise<PhoneAttributes[]> => {
  try {
    const phones: Partial<PhoneAttributes>[] = [];

    for (let i = 0; i < count; i++) {
      const phone: Partial<BusinessPhone> = {
        countryCode: faker.location.countryCode(),
        areaCode: faker.phone.number().slice(0, 3),
        phoneNumber: faker.phone.number().split('(').join('').split(')').join('').split('-').join('').split(' ').join(''),
        phoneNumberFormatted: faker.phone.number(),
        notes: faker.lorem.sentence(),
      };

      phones.push(phone);
    }

    const phonesData = await BusinessPhone.bulkCreate(phones);
    console.log(`Successfully seeded ${count} records in the BusinessPhone table.`);
    return phonesData;
  } catch (error) {
    console.error('Error seeding BusinessPhone table:', error);
    throw error;
  }
};

const seedBusinessRatings = async (count: number): Promise<RatingAttributes[]> => {
  try {
    const ratings: Partial<RatingAttributes>[] = [];

    for (let i = 0; i < count; i++) {
      const rating: Partial<RatingAttributes> = {
        ratingValue: faker.number.float({ min: 1, max: 5, precision: 1 }),
        description: faker.lorem.words(3),
      };

      ratings.push(rating);
    }

    const ratingsData = await BusinessRating.bulkCreate(ratings);
    console.log(`Successfully seeded ${count} records in the BusinessRating table.`);
    return ratingsData;
  } catch (error) {
    console.error('Error seeding BusinessRating table:', error);
    throw error;
  }
};

const generateBusinessSocialMedia = (): Partial<BusinessSocialMedia> => {
  const socialMediaData: Partial<BusinessSocialMedia> = {
    businessId: faker.datatype.uuid(),
    facebookProfile: faker.internet.url(),
    twitterProfile: faker.internet.url(),
    instagramProfile: faker.internet.url(),
    linkedInProfile: faker.internet.url(),
    youTubeProfile: faker.internet.url(),
  };

  return socialMediaData;
};

const seedBusinessSocialMedia = async (count: number): Promise<SocialMediaAttributes[]> => {
  try {
    const socialMediaDataArray: Partial<BusinessSocialMedia>[] = [];

    for (let i = 0; i < count; i++) {
      const socialMediaData = generateBusinessSocialMedia();
      if (socialMediaData?.toJSON) socialMediaDataArray.push(socialMediaData.toJSON());
      else socialMediaDataArray.push(socialMediaData);
    }

    const socialMediaData = await BusinessSocialMedia.bulkCreate(socialMediaDataArray);
    console.log(`Successfully seeded ${count} entries in the BusinessSocialMedia table.`);
    return socialMediaData;
  } catch (error) {
    console.error('Error seeding BusinessSocialMedia table:', error);
    throw error;
  }
};

const seedBusinessSources = async (count: number): Promise<SourceAttributes[]> => {
  try {
    const sources: Partial<SourceAttributes>[] = [];
    const values: string[] = ['google-maps', 'google', 'facebook'];

    for (let i = 0; i < count; i++) {
      const source: Partial<SourceAttributes> = {
        sourceName: values[Math.floor(Math.random() * 3)],
      };

      sources.push(source);
    }

    const sourcesData = await BusinessSource.bulkCreate(sources);
    console.log(`Successfully seeded ${count} records in the BusinessSource table.`);
    return sourcesData;
  } catch (error) {
    console.error('Error seeding the BusinessSource table:', error);
    throw error;
  }
};

const generateTimezones = (): Partial<Timezone> => {
  const timezoneData: Partial<Timezone> = {
    timezoneName: faker.location.timeZone(),
    utcOffset: faker.number.int({ min: -12, max: 12 }).toString(),
    dst: faker.datatype.boolean(),
    dstOffset: faker.number.int({ min: -12, max: 12 }).toString(),
    countryCode: faker.location.countryCode(),
    notes: faker.lorem.sentence(),
  };

  return timezoneData;
};

const seedTimezones = async (count: number): Promise<TimezoneAttributes[]> => {
  try {
    const timezones: Partial<TimezoneAttributes>[] = [];

    for (let i = 0; i < count; i++) {
      const timezoneData = generateTimezones();
      if (timezoneData?.toJSON) timezones.push(timezoneData.toJSON());
      else timezones.push(timezoneData);
    }

    const timezoneData = await Timezone.bulkCreate(timezones);
    console.log(`Successfully seeded ${count} entries in the Timezone table.`);
    return timezoneData;
  } catch (error) {
    console.error('Error seeding Timezone table:', error);
    throw error;
  }
};

const seedBusinessOpeningHours = async (count: number): Promise<OpeningTimeAttributes[]> => {
  try {
    const openingHours: Partial<OpeningTimeAttributes>[] = [];

    for (let i = 0; i < count; i++) {
      const openingHour: Partial<OpeningTimeAttributes> = {
        time: casual.time('HH:mm'),
      };

      openingHours.push(openingHour);
    }

    const openingTimesData = await BusinessOpeningHour.bulkCreate(openingHours);
    console.log(`${count} BusinessOpeningHour records seeded successfully.`);
    return openingTimesData;
  } catch (error) {
    console.error('Error seeding BusinessOpeningHour:', error);
    throw error;
  }
};

const seedBusinessClosingHours = async (count: number): Promise<ClosingTimeAttributes[]> => {
  try {
    const closingHours: Partial<ClosingTimeAttributes>[] = [];

    for (let i = 0; i < count; i++) {
      const closingHour: Partial<ClosingTimeAttributes> = {
        time: casual.time('HH:mm'),
      };

      closingHours.push(closingHour);
    }

    const closingTimesData = await BusinessClosingHour.bulkCreate(closingHours);
    console.log(`${count} BusinessClosingHour records seeded successfully.`);
    return closingTimesData;
  } catch (error) {
    console.error('Error seeding BusinessClosingHour:', error);
    throw error;
  }
};

const seedBusinessPhotos = async (count: number): Promise<PhotoAttributes[]> => {
  try {
    const photos: Partial<PhotoAttributes>[] = [];

    for (let i = 0; i < count; i++) {
      const photo: Partial<PhotoAttributes> = {
        businessId: faker.string.uuid(),
        photoUrl: faker.image.url(),
        description: faker.lorem.sentence(),
      };

      photos.push(photo);
    }

    const photosData = await BusinessPhoto.bulkCreate(photos);
    console.log(`Successfully seeded ${count} photos in the BusinessPhoto table.`);
    return photosData;
  } catch (error) {
    console.error('Error seeding photos:', error);
    throw error;
  }
};

const seedBusinesses = async (count: number) => {
  const businesses: BusinessAttributes[] = [];
  const categories: any[] = await seedBusinessCategories(21);
  const locations: any[] = await seedBusinessLocations(5);
  const postalCodes: any[] = await seedPostalCodes(5);
  const phones: PhoneAttributes[] = await seedBusinessPhones(count);
  const ratings: RatingAttributes[] = await seedBusinessRatings(count);
  const timezones: TimezoneAttributes[] = await seedTimezones(count);
  const sources: SourceAttributes[] = await seedBusinessSources(3);
  const operatingStatuses: OperatingStatusAttributes[] = await seedBusinessOperatingStatuses(count);
  // const socialMediaTable: SocialMediaAttributes[] = await seedBusinessSocialMedia(count);
  const openingHours: OpeningTimeAttributes[] = await seedBusinessOpeningHours(count);
  const closingHours: ClosingTimeAttributes[] = await seedBusinessClosingHours(count);
  // const photoTable: PhotoAttributes[] = await seedBusinessPhotos(count);

  for (let i = 0; i < count; i++) {
    const categoryIndex = Math.floor(Math.random() * 21);
    const locationIndex = Math.floor(Math.random() * 5);
    const business: BusinessAttributes = {
      name: casual.company_name,
      description: casual.catch_phrase,
      categoryId: categories[categoryIndex].id,
      locationId: locations[locationIndex].id,
      postalCodeId: postalCodes[locationIndex].id,
      address: casual.address,
      email: casual.email,
      website: casual.url,
      reviews: casual.integer(0, 1000),
      sourceId: sources[Math.floor(Math.random() * 3)].id,
    };

    if (phones[i] && phones[i].id) business.phoneId = phones[i].id;

    if (ratings[i] && ratings[i].id) business.ratingId = ratings[i].id;

    if (timezones[i] && timezones[i].id) business.timezoneId = timezones[i].id;

    if (operatingStatuses[i] && operatingStatuses[i].id) business.operatingStatusId = operatingStatuses[i].id;

    if (openingHours[i] && openingHours[i].id) business.openingTimeId = openingHours[i].id;

    if (closingHours[i] && closingHours[i].id) business.closingTimeId = closingHours[i].id;

    businesses.push(business);
  }

  await Business.bulkCreate(businesses);
  console.log('Businesses:::::::::::::::::::::::::::::: ', businesses[0]);
};

const seedUsers = async (count: number) => {
  const users: UserAttributes[] = [];

  for (let i = 0; i < count; i++) {
    const user: UserAttributes = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: casual.random_element(['guest', 'user', 'admin']),
    };

    users.push(user);
  }

  await User.bulkCreate(users);
  console.log('Users:::::::::::::::::::::::::::::: ', users[0]);
};

const seedRBusinesses = async (count: number) => {
  const cities = [
    { name: 'New York', state: 'New York', country: 'United States', postalCode: '10001' },
    { name: 'San Francisco', state: 'California', country: 'United States', postalCode: '94101' },
    { name: 'London', state: 'London', country: 'United Kingdom', postalCode: 'SW1A 1AA' },
    { name: 'Berlin', state: 'Berlin', country: 'Germany', postalCode: '10115' },
    { name: 'Sydney', state: 'New South Wales', country: 'Australia', postalCode: '2000' },
  ];

  const businesses: RBusinessAttributes[] = [];

  for (let i = 0; i < count; i++) {
    const city = casual.random_element(cities);

    const business: RBusinessAttributes = {
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
      openingHour: casual.time('HH:mm'),
      closingHour: casual.time('HH:mm'),
    };

    businesses.push(business);
  }

  await RBusiness.bulkCreate(businesses);
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
      openingHour: casual.time('HH:mm'),
      closingHour: casual.time('HH:mm'),
    };

    leads.push(lead);
  }

  await Lead.bulkCreate(leads);
  console.log('Leads:::::::::::::::::::::::::::::: ', leads[0]);
};

const seedLists = async (count: number) => {
  const lists: ListAttributes[] = [];

  const users = await User.findAll();
  const leads = await Lead.findAll();

  for (let i = 0; i < count; i++) {
    const list: ListAttributes = {
      titles: casual.words(2),
      ownerId: casual.random_element(users).id!,
      leads: Array.from({ length: casual.integer(1, 10) }, () => casual.random_element(leads.map((lead) => lead.id!))),
    };

    lists.push(list);
  }

  await List.bulkCreate(lists);
  console.log('List:::::::::::::::::::::::::::::: ', lists[0]);
};

// Usage example:
const seedDatabase = async () => {
  // Seed 100 users
  await seedUsers(100);

  // Seed 50,000 businesses
  await seedRBusinesses(50000);

  // Seed 10,000 leads
  await seedLeads(10000);

  // Seed 10,000 lists
  await seedLists(10000);

  // Seed 50,000 businesses
  await seedBusinesses(50000);

  console.log('Seeding completed!');
};

export default seedDatabase;
