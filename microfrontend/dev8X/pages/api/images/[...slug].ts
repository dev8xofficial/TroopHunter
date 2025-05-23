import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import type { NextApiRequest, NextApiResponse } from 'next';

const imagesDir = path.resolve(process.cwd(), 'public/images');
const cacheDir = path.resolve(process.cwd(), 'public/cache');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug;

  if (!Array.isArray(slug) || slug.length < 4) {
    return res.status(400).send('Invalid request format');
  }

  const [...imagePathParts] = slug;
  const mIndex = imagePathParts.findIndex((part) => part === 'm');

  if (mIndex === -1 || mIndex + 2 >= imagePathParts.length) {
    return res.status(400).send('Missing dimensions or quality');
  }

  const imagePath = imagePathParts.slice(0, mIndex).join('/');
  const dimensions = imagePathParts[mIndex + 1];
  const qualityStr = imagePathParts[mIndex + 2];

  const [widthStr, heightStr] = dimensions.split('x');
  const parsedWidth = parseInt(widthStr, 10);
  const parsedHeight = parseInt(heightStr, 10);
  const parsedQuality = parseInt(qualityStr.replace(/\D/g, ''), 10);

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
    return res.setHeader('Content-Type', 'image/png').sendFile(cachePath);
  }

  try {
    const buffer = await sharp(inputPath).resize(parsedWidth, parsedHeight).png({ quality: parsedQuality }).toBuffer();

    fs.mkdirSync(path.dirname(cachePath), { recursive: true });
    fs.writeFileSync(cachePath, buffer);

    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  } catch (error) {
    console.error('Image processing error:', error);
    res.status(500).send('Image processing error');
  }
}
