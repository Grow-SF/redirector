This is a general purpose HTTP(S) redirector. It will strip the subdomain and redirect all traffic to the apex domain, preserving the path and all query parameters.

# Deploying

Two implementations are present in this repo. There's a bare `express` app at `app.js` which you can run on any Node server, as well as a Netlify function at `functions/redirector.js`.

Deploying on Netlify is as simlpe as creating a new site from this repo.