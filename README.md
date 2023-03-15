This is a general purpose HTTP(S) redirector. It will strip the subdomain and redirect all traffic to the apex domain, preserving the path and all query parameters.

Two implementations are present in this repo. There's a bare `express` app at `app.js` which you can run on any Node server, as well as a Netlify function at `functions/redirector.js`.

# Deploying on Netlify

Deploying on Netlify is fairly simple, but has one important caveat: **Do not use Netlify for DNS if you're redirecting from the `www` subdomain!**

If you use Netlify DNS and want to redirect from `www.example.com` to `example.com`, the step below where you add a Domain will cause your main site at `example.com` to stop resolving to whatever `A` record you set and start resolving to Netlify. This shouldn't happen for other subdomains, though; it appears Netlify special-cases `www` for their most common use case.

1. Create a new site via the "Import from existing project" option
2. Specify this repo as the source
3. It should auto-configure the site settings correctly via `netlify.toml`
4. Go to "Domain Settings" for your new site and add `www.<YOURDOMAIN>.com`
5. If you aren't using Netlify DNS due to the note above, go to your DNS provider and add a `CNAME` record for `www` that points to your Netlify site.

Wait for the DNS changes to propagate and for Netlify to generate your SSL cert.

If you end up with SSL cert issues, you may need to add this `CAA` record: `0 issue "letsencrypt.org"`