# Supabase Migration Guide

## Quick Setup Instructions

### 1. Go to Supabase SQL Editor
- Open your Supabase project: https://jmsavtnglemticaijiyn.supabase.co
- Navigate to **SQL Editor** in the left sidebar
- Click **New Query**

### 2. Run Migrations in Order

Copy and paste each file's contents into the SQL Editor and click "Run":

1. **001_create_tables.sql** - Creates all database tables
2. **002_create_indexes.sql** - Adds performance indexes
3. **003_enable_rls.sql** - Enables Row Level Security and policies

### 3. Verify Setup

After running all migrations:

1. Go to **Table Editor** in Supabase
2. You should see these tables:
   - ✅ users
   - ✅ problem_sessions
   - ✅ hints
   - ✅ solution_attempts
   - ✅ user_stats

3. Click on each table to verify columns exist

### 4. Test Connection

Back in your terminal, restart the dev server:

```bash
npm run dev
```

The app should connect to Supabase without errors!

## Migration Files Location

```
dsa-tool/supabase/migrations/
├── 001_create_tables.sql
├── 002_create_indexes.sql
└── 003_enable_rls.sql
```

## What Each Migration Does

**001_create_tables.sql**
- Creates 5 tables for storing problems, hints, solutions, and stats
- Sets up foreign key relationships
- Adds constraints for data integrity

**002_create_indexes.sql**
- Adds indexes for fast queries on user_id, session_id, and timestamps
- Improves performance for filtering and sorting

**003_enable_rls.sql**
- Enables Row Level Security on all tables
- Creates policies for authenticated users
- Creates policies for anonymous users (session-based)

## Troubleshooting

**Error: relation already exists**
- Tables already created, safe to skip or use DROP TABLE IF EXISTS first

**Error: permission denied**
- Make sure you're using the SQL Editor as the project owner
- Check that RLS policies are created correctly

**Can't insert data**
- Verify RLS is enabled and policies exist
- For testing, you can temporarily disable RLS on a table:
  ```sql
  ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
  ```

## Next Steps

After running migrations:
1. ✅ Tables created
2. ✅ Indexes added
3. ✅ RLS enabled
4. ⏭️ Ready to implement API routes!

---

**Your Supabase Project**: https://jmsavtnglemticaijiyn.supabase.co
**Environment**: Already configured in `.env.local` ✅
