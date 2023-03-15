exports.handler = async (event, context) => {
  const host = event.headers.host;
  const [subdomain, ...apexDomainParts] = host.split(".");
  const apexDomain = apexDomainParts.join(".");

  if (subdomain && apexDomainParts.length > 1) {
    const newUrl = "http://" + apexDomain + event.path;
    return {
      statusCode: 301,
      headers: {
        Location: newUrl,
        "Cache-Control": "no-cache",
      },
      body: "",
    };
  } else {
    return {
      statusCode: 200,
      body: "Hello, you are on the apex domain!",
    };
  }
};
