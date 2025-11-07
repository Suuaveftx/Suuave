import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// GET - Read all waitlist entries
export async function GET() {
  try {
    const dataFile = path.join(process.cwd(), 'data', 'waitlist.json');

    // Check if file exists
    if (!fs.existsSync(dataFile)) {
      return NextResponse.json(
        { data: [], message: 'No waitlist data found' },
        { status: 200 }
      );
    }

    // Read and parse the file
    const fileContent = fs.readFileSync(dataFile, 'utf-8');
    const waitlist = JSON.parse(fileContent);

    return NextResponse.json(
      {
        data: waitlist,
        count: waitlist.length,
        message: 'Success',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error reading waitlist:', error);
    return NextResponse.json(
      { message: 'Internal server error', data: [] },
      { status: 500 }
    );
  }
}

// POST - Add new waitlist entry
export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, email, category } = body;

    // Validate input
    if (!firstName || !email || !category) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Create data object
    const newEntry = {
      id: Date.now(),
      firstName,
      email,
      category,
      timestamp: new Date().toISOString(),
    };

    // Path to data file
    const dataFile = path.join(process.cwd(), 'data', 'waitlist.json');

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing data or create empty array
    let waitlist = [];
    if (fs.existsSync(dataFile)) {
      const fileContent = fs.readFileSync(dataFile, 'utf-8');
      waitlist = JSON.parse(fileContent);
    }

    // Check if email already exists
    if (waitlist.some((entry) => entry.email === email)) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
    }

    // Add new entry
    waitlist.push(newEntry);

    // Write back to file
    fs.writeFileSync(dataFile, JSON.stringify(waitlist, null, 2));

    return NextResponse.json(
      {
        message: 'Successfully added to waitlist',
        data: newEntry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
