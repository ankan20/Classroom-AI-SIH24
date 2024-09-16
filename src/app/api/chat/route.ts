import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { message } = body;

  // Hardcode the response for now
  const response = "How can I help you?";

  return NextResponse.json({ response });
}