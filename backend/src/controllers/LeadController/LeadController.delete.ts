import { Request, Response } from 'express';
import Lead from '../../models/Lead/Lead.model';
import logger from '../../utils/logger';
import { createApiResponse } from '../../utils/response';
import { ApiResponse } from '../../types/Response.interface';
import { LeadMessageKey, getLeadMessage } from '../../models/Lead/Lead.messages';

export const deleteLead = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  try {
    const lead = await Lead.findOne({ where: { id } });
    if (!lead) {
      logger.warn(`Lead with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.LEAD_NOT_FOUND).message, status: getLeadMessage(LeadMessageKey.LEAD_NOT_FOUND).code });
      return res.json(response);
    }
    await lead.destroy();

    const response: ApiResponse<null> = createApiResponse({ success: true, message: getLeadMessage(LeadMessageKey.LEAD_DELETED).message, status: getLeadMessage(LeadMessageKey.LEAD_DELETED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while deleting lead with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.FAILED_TO_DELETE_LEAD).message, status: getLeadMessage(LeadMessageKey.FAILED_TO_DELETE_LEAD).code });
    res.json(response);
  }
};

export const deleteLeads = async (req: Request, res: Response) => {
  const { ids } = req.body as { ids: string[] };

  try {
    const leads = await Lead.findAll({ where: { id: ids } });

    if (!leads || leads.length === 0) {
      logger.warn('No leads found with the given IDs');
      const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.LEADS_NOT_FOUND).message, status: getLeadMessage(LeadMessageKey.LEADS_NOT_FOUND).code });
      return res.json(response);
    }

    // Deleting leads one by one
    const deletePromises = leads.map((lead) => lead.destroy());
    await Promise.all(deletePromises);

    const response: ApiResponse<null> = createApiResponse({ success: true, message: getLeadMessage(LeadMessageKey.LEADS_DELETED).message, status: getLeadMessage(LeadMessageKey.LEADS_DELETED).code });
    res.json(response);
  } catch (error) {
    logger.error('Error while deleting leads:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.FAILED_TO_DELETE_LEADS).message, status: getLeadMessage(LeadMessageKey.FAILED_TO_DELETE_LEADS).code });
    res.json(response);
  }
};
