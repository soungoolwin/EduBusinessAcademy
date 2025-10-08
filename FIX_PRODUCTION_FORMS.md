# Fix Production Forms - Quick Guide

## Problem

- Code is deployed ✅
- Forms show "Failed to submit application" ❌
- Reason: Database tables missing in production

## Solution

### Step 1: Get Production Database URL from Vercel

1. Go to: https://vercel.com/dashboard
2. Click on "edubusiness" project
3. Settings → Environment Variables
4. Copy the full `DATABASE_URL` value

### Step 2: Create Tables in Production

Run this command (paste your actual DATABASE_URL):

```bash
DATABASE_URL="paste-your-production-url-here" npx prisma db push
```

When it asks "Are you sure?", type `y` and press Enter.

### Step 3: Verify It Works

1. Visit: https://edubusiness.academy/entrepreneurs/apply
2. Fill out the form
3. Submit
4. Should work! ✅

## What This Command Does

- ✅ Creates `InvestorApplication` table
- ✅ Creates `EntrepreneurApplication` table
- ✅ Does NOT touch existing tables (Activity, ActivityImage remain unchanged)
- ✅ Safe to run - only adds new tables

## After Success

Both forms will work:

- https://edubusiness.academy/investors/apply
- https://edubusiness.academy/entrepreneurs/apply

Applications will appear in admin dashboard under new tabs! 🎉

## Troubleshooting

If command fails, make sure:

- DATABASE_URL is in quotes
- DATABASE_URL is the PRODUCTION one from Vercel (not local)
- You have internet connection
- Run from project directory
