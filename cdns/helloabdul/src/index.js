function corsHeaders() {
	return {
		'Cache-Control': 'public, max-age=86400, immutable',
		'Access-Control-Allow-Origin': '*', // ✅ allow all origins
		'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Allow-Credentials': 'true',
		'Cross-Origin-Resource-Policy': 'cross-origin', // ✅ needed for fonts
		'Cross-Origin-Embedder-Policy': 'require-corp', // optional, depends on your app
	};
}

export default {
	async fetch(req, env) {
		const url = new URL(req.url);
		// We decode the URL's pathname to correctly handle percent-encoded characters like `[` and `]`
		const decodedPathname = decodeURI(url.pathname);
		const pathname = url.pathname;

		if (req.method === 'OPTIONS') {
			return new Response(null, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, OPTIONS',
					'Access-Control-Allow-Headers': '*',
					'Cross-Origin-Resource-Policy': 'cross-origin',
				},
			});
		}

		// --- 1. Handle /videos/ files from R2 ---
		if (pathname.startsWith('/videos/')) {
			// Redirect directly to the public R2 URL — Worker is not involved in serving the bytes
			const publicR2VideoUrl = `https://www.assets.helloabdul.com${pathname}`;
			return Response.redirect(publicR2VideoUrl, 302);
		}

		// --- 2. Serve ALL non-image assets from ASSETS first ---
		if (!pathname.startsWith('/images/') && !pathname.startsWith('/videos/')) {
			const objectKey = decodedPathname.replace(/^\//, '');

			// --- 1. Try R2 first with the decoded key ---
			let object = await env.MY_BUCKET.get(objectKey);

			if (object) {
				// Serve object from R2
				return new Response(object.body, {
					headers: {
						'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
						'Cache-Control': 'public, max-age=86400, immutable',
						'Access-Control-Allow-Origin': '*', // ✅ allow all origins
						'Access-Control-Allow-Methods': 'GET, OPTIONS',
						'Access-Control-Allow-Headers': '*',
						'Cross-Origin-Resource-Policy': 'cross-origin', // ✅ needed for fonts
						'Cross-Origin-Embedder-Policy': 'require-corp', // optional, depends on your app
					},
				});
			}

			// --- 2. Fallback to local ASSETS if R2 missing ---
			try {
				const assetRes = await env.ASSETS.fetch(req);
				if (assetRes.ok) return assetRes;
			} catch (e) {
				console.error(e);
			}

			// --- 3. If not found anywhere ---
			return new Response('Worker 1: Not Found', { status: 404 });
		}

		// --- 3. Handle /images/... from R2 ---
		if (!pathname.startsWith('/images/')) {
			return new Response('Worker 2: Not Found', { status: 404 });
		}

		let objectPath = pathname;

		// Detect resize request (contains /m/)
		let resizeOptions = null;
		if (pathname.includes('/m/')) {
			[objectPath, resizeOptions] = pathname.split('/m/');
			resizeOptions = parseResizeOptions(resizeOptions);
		}

		const objectKey = objectPath.replace(/^\//, '');
		let object = await env.MY_BUCKET.get(objectKey);

		// Fallback to static assets if not found in R2
		if (!object) {
			try {
				const assetUrl = new URL(req.url);
				assetUrl.pathname = objectPath;
				const assetRes = await env.ASSETS.fetch(new Request(assetUrl, req));
				if (assetRes.ok) return assetRes;
			} catch (e) {}
			return new Response('Worker 3: Not Found', { status: 404 });
		}

		// If resize options exist, use Cloudflare's image resizing
		if (resizeOptions) {
			const imageRequest = new Request(`https://www.cdn.helloabdul.com/${objectKey}`, {
				headers: {
					'Content-Type': object.httpMetadata?.contentType || 'image/jpeg',
					'Cache-Control': 'public, max-age=86400',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, OPTIONS',
					'Access-Control-Allow-Headers': '*',
				},
				cf: { image: resizeOptions },
			});

			// Fetch the image through CF for resizing
			return fetch(imageRequest);
		}

		// Normal fetch without resizing
		return new Response(object.body, {
			headers: {
				'Content-Type': object.httpMetadata?.contentType || 'image/jpeg',
				'Cache-Control': 'public, max-age=86400',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, OPTIONS',
				'Access-Control-Allow-Headers': '*',
			},
		});
	},
};

// Helper: convert string like "100x100/filters:quality(70)" to Cloudflare image options
function parseResizeOptions(resizeStr) {
	const parts = resizeStr.split('/');
	const [w, h] = parts[0].split('x').map(Number);

	const options = {};
	if (w) options.width = w;
	if (h) options.height = h;

	const filters = parts.find((p) => p.startsWith('filters:'));
	if (filters && filters.includes('quality(')) {
		const match = filters.match(/quality\((\d+)\)/);
		if (match) options.quality = parseInt(match[1]);
	}

	// Optional: always force format to auto
	options.format = 'auto';

	return options;
}
