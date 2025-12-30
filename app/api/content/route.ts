
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Fetch the raw file from Cloudinary 
        // Note: The public_id for raw files often includes the extension if uploaded that way, match how it's saved.
        // We'll standardise on 'site_content.json' 
        const url = cloudinary.url('site_content.json', { resource_type: 'raw' });
        
        // Since cloudinary.url just gives a signed URL (or public URL), we need to fetch it
        // However, for private/signed access or just raw file, we might need a standard fetch
        // A simpler way for public raw files is just fetch(url)
        
        // Better approach: use Admin API to get resource details or just try fetching the URL directly if public
        // We will assume it's public for read access (managed by this API)
        
        // Let's try fetching via the secure_url pattern
        const fileUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/raw/upload/site_content.json`;
        
        const res = await fetch(fileUrl, { cache: 'no-store' });
        
        if (!res.ok) {
            if (res.status === 404) {
                // Return default content if not found
                return NextResponse.json({});
            }
            throw new Error('Failed to fetch content file');
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("GET Content Error", error);
        // Fallback to empty object if fails
        return NextResponse.json({}); 
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        // Convert to string for upload
        const jsonString = JSON.stringify(data, null, 2);
        
        // Upload as a raw file
        // We use a Promise wrapper for upload_stream or just write base64? 
        // cloudinary.uploader.upload supports raw data if provided as a data URI or similar, 
        // but for text/json content, the best way using the SDK is often creating a temp file or using upload_stream.
        // HOWEVER, since we're in Next.js Serverless, temp files can be tricky.
        // A data URI for plain text/json:
        const buffer = Buffer.from(jsonString);
        const base64Data = `data:application/json;base64,${buffer.toString('base64')}`;

        await cloudinary.uploader.upload(base64Data, {
            public_id: 'site_content.json',
            resource_type: 'raw',
            invalidate: true, // Important to clear CDN cache
            overwrite: true
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("POST Content Error", error);
        return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
    }
}
