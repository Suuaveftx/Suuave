import { NextResponse } from 'next/server';
import { sql } from '../../../lib/neon';

export const dynamic = 'force-dynamic';

// GET - Fetch all waitlist entries
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.get('ping')) {
      await sql`SELECT 1`;
      return NextResponse.json({ ok: true });
    }

    const rows = await sql`SELECT * FROM waitlist ORDER BY created_at DESC`;

    return NextResponse.json(
      { data: rows, count: rows.length, message: 'Success' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching waitlist:', error);
    return NextResponse.json(
      { message: 'Internal server error', data: [] },
      { status: 500 }
    );
  }
}

// POST - Add new waitlist entry
export async function POST(request) {
  try {
    const { firstName, email, category } = await request.json();

    const cleanFirstName = firstName?.trim();
    const cleanEmail = email?.trim().toLowerCase();
    const cleanCategory = category?.trim();

    if (!cleanFirstName || !cleanEmail || !cleanCategory) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Atomic single round-trip check and insert
    const result = await sql`
      WITH existing AS (
        SELECT id FROM waitlist WHERE LOWER(email) = LOWER(${cleanEmail}) LIMIT 1
      ),
      inserted AS (
        INSERT INTO waitlist (first_name, email, category)
        SELECT ${cleanFirstName}, ${cleanEmail}, ${cleanCategory}
        WHERE NOT EXISTS (SELECT 1 FROM existing)
        RETURNING *
      )
      SELECT 
        (SELECT COUNT(*) FROM existing)::int AS is_duplicate,
        (SELECT row_to_json(inserted.*) FROM inserted) AS data;
    `;

    const row = result?.[0];
    if (row?.is_duplicate > 0) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
    }

    return NextResponse.json(
      { message: 'Successfully added to waitlist', data: row?.data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error inserting waitlist entry:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
