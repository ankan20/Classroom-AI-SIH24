// src/app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User.model';

export async function POST(req: NextRequest) {
  try {
    const { username, password, role } = await req.json();

    if (!username || !password || !role) {
      return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({ username });

    if (user && user.password === password) { // Replace with your password verification logic
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid credentials.' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}
