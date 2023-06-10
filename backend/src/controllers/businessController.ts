import { Request, Response } from 'express';
import Business from '../models/Business';

export const createBusiness = async (req: Request, res: Response) => {
  try {
    const { name, description, category, address, city, state, country, postalCode, phone, email, website, rating, reviews, timezone, photos, source, operatingStatus, socialMedia, openingTime, closingTime } = req.body;

    const business = await Business.create({
      name,
      description,
      category,
      address,
      city,
      state,
      country,
      postalCode,
      phone,
      email,
      website,
      rating,
      reviews,
      timezone,
      photos,
      source,
      operatingStatus,
      socialMedia,
      openingTime,
      closingTime,
    });

    res.status(201).json(business);
  } catch (error) {
    console.error('Error creating business:', error);
    res.status(500).json({ error: 'Failed to create business' });
  }
};

export const getBusiness = async (req: Request, res: Response) => {
  try {
    const businessId = req.params.id;

    const business = await Business.findByPk(businessId);

    if (business) {
      res.json(business);
    } else {
      res.status(404).json({ error: 'Business not found' });
    }
  } catch (error) {
    console.error('Error retrieving business:', error);
    res.status(500).json({ error: 'Failed to retrieve business' });
  }
};

export const updateBusiness = async (req: Request, res: Response) => {
  try {
    const businessId = req.params.id;
    const { name, description, category, address, city, state, country, postalCode, phone, email, website, rating, reviews, timezone, photos, source, operatingStatus, socialMedia, openingTime, closingTime } = req.body;

    const business = await Business.findByPk(businessId);

    if (business) {
      business.name = name;
      business.description = description;
      business.category = category;
      business.address = address;
      business.city = city;
      business.state = state;
      business.country = country;
      business.postalCode = postalCode;
      business.phone = phone;
      business.email = email;
      business.website = website;
      business.rating = rating;
      business.reviews = reviews;
      business.timezone = timezone;
      business.photos = photos;
      business.source = source;
      business.operatingStatus = operatingStatus;
      business.socialMedia = socialMedia;
      business.openingTime = openingTime;
      business.closingTime = closingTime;

      await business.save();

      res.json(business);
    } else {
      res.status(404).json({ error: 'Business not found' });
    }
  } catch (error) {
    console.error('Error updating business:', error);
    res.status(500).json({ error: 'Failed to update business' });
  }
};

export const deleteBusiness = async (req: Request, res: Response) => {
  try {
    const businessId = req.params.id;

    const business = await Business.findByPk(businessId);

    if (business) {
      await business.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Business not found' });
    }
  } catch (error) {
    console.error('Error deleting business:', error);
    res.status(500).json({ error: 'Failed to delete business' });
  }
};
