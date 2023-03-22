const URLParser = (baseUrl) => (req, res) => {
    const parsedURL = new URL(req.url, baseUrl);
    const params = {};

    parsedURL.searchParams.forEach((value, key) => params[key.toLowerCase()] = value.toLowerCase());

    req.pathname = parsedURL.pathname;
    req.params = params;
}

module.exports = URLParser;