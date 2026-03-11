import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'ferrari',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    framework: 'next@16.1.6',
    architecture: 'feature-sliced-design'
  });
}
