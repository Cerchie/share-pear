export default async (request, context) => {
	const response = await context.next();

	// Only allow requests from our own domains
	let url = request.headers.get("origin");

	let allowedUrlsRegex =
		/^(https?:\/\/)?(localhost(:\d+)?|([a-zA-Z0-9-]+\.)?contenda\.co|(contenda(-test)?-platty-plat)\.netlify\.app)(\/.*)?$/;

	if (url && allowedUrlsRegex.test(url)) {
		response.headers.set("Access-Control-Allow-Origin", url);
	}

	// Accept markdown header
	response.headers.set(
		"Access-Control-Allow-Headers",
		"Content-Type, markdown"
	);

	// Cache for 30 days
	response.headers.set("Cache-Control", "public, max-age=2592000, immutable");

	return response;
};
