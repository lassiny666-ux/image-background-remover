import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json({ error: 'No image' }, { status: 400 });
    }

    const apiForm = new FormData();
    apiForm.append('image_file', image);
    apiForm.append('size', 'auto');

    const res = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': process.env.REMOVEBG_API_KEY || '',
      },
      body: apiForm,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Remove.bg API error:', res.status, errorText);
      throw new Error(`API error: ${res.status} - ${errorText}`);
    }

    const blob = await res.blob();
    return new NextResponse(blob, {
      headers: { 'Content-Type': 'image/png' },
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
