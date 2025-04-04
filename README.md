# Playwright on Cloudflare Workers TodoMVC Example

This project demonstrates how to run Playwright browser automation on Cloudflare Workers. It uses Cloudflare's browser rendering API to run browser tests on the edge, specifically testing a TodoMVC application.

> **Important Note**: This project can be run locally without deploying to Cloudflare. To use the Browser Rendering API in production, you must switch to a paid Cloudflare plan, which is $5/monthly.

## Features

- Run Playwright tests in Cloudflare Workers
- Generate screenshots of TodoMVC application
- Create traces for debugging and visualization
- Add custom todo items through URL parameters

## Prerequisites

- Node.js (Latest LTS recommended)
- Cloudflare account for deployment
  - Free tier for local development
  - Paid plan ($5/monthly) for production use of Browser Rendering API
- Wrangler CLI

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Klaudioz/cloudflare-playwright-automation.git
cd cloudflare-playwright-automation
```

2. Install dependencies:

```bash
npm install
```

## Local Development

You can run this application entirely locally without deploying to Cloudflare:

```bash
# Run the example with screenshot output
node run.js --screenshot

# Run the example with trace output 
node run.js --trace

# Specify custom output directory
node run.js --output ./my-output-dir
```

The output will be saved to the specified directory (defaults to `./output`).

## How It Works

The application uses `@cloudflare/playwright` to launch a browser instance within a Cloudflare Worker. It navigates to the TodoMVC demo site, adds todo items, and verifies they appear correctly.

You can customize the todo items by adding URL parameters:

```
/?todo=buy%20milk&todo=walk%20dog
```

## Configuration

The project uses `wrangler.toml` for Cloudflare Workers configuration. You can modify this file to change deployment settings.

## Deploying to Cloudflare

> **Note**: To use the Browser Rendering API in production, a paid Cloudflare plan ($5/monthly) is required.

To deploy to Cloudflare Workers:

```bash
npx wrangler deploy
```

To delete the deployed worker:

```bash
npx wrangler delete cloudflare-playwright-example
```

You can also delete it through the Cloudflare Dashboard by navigating to Workers & Pages, finding your worker in the list, and using the delete option.

## Accessing Your Deployed Worker

After deployment, your Worker will be available at a URL based on your Worker name and Cloudflare account:

```
https://<worker-name>.<your-account>.workers.dev
```

For example: `https://cloudflare-playwright-example.klaudioz.workers.dev`

To get a screenshot of the TodoMVC app:
- Simply visit your Worker URL in a browser
- The response will be a PNG image

To customize the todo items, add them as URL parameters:

```
https://<worker-name>.<your-account>.workers.dev/?todo=buy%20milk&todo=walk%20dog
```

To get a trace file instead of a screenshot (useful for debugging):

```
https://<worker-name>.<your-account>.workers.dev/?trace=1
```

This will download a trace.zip file that can be viewed in the Playwright Trace Viewer.

## Credits

This example is built using:
- [@cloudflare/playwright](https://developers.cloudflare.com/browser-rendering/playwright/)
- [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler/)
- [TodoMVC](https://demo.playwright.dev/todomvc) demo from Playwright
- [Playwright for Browser Rendering now available](https://developers.cloudflare.com/changelog/2025-04-04-playwright-beta/)