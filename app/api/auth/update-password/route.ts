import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { newPassword } = await request.json();

    if (!newPassword || newPassword.length < 6) {
        return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    // Identify we want to update.
    // We upload a 1x1 pixel transparent image as a config holder
    // and store the password in the 'context' metadata.
    const emptyImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

    await cloudinary.uploader.upload(emptyImage, {
        public_id: 'thedryo-config',
        resource_type: 'image',
        overwrite: true,
        context: `password=${newPassword}`, // Store plain for now (or hash if preferred, keeping simple for no-db req)
        folder: 'thedryo-system' // Hidden folder
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update Password Error:', error);
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
  }
}
