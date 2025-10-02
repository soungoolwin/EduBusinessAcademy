# Image Upload Debugging Guide

I've added extensive logging to help debug the image upload issue. Here's how to test and see what's happening:

## Step 1: Open Browser Console

1. Go to `http://localhost:3001/admin/dashboard`
2. Open Browser Developer Tools:
   - **Chrome/Edge**: Press `F12` or `Cmd+Option+I` (Mac)
   - **Firefox**: Press `F12` or `Cmd+Option+I` (Mac)
3. Click on the **Console** tab

## Step 2: Test Upload

1. Click "Add New Activity"
2. Fill in:
   - Title: "Test Activity"
   - Short Description: "Test description"
   - Long Description: "Test long description"
3. Click the **"Choose File"** button for the image
4. Select an image file (JPG, PNG, etc.)

### What You Should See in Browser Console:

```
File selected via onChange: your-image.jpg 123456 bytes
```

If you see this, the file is being captured correctly ✅

## Step 3: Click Save

When you click "Save Activity", you should see in the **Browser Console**:

```
=== Client Side Debug ===
File selected: your-image.jpg (123456 bytes, image/jpeg)
✅ File appended to FormData
Sending request to: /api/activities
Response status: 201
Response data: { id: "...", title: "Test Activity", ... }
```

## Step 4: Check Terminal

In your **Terminal** where `npm run dev` is running, you should see:

```
=== POST Activity Debug ===
Title: Test Activity
Image file: your-image.jpg (123456 bytes)
Processing image upload...
✅ Image uploaded successfully: /uploads/1234567890-123456789.jpg
File saved to: /path/to/project/public/uploads/1234567890-123456789.jpg
POST /api/activities 201 in 50ms
```

## Step 5: Verify File Was Saved

Run this command in a new terminal:

```bash
ls -la public/uploads/
```

You should see your uploaded image file.

## Common Issues & Solutions

### Issue 1: "No file" in browser console

**Problem**: File input isn't capturing the file  
**Solution**:

- Make sure you're clicking the actual file input
- Try refreshing the page
- Check if the Sheet component is blocking the input

### Issue 2: "File selected" but "⚠️ No file to upload" when saving

**Problem**: File reference is lost between selection and save  
**Solution**: This is a React state issue. The file should be in `fileInputRef.current.files[0]`

### Issue 3: File uploading but not showing in activities page

**Problem**: Image path is correct but Next.js Image component can't load it  
**Solution**:

- Check browser Network tab for 404 errors
- Verify the image exists: `ls -la public/uploads/`
- Clear Next.js cache: `rm -rf .next`

### Issue 4: "Failed to create activity" error

**Problem**: API error  
**Solution**: Check terminal for detailed error message

## Quick Test Checklist

- [ ] Browser console shows "File selected via onChange"
- [ ] Browser console shows "✅ File appended to FormData"
- [ ] Terminal shows "=== POST Activity Debug ==="
- [ ] Terminal shows "✅ Image uploaded successfully"
- [ ] File appears in `public/uploads/` directory
- [ ] Activity appears in dashboard with image
- [ ] Activity page shows image correctly

## Manual Test

If automatic upload isn't working, try this manual test:

```bash
# Create a test image in uploads
cp /path/to/any/image.jpg public/uploads/test.jpg

# Then add activity via Prisma Studio (http://localhost:5555)
# Set imageUrl to: /uploads/test.jpg
```

If this works, the problem is with the upload, not the display.

## Reset Everything

If nothing works, try a clean reset:

```bash
# Stop the dev server (Ctrl+C)

# Clear Next.js cache
rm -rf .next

# Restart
npm run dev
```

## What to Share

If it's still not working, please share:

1. **Browser Console output** (copy the logs)
2. **Terminal output** (copy the logs)
3. **Screenshot of the upload form**
4. **Result of**: `ls -la public/uploads/`

This will help identify exactly where the problem is!
