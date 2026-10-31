# Spotfit Room Planner

Take a photo of a room, outline the empty spot, choose furniture that fits (type, size, style, quality, colour), see the total price, and generate a picture of the furnished room.

## Features
- Take a photo (phone camera), upload, drag-and-drop or paste an image
- Drag to outline the empty spot; enter its width, depth and max height in cm
- 14 furniture types with real-world sizes and a "fits / too wide" check
- Live price: furniture, delivery (free over $500), optional assembly; USD or UZS
- Generate and save a picture with the furniture drawn to scale plus a price list
- Optional: "Measure and suggest with Claude" estimates the spot size from the photo and suggests matching pieces

Prices are example numbers, and furniture is drawn illustrations, not photos of real products.

## Run locally
Open `index.html` in a browser. No build step.

## Deploy on Vercel
1. Import this repository at https://vercel.com/new (Framework preset: **Other**, no build command).
2. Optional, to enable the Claude button: in **Settings → Environment Variables** add `ANTHROPIC_API_KEY` (from https://console.anthropic.com), then redeploy. You can also set `ANTHROPIC_MODEL`.

Without the key the site works fully; the Claude button just stays hidden.
