import { Request, Response } from 'express';
import Queue from '../models/Queue';
import logger from '../utils/logger';

export const getQueues = async (req: Request, res: Response) => {
  try {
    const queues = await Queue.findAll({
      order: [['searchQuery', 'ASC']],
    });

    logger.info('Retrieved queues successfully.');

    res.json(queues);
  } catch (error) {
    logger.error('Error while retrieving queues:', error);
    res.status(500).json({ error: 'An error occurred while retrieving queues' });
  }
};

export const getQueueById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const queue = await Queue.findOne({ where: { id } });

    if (!queue) {
      logger.warn(`Queue with ID ${id} not found.`);
      return res.status(404).json({ error: 'Queue not found' });
    }

    logger.info(`Retrieved queue with ID ${id} successfully.`);

    res.json(queue);
  } catch (error) {
    logger.error(`Error while retrieving queue with ID ${id}:`, error);
    res.status(500).json({ error: 'An error occurred while retrieving queue' });
  }
};

export const updateQueue = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { laptopName, status } = req.body;

    const queue = await Queue.findByPk(id);

    if (queue) {
      queue.laptopName = laptopName;
      queue.status = status;
      await queue.save();

      logger.info(`Updated queue with ID ${id} successfully.`);

      res.json(queue);
    } else {
      logger.warn(`Queue with ID ${id} not found.`);
      res.status(404).json({ error: 'Queue not found' });
    }
  } catch (error) {
    logger.error('Error updating queue:', error);
    res.status(500).json({ error: 'Failed to update queue' });
  }
};
