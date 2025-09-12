import { S3Client, ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';
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
const PREFIX = '_next/'; // folder to delete

async function deleteNextFolder() {
	try {
		let continuationToken = undefined;
		do {
			const listRes = await s3.send(
				new ListObjectsV2Command({
					Bucket: BUCKET,
					Prefix: PREFIX,
					ContinuationToken: continuationToken,
				}),
			);

			if (!listRes.Contents || listRes.Contents.length === 0) {
				console.log('No objects found to delete');
				break;
			}

			const deleteParams = {
				Bucket: BUCKET,
				Delete: {
					Objects: listRes.Contents.map((obj) => ({ Key: obj.Key })),
					Quiet: false,
				},
			};

			const delRes = await s3.send(new DeleteObjectsCommand(deleteParams));
			console.log(
				'Deleted objects:',
				delRes.Deleted.map((d) => d.Key),
			);

			continuationToken = listRes.IsTruncated ? listRes.NextContinuationToken : undefined;
		} while (continuationToken);
		console.log('✅ Done deleting _next folder');
	} catch (err) {
		console.error('❌ Failed to delete _next folder', err);
		process.exit(1);
	}
}

deleteNextFolder();
