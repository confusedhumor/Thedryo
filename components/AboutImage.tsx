import { v2 as cloudinary } from 'cloudinary';
import Image from "next/image";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function AboutImage() {
  let aboutImage = null;

  try {
    const res = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'thedryo-about',
      max_results: 1,
      context: true,
    });
    
    if (res.resources && res.resources.length > 0) {
        // Sort by created_at desc just in case, though max_results is 1
        const sorted = res.resources.sort((a: any, b: any) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        aboutImage = sorted[0].secure_url;
    }
  } catch (error) {
    console.error("Failed to fetch about image", error);
  }

  if (!aboutImage) {
      return (
        <>
            <div className="text-gray-400 font-medium">Coming Soon: Team Photo</div>
            <div className="absolute inset-0 bg-soft-blue/10"></div>
        </>
      );
  }

  return (
    <Image 
      src={aboutImage} 
      alt="About The Dryo" 
      fill 
      className="object-cover"
    />
  );
}
