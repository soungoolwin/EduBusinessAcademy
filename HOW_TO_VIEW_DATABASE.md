# How to View Database Records

## Method 1: Prisma Studio (Recommended - Like TablePlus for Laravel)

Prisma Studio is a visual database browser built into Prisma. It's like phpMyAdmin or TablePlus for your Prisma database!

### Open Prisma Studio:

```bash
npx prisma studio
```

This will:

- Open a web browser at `http://localhost:5555`
- Show all your database tables
- Let you view, edit, add, and delete records
- Provide a beautiful UI to browse your data

### Features:

✅ View all activities
✅ Edit records directly
✅ Add new records
✅ Delete records
✅ Filter and search
✅ See relationships

---

## Method 2: TablePlus (External Database Client)

You can also use TablePlus if you prefer!

### Steps:

1. Open TablePlus
2. Click "Create a new connection"
3. Select "SQLite"
4. For "Database path", browse to:
   ```
   /Users/soungoolwin/Desktop/My Projects/EduBusiness/edubusiness/prisma/dev.db
   ```
5. Click "Connect"

### Database Location:

```
prisma/dev.db
```

---

## Method 3: VS Code SQLite Extension

If you use VS Code:

1. Install the extension: "SQLite" by alexcvzz
2. Open Command Palette (Cmd+Shift+P)
3. Type "SQLite: Open Database"
4. Select `prisma/dev.db`
5. View tables in the sidebar

---

## Method 4: Command Line (Terminal)

```bash
# Open SQLite CLI
sqlite3 prisma/dev.db

# View all tables
.tables

# View all activities
SELECT * FROM Activity;

# View activities in a formatted way
.mode column
.headers on
SELECT id, title, slug, createdAt FROM Activity;

# Exit
.quit
```

---

## Quick Database Commands

### View all activities:

```bash
npx prisma studio
```

Then navigate to the "Activity" table.

### Query from terminal:

```bash
sqlite3 prisma/dev.db "SELECT title, imageUrl FROM Activity;"
```

### Backup database:

```bash
cp prisma/dev.db prisma/dev.db.backup
```

### Reset database (WARNING: Deletes all data):

```bash
npx prisma migrate reset
```

---

## Database Schema

Your Activity table has these fields:

| Field              | Type     | Description                   |
| ------------------ | -------- | ----------------------------- |
| `id`               | UUID     | Unique identifier             |
| `slug`             | String   | URL-friendly version of title |
| `title`            | String   | Activity title                |
| `shortDescription` | String   | Brief description             |
| `longDescription`  | String   | Detailed description          |
| `imageUrl`         | String   | Path to image file            |
| `createdAt`        | DateTime | When created                  |
| `updatedAt`        | DateTime | Last updated                  |

---

## Troubleshooting

### Can't see images in database browser?

The database stores the IMAGE PATH, not the image itself. The actual images are in:

```
public/uploads/
```

### Need to check if image files exist?

```bash
ls -la public/uploads/
```

### Check database file size:

```bash
ls -lh prisma/dev.db
```

---

## Production Note

For production, consider using:

- **PostgreSQL** (Recommended for production)
- **MySQL** (Good alternative)
- **PlanetScale** (Serverless MySQL)
- **Supabase** (PostgreSQL with auth)

All of these work with TablePlus and have better performance than SQLite for production use.
