import { LeadMessageKey, getLeadMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type ILeadBuldDeleteRequestAttributes, type ILeadFetchByIdRequestAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';

import { Lead } from '../../models';

export const deleteLead = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as ILeadFetchByIdRequestAttributes;

  try {
    const lead = await Lead.findOne({ where: { id } });
    if (lead == null) {
      logger.warn(`Lead with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.LEAD_NOT_FOUND).message, status: getLeadMessage(LeadMessageKey.LEAD_NOT_FOUND).code });
      return res.json(response);
    }
    await lead.destroy();

    const response: ApiResponse<null> = createApiResponse({ success: true, message: getLeadMessage(LeadMessageKey.LEAD_DELETED).message, status: getLeadMessage(LeadMessageKey.LEAD_DELETED).code });
    return res.json(response);
  } catch (error) {
    logger.error(`Error while deleting lead with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.FAILED_TO_DELETE_LEAD).message, status: getLeadMessage(LeadMessageKey.FAILED_TO_DELETE_LEAD).code });
    return res.json(response);
  }
};

export const deleteLeads = async (req: Request, res: Response): Promise<Response> => {
  const { selectedLeadIds } = req.body as ILeadBuldDeleteRequestAttributes;

  try {
    const leads = await Lead.findAll({ where: { id: selectedLeadIds } });

    if (leads == null || leads.length === 0) {
      logger.warn('No leads found with the given IDs');
      const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.LEADS_NOT_FOUND).message, status: getLeadMessage(LeadMessageKey.LEADS_NOT_FOUND).code });
      return res.json(response);
    }

    // Deleting leads one by one
    const deletePromises = leads.map(async (lead) => {
      await lead.destroy();
    });
    await Promise.all(deletePromises);

    const response: ApiResponse<null> = createApiResponse({ success: true, message: getLeadMessage(LeadMessageKey.LEADS_DELETED).message, status: getLeadMessage(LeadMessageKey.LEADS_DELETED).code });
    return res.json(response);
  } catch (error) {
    logger.error('Error while deleting leads:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.FAILED_TO_DELETE_LEADS).message, status: getLeadMessage(LeadMessageKey.FAILED_TO_DELETE_LEADS).code });
    return res.json(response);
  }
};
