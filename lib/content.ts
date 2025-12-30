
export interface SiteContent {
  marquee_text?: string;
  [key: string]: string | undefined;
}

export const getContent = async (): Promise<SiteContent> => {
  try {
    // In a real production environment with high traffic, you might want to cache this 
    // or fetch it at build time (getStaticProps) and revalidate (ISR).
    // For this use case, we'll fetch client-side or server-side on demand.
    
    // Determine base URL if server-side
    const baseUrl = typeof window === 'undefined' ? (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000') : '';
    
    const res = await fetch(`${baseUrl}/api/content`, { 
        next: { revalidate: 60 }, // Cache for 60 seconds
        cache: 'no-store' // allow dynamic updates to be seen quickly for now
    });
    
    if (!res.ok) return {};
    
    return await res.json();
  } catch (error) {
    console.error("Failed to get content", error);
    return {};
  }
};
