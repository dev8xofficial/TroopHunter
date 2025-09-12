import { S3Client, HeadObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import mime from 'mime';

dotenv.config();

const s3 = new S3Client({
	region: 'auto',
	endpoint: process.env.R2_ENDPOINT,
	forcePathStyle: true,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
	},
});

const BUCKET = process.env.R2_BUCKET;

// Paths for microfrontend dev8x
const PUBLIC_DIR = path.resolve('../../microfrontend/dev8x/public');
const NEXT_STATIC_DIR = path.resolve('../../microfrontend/dev8x/.next/static');

async function uploadFile(filePath, key) {
	try {
		const stats = fs.statSync(filePath);
		const head = await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));

		if (head.ContentLength === stats.size) {
			console.log(`⏭ Skipping ${key} (same size)`);
			return;
		}
	} catch (err) {
		// Not found → upload
	}

	const contentType = mime.lookup(filePath) || 'application/octet-stream';
	console.log(`📤 Uploading ${key} (${contentType})`);
	const body = fs.createReadStream(filePath);
	await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body, ContentType: contentType }));
}

function getFiles(dir, prefix = '') {
	return fs.readdirSync(dir).flatMap((file) => {
		const filePath = path.join(dir, file);
		const key = path.join(prefix, file).replace(/\\/g, '/');

		// Ignore cache images
		if (key.includes('images/cache/')) return [];

		if (fs.statSync(filePath).isDirectory()) {
			return getFiles(filePath, key);
		}
		return [{ filePath, key }];
	});
}

async function main() {
	// 1️⃣ Upload public/* files
	const publicFiles = getFiles(PUBLIC_DIR);
	await Promise.all(publicFiles.map(({ filePath, key }) => uploadFile(filePath, key)));

	// 2️⃣ Upload .next/static/*
	const nextPrefix = `_next/static/`;
	const nextFiles = getFiles(NEXT_STATIC_DIR, nextPrefix);
	await Promise.all(nextFiles.map(({ filePath, key }) => uploadFile(filePath, key)));
}

main().catch((err) => {
	console.error('❌ Upload failed', err);
	process.exit(1);
});
