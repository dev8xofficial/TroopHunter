import { Request, Response } from 'express';
import Queue from '../models/Queue';

export const getQueues = async (req: Request, res: Response) => {
  try {
    const queues = await Queue.findAll({
      order: [['searchQuery', 'ASC']],
    });
    res.json(queues);
  } catch (error) {
    console.error('Error while retrieving queues:', error);
    res.status(500).json({ error: 'An error occurred while retrieving queues' });
  }
};

export const getQueueById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const queue = await Queue.findOne({ where: { id } });
    if (!queue) {
      return res.status(404).json({ error: 'Queue not found' });
    }
    res.json(queue);
  } catch (error) {
    console.error('Error while retrieving queue:', error);
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

      res.json(queue);
    } else {
      res.status(404).json({ error: 'Queue not found' });
    }
  } catch (error) {
    console.error('Error updating queue:', error);
    res.status(500).json({ error: 'Failed to update queue' });
  }
};
