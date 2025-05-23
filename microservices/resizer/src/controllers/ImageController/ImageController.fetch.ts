import fs from 'fs';
import path from 'path';

import { type Request, type Response } from 'express';
import sharp from 'sharp';

const imagesDir = path.resolve(process.cwd(), 'assets/images');
const cacheDir = path.resolve(process.cwd(), 'cache');

export const resizer = async (req: Request, res: Response): Promise<Response | void> => {
  const { dimensions, quality } = req.params;
  const imagePath = req.path.split('/m/')[0].replace(/^\/images/, ''); // strip "/images"

  const [widthStr, heightStr] = dimensions.split('x');
  const parsedWidth = parseInt(widthStr, 10);
  const parsedHeight = parseInt(heightStr, 10);
  const parsedQuality = parseInt(quality, 10);

  if (isNaN(parsedWidth) || isNaN(parsedHeight) || isNaN(parsedQuality)) {
    return res.status(400).send('Invalid width, height, or quality');
  }

  const inputPath = path.join(imagesDir, imagePath);
  const safeImageKey = imagePath.replace(/[\\/]/g, '_');
  const cacheKey = `${parsedWidth}x${parsedHeight}_q${parsedQuality}_${safeImageKey}`;
  const cachePath = path.join(cacheDir, cacheKey);

  if (!fs.existsSync(inputPath)) {
    return res.status(404).send('Original image not found');
  }

  if (fs.existsSync(cachePath)) {
    return res.sendFile(cachePath);
  }

  try {
    const buffer = await sharp(inputPath).resize(parsedWidth, parsedHeight).png({ quality: parsedQuality }).toBuffer();

    fs.mkdirSync(path.dirname(cachePath), { recursive: true });
    fs.writeFileSync(cachePath, buffer);

    res.type('image/png').send(buffer);
  } catch (error) {
    console.error('Image processing error:', error);
    res.status(500).send('Image processing error');
  }
};
