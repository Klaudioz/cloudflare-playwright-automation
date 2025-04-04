# Playwright on Cloudflare Workers TodoMVC Example

This project demonstrates how to run Playwright browser automation on Cloudflare Workers. It uses Cloudflare's browser rendering API to run browser tests on the edge, specifically testing a TodoMVC application.

## Features

- Run Playwright tests in Cloudflare Workers
- Generate screenshots of TodoMVC application
- Create traces for debugging and visualization
- Add custom todo items through URL parameters

## Prerequisites

- Node.js (Latest LTS recommended)
- Cloudflare account for deployment
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

To run the application locally:

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

To deploy to Cloudflare Workers:

```bash
npx wrangler deploy
```

## Credits

This example is built using:
- [@cloudflare/playwright](https://developers.cloudflare.com/browser-rendering/playwright/)
- [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler/)
- [TodoMVC](https://demo.playwright.dev/todomvc) demo from Playwright
- [Playwright for Browser Rendering now available](https://developers.cloudflare.com/changelog/2025-04-04-playwright-beta/)