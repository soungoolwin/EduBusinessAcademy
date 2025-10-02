# ⚡ Quick Deployment Guide (30 minutes)

## 🎯 What You Need Before Starting:
1. Neon account (https://neon.tech) - FREE
2. Vercel account (https://vercel.com) - FREE  
3. GitHub account with your code pushed

---

## 🚀 Deployment Flow (8 Steps)

### 1️⃣ Change to PostgreSQL (2 min)
```bash
# Edit prisma/schema.prisma line 10:
provider = "postgresql"  # Change from "sqlite"
```

### 2️⃣ Test Build (1 min)
```bash
npm run build
```

### 3️⃣ Push to GitHub (2 min)
```bash
git add .
git commit -m "Deploy to Vercel"
git push
```

### 4️⃣ Create Neon Database (5 min)
1. Go to https://neon.tech
2. Sign up with GitHub
3. Create project → Copy connection string
4. Save it somewhere!

### 5️⃣ Deploy to Vercel (5 min)
1. Go to https://vercel.com
2. Import GitHub repo
3. Add environment variables:
   - `DATABASE_URL` = Neon connection string
   - `ADMIN_USERNAME` = admin
   - `ADMIN_PASSWORD` = your_password
4. Click Deploy (will fail - that's OK!)

### 6️⃣ Enable Vercel Blob (2 min)
1. In Vercel → Storage tab
2. Create → Blob
3. Done! (auto-adds token)

### 7️⃣ Set Up Database (5 min)
```bash
npm install -g vercel
vercel login
vercel link
vercel env pull
npx prisma generate
npx prisma db push
```

### 8️⃣ Redeploy (5 min)
```bash
vercel --prod
```

---

## ✅ Test Your Site
Visit: `https://your-project.vercel.app`

Test checklist:
- [ ] Homepage loads
- [ ] Login to /admin/dashboard
- [ ] Upload activity with images
- [ ] View /activities page
- [ ] Click activity to see detail

---

## 🆘 Quick Fixes

**Build fails?**
```bash
npm run build  # Check error locally first
```

**Database error?**
- Check DATABASE_URL has `?sslmode=require` at end
- Verify Neon database is active

**Images not uploading?**
- Check BLOB_READ_WRITE_TOKEN exists in Vercel
- File size < 4.5MB

---

## 📱 Important URLs

- **Neon Dashboard:** https://console.neon.tech
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Your Site:** `https://your-project.vercel.app`

---

**Total Time: ~30 minutes** ⏱️

**Stuck? Check DEPLOYMENT_CHECKLIST.md for detailed steps!**
