import Business from '../models/Business';

export const createBusiness = async (name: string, address: string, phone: string, openingTime: string, closingTime: string, dineIn: boolean, takeaway: boolean, website: string, location: string, delivery: boolean) => {
  const business = await Business.create({
    id: 1,
    name,
    address,
    phone,
    openingTime,
    closingTime,
    dineIn,
    takeaway,
    website,
    location,
    delivery,
  });

  return business;
};

export const getBusinessById = async (businessId: number) => {
  const business = await Business.findByPk(businessId);

  return business;
};

export const updateBusiness = async (businessId: number, name: string, address: string, phone: string, openingTime: string, closingTime: string, dineIn: boolean, takeaway: boolean, website: string, location: string, delivery: boolean) => {
  const business = await Business.findByPk(businessId);

  if (business) {
    business.name = name;
    business.address = address;
    business.phone = phone;
    business.openingTime = openingTime;
    business.closingTime = closingTime;
    business.dineIn = dineIn;
    business.takeaway = takeaway;
    business.website = website;
    business.location = location;
    business.delivery = delivery;
    await business.save();

    return business;
  }

  return null;
};

export const deleteBusiness = async (businessId: number) => {
  const business = await Business.findByPk(businessId);

  if (business) {
    await business.destroy();
  }

  return null;
};

// Add more service functions as needed
