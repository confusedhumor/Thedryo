import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'thedryo-carousel';

    const { resources } = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder, // Fetch specific folder
      max_results: 50,
      context: true,
    });
    
    // Sort by created_at desc
    const sorted = resources.sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json(sorted);
  } catch (error) {
    console.error('Cloudinary Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const public_id = searchParams.get('public_id');

        if (!public_id) {
            return NextResponse.json({ error: 'Missing public_id' }, { status: 400 });
        }

        await cloudinary.uploader.destroy(public_id);
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Cloudinary Delete Error:', error);
        return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
}
