# Multiple Images Feature ✨

## What's New

Your activities now support **multiple images** with a beautiful carousel/slider!

## Features Added

### 1. **Database Schema** ✅

- New `ActivityImage` table to store multiple images per activity
- Each activity can have unlimited images
- Images are ordered and linked to activities
- Primary image (first image) is stored in `imageUrl` for backward compatibility

### 2. **File Upload** ✅

- **Multiple file selection** in admin dashboard
- Live preview of selected images before upload
- Remove individual images from selection
- Support for JPG, PNG, WebP, GIF formats

### 3. **Image Carousel** ✅

- Beautiful carousel component with:
  - **Navigation arrows** (left/right)
  - **Dot indicators** at bottom
  - **Image counter** (e.g., "2 / 5")
  - Smooth transitions between images
  - Auto-hide controls until hover

### 4. **Updated Pages** ✅

- **Activities List**: Shows carousel for each activity card
- **Activity Detail**: Full-width hero carousel
- **Admin Dashboard**: Multiple file upload with preview grid

## How to Use

### Upload Multiple Images

1. Go to **Admin Dashboard**: http://localhost:3002/admin/dashboard
2. Click "Add New Activity"
3. Fill in the form
4. Click "Choose Files" for images
5. **Select multiple images** (hold Ctrl/Cmd to select multiple)
6. Preview all selected images in a grid
7. Remove any image by clicking the × button
8. Click "Save Activity"

### View Multiple Images

1. Go to **Activities Page**: http://localhost:3002/activities
2. See carousel on each activity card
3. Hover over an activity card to see navigation arrows
4. Click left/right arrows to browse images
5. Click dots at bottom to jump to specific image
6. Click "Learn More" to see full-size carousel

## Database Structure

```
Activity
├─ id (UUID)
├─ title
├─ imageUrl (primary image for backward compatibility)
└─ images[] (multiple images)
    ├─ id (UUID)
    ├─ url (image path)
    ├─ order (display order)
    └─ activityId (link to activity)
```

## API Changes

### POST /api/activities

- Now accepts multiple files via `images` field
- Creates `ActivityImage` records for each file
- First image becomes the primary `imageUrl`

### PUT /api/activities/[id]

- Updates activity with new images
- Option to keep or replace existing images
- Deletes old image files when replacing

### GET /api/activities

- Returns activities with `images[]` array
- Images sorted by `order` field

## UI Components

### ImageCarousel Component

Location: `/components/image-carousel.tsx`

Features:

- Responsive design
- Touch/swipe support ready
- Keyboard navigation ready
- Accessible with ARIA labels
- Fallback to placeholder if no images

### Admin Dashboard

- Grid preview of selected images
- Individual image removal
- File format validation
- Size display for each file

## File Storage

Images are stored in:

```
public/uploads/TIMESTAMP-RANDOM.extension
```

Example:

```
/uploads/1759396478432-316568707.jpg
```

## Testing

### Test Multiple Image Upload

1. Create a new activity with 3-5 images
2. Check browser console for upload logs
3. View the activity on activities page
4. Test carousel navigation
5. Open Prisma Studio to see database records:
   ```bash
   npx prisma studio
   ```

### Test Image Carousel

1. Hover over activity cards
2. Click navigation arrows
3. Click dot indicators
4. Check image counter updates
5. Test on different screen sizes

## Database Commands

### View images in database

```bash
npx prisma studio
```

Then navigate to "ActivityImage" table

### Check uploaded files

```bash
ls -la public/uploads/
```

## Backward Compatibility

✅ **Fully backward compatible**

- Old activities with single `imageUrl` still work
- Automatically converted to array format for display
- No data migration needed for existing activities

## Performance Notes

- Images lazy load for better performance
- Carousel only loads visible images
- Preview uses blob URLs (no server upload until save)
- Optimized for mobile and desktop

## Future Enhancements (Optional)

Ideas for future improvements:

- [ ] Drag & drop image reordering
- [ ] Image cropping/editing before upload
- [ ] Bulk image upload
- [ ] Touch swipe support on mobile
- [ ] Autoplay carousel option
- [ ] Image captions
- [ ] Zoom functionality

---

## 🎉 Ready to Use!

Everything is set up and working! Start uploading multiple images to your activities!

**Test it now**: http://localhost:3002/admin/dashboard
