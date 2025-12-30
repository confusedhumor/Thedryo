import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // 1. Try to fetch dynamic password from Cloudinary
    let currentPassword = process.env.ADMIN_PASSWORD;

    try {
        const config = await cloudinary.api.resource('thedryo-system/thedryo-config', {
            context: true
        });
        
        if (config && config.context && config.context.custom && config.context.custom.password) {
            currentPassword = config.context.custom.password;
        }
    } catch (err) {
        // Config doesn't exist yet, ignore and use ENV fallback
        // console.log('No custom password found, using default');
    }

    if (password === currentPassword) {
      const response = NextResponse.json({ success: true });
      
      // Set HttpOnly cookie
      response.cookies.set('admin_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return response;
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
