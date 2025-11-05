# RSVP Frontend

Next.js frontend for Hakuna Matata Party RSVP System.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000` by default.

## Pages

- `/` - Event landing page with RSVP form
- `/success` - Success page after RSVP submission
- `/admin` - Admin dashboard (password protected)

## Environment Variables

The application uses the `NEXT_PUBLIC_API_URL` environment variable to connect to the backend API.

### Local Development

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Production (Netlify)

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add a new environment variable:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://hakuna-matata-api-production.up.railway.app`

## Deployment to Netlify

1. **Push your code to Git** (GitHub, GitLab, or Bitbucket)

2. **Deploy on Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Netlify will automatically detect the Next.js configuration

3. **Set Environment Variables**:
   - In Netlify dashboard, go to **Site settings** → **Environment variables**
   - Add `NEXT_PUBLIC_API_URL` with value: `https://hakuna-matata-api-production.up.railway.app`

4. **Deploy**:
   - Click "Deploy site" or trigger a new deployment
   - Your site will be live once the build completes!

The `netlify.toml` file is already configured with the correct build settings for Next.js 14.
