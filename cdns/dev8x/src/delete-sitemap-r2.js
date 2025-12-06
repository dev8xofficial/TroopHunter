import { S3Client, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

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
const TARGET_FILE = 'sitemap.xml'; // file to delete from root

async function deleteSitemap() {
	try {
		// List objects to find sitemap.xml in root (not in subdirectories)
		const listRes = await s3.send(
			new ListObjectsV2Command({
				Bucket: BUCKET,
				Prefix: TARGET_FILE,
			}),
		);

		if (!listRes.Contents || listRes.Contents.length === 0) {
			console.log('sitemap.xml not found in root directory');
			return;
		}

		// Filter to only get exact match in root (not in subdirectories)
		const sitemapFile = listRes.Contents.find((obj) => obj.Key === TARGET_FILE);

		if (!sitemapFile) {
			console.log('sitemap.xml not found in root directory');
			return;
		}

		// Delete the file
		await s3.send(
			new DeleteObjectCommand({
				Bucket: BUCKET,
				Key: TARGET_FILE,
			}),
		);

		console.log('✅ Deleted sitemap.xml from root directory');
	} catch (err) {
		console.error('❌ Failed to delete sitemap.xml', err);
		process.exit(1);
	}
}

deleteSitemap();
