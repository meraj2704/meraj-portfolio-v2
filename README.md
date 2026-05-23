This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Backend

This project ships with a MongoDB + Cloudinary backend and a protected `/admin` UI.

### Setup

1. Copy env vars: `cp .env.example .env.local` and fill in
   - `MONGODB_URI` – a MongoDB connection string
   - `SESSION_SECRET` – `openssl rand -base64 32`
   - `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET`
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` (used once for bootstrap)
2. Create the initial admin user:
   ```bash
   yarn dlx tsx scripts/create-admin.ts
   # or: npx tsx scripts/create-admin.ts
   ```
3. `yarn dev`, then visit [http://localhost:3000/admin](http://localhost:3000/admin) — you'll be redirected to `/admin/login`.

### API surface

| Resource    | Endpoint              | Public read | Admin write |
| ----------- | --------------------- | ----------- | ----------- |
| Projects    | `/api/projects`       | ✓           | ✓           |
| Experience  | `/api/experience`     | ✓           | ✓           |
| Awards      | `/api/awards`         | ✓           | ✓           |
| Stack       | `/api/stack`          | ✓           | ✓           |
| Clients     | `/api/clients`        | ✓           | ✓           |
| About       | `/api/about` (PUT)    | ✓           | ✓           |
| Contact     | `/api/contact` (POST) | POST public | GET admin   |
| Image upload| `/api/upload`         | admin only  | admin only  |
| Auth        | `/api/auth/{login,logout,me}` | – | – |

Items use `GET/PATCH/DELETE /api/<resource>/[id]`. Deleting an item also deletes its associated Cloudinary assets.

### Wiring the frontend

The existing components in `app/components/*` use hard-coded arrays. Convert them to server components (drop `"use client"`) and fetch from these endpoints, e.g.:

```tsx
import { Experience } from "@/models/Experience";
import { connectDB } from "@/lib/db";

export default async function ExperienceSection() {
  await connectDB();
  const items = await Experience.find().sort({ order: 1 }).lean();
  // render items
}
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
