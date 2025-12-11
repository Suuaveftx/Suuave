import { NextResponse } from 'next/server';
import { sql } from '../../../src/lib/neon';

// GET - Fetch all waitlist entries
export async function GET() {
  try {
    // ✅ Neon returns an array directly
    const rows = await sql`SELECT * FROM waitlist ORDER BY timestamp DESC`;

    console.log('Fetched rows:', rows);

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

    if (!firstName || !email || !category) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Check for duplicates
    const existing = await sql`SELECT * FROM waitlist WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
    }

    // Insert new record
    const inserted = await sql`
      INSERT INTO waitlist (first_name, email, category)
      VALUES (${firstName}, ${email}, ${category})
      RETURNING *;
    `;

    return NextResponse.json(
      { message: 'Successfully added to waitlist', data: inserted[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error inserting waitlist entry:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
