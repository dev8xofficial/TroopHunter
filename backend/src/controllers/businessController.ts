import { Request, Response } from 'express';
import Business from '../models/Business';

export const createBusiness = async (req: Request, res: Response) => {
  try {
    const { name, address, phone, openingTime, closingTime, dineIn, takeaway, website, location, delivery } = req.body;

    const business = await Business.create({
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
    const { name, address, phone, openingTime, closingTime, dineIn, takeaway, website, location, delivery } = req.body;

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
