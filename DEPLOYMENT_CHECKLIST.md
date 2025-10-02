# 🚀 Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

Before deploying, verify these are ready:

- [ ] Code works locally (✓ You confirmed this!)
- [ ] All changes committed to Git
- [ ] GitHub repository created
- [ ] Neon PostgreSQL database created
- [ ] Neon connection string saved

---

## 📝 Step 1: Change Database to PostgreSQL

**File:** `prisma/schema.prisma` (Line 10)

**Change FROM:**
```prisma
provider = "sqlite"
```

**Change TO:**
```prisma
provider = "postgresql"
```

---

## 🔧 Step 2: Test Build Locally

Run this command to ensure build works:
```bash
npm run build
```

If successful, you'll see "✓ Compiled successfully"

---

## 📦 Step 3: Commit & Push to GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment with PostgreSQL"
git push origin main
```

---

## ☁️ Step 4: Deploy to Vercel

### 4.1: Create Vercel Project
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Click "Import"

### 4.2: Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables, add:

| Variable Name | Value | Where to use |
|---------------|-------|--------------|
| `DATABASE_URL` | Your Neon PostgreSQL connection string | Production, Preview, Development |
| `NEXT_PUBLIC_BASE_URL` | Your Vercel URL (e.g., `https://edubusiness.vercel.app`) | Production |
| `ADMIN_USERNAME` | `admin` (or your choice) | Production, Preview, Development |
| `ADMIN_PASSWORD` | Your secure password | Production, Preview, Development |

**Note:** Leave `BLOB_READ_WRITE_TOKEN` empty for now - we'll add it next.

### 4.3: Deploy (First Attempt)
Click "Deploy" - It will fail, that's okay!

---

## 🗄️ Step 5: Set Up Vercel Blob Storage

1. In your Vercel project → Click **"Storage"** tab
2. Click **"Create Database"** → Select **"Blob"**
3. Click **"Create"**
4. It automatically adds `BLOB_READ_WRITE_TOKEN` to your env vars ✅

---

## 🔄 Step 6: Set Up Database Schema

### Install Vercel CLI (if not installed):
```bash
npm install -g vercel
```

### Login to Vercel:
```bash
vercel login
```

### Link your project:
```bash
vercel link
```
- Select your account
- Select your project

### Pull environment variables:
```bash
vercel env pull
```

### Generate Prisma Client:
```bash
npx prisma generate
```

### Push database schema to Neon:
```bash
npx prisma db push
```

You should see: "✓ Your database is now in sync with your Prisma schema."

---

## 🚀 Step 7: Redeploy

### Option 1: Redeploy from Dashboard
1. Go to Vercel Dashboard → "Deployments"
2. Click on the failed deployment
3. Click "Redeploy"

### Option 2: Push a new commit
```bash
git commit --allow-empty -m "Trigger Vercel deployment"
git push
```

### Option 3: Deploy from CLI
```bash
vercel --prod
```

---

## ✅ Step 8: Verify Deployment

### 8.1: Check Deployment Status
1. Go to Vercel Dashboard → "Deployments"
2. Wait for "Building" → "Ready"
3. Click "Visit" to see your live site

### 8.2: Test Your App
Visit your Vercel URL and test:

1. **Homepage:** `https://your-app.vercel.app`
   - [ ] Loads correctly
   
2. **Admin Dashboard:** `https://your-app.vercel.app/admin/dashboard`
   - [ ] Can login with ADMIN_USERNAME and ADMIN_PASSWORD
   - [ ] Dashboard loads
   
3. **Create Activity:**
   - [ ] Upload multiple images
   - [ ] Fill in title, descriptions
   - [ ] Click "Create Activity"
   - [ ] Check for success message
   
4. **View Activities:** `https://your-app.vercel.app/activities`
   - [ ] Your activity appears
   - [ ] Images display correctly
   - [ ] Can click to view detail page
   
5. **Activity Detail:**
   - [ ] All images show in gallery
   - [ ] Thumbnail buttons work
   - [ ] Content displays correctly

### 8.3: Verify Image Storage
1. Go to Vercel Dashboard → "Storage" → "Blob"
2. You should see your uploaded images listed there

---

## 🐛 Common Issues & Fixes

### Issue: Build fails
**Solution:**
```bash
# Run locally to find the error
npm run build

# Fix any errors, then:
git add .
git commit -m "Fix build errors"
git push
```

### Issue: Database connection fails
**Check:**
- `DATABASE_URL` is correct in Vercel
- Includes `?sslmode=require` at the end
- Neon database is active

### Issue: Images not uploading
**Check:**
- `BLOB_READ_WRITE_TOKEN` exists in Vercel env vars
- File sizes < 4.5MB (free tier limit)

### Issue: 500 Server Error
**Check logs:**
1. Vercel Dashboard → Select your project
2. Click "Logs" tab
3. Look for error messages

---

## 📊 Post-Deployment

### Custom Domain (Optional)
1. Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Monitoring
- Check Vercel Analytics for traffic
- Monitor Neon database usage
- Check Vercel Blob storage usage

---

## 🎉 Success Checklist

Your deployment is successful when:

- [ ] Site loads at Vercel URL
- [ ] Can login to admin dashboard
- [ ] Can create activities with multiple images
- [ ] Activities display on /activities page
- [ ] Images show correctly in gallery
- [ ] All pages work (Home, About, Services, Contact)
- [ ] No console errors in browser

---

## 📞 Need Help?

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Make sure Prisma schema is pushed to database

---

**Ready? Start with Step 1!** 🚀
