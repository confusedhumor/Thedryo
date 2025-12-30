'use client';

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import { Trash2, Upload, Loader2, RefreshCw } from 'lucide-react';

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  created_at: string;
}

export default function AdminPage() {
  const [images, setImages] = useState<CloudinaryResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [activeFolder, setActiveFolder] = useState<'thedryo-carousel' | 'thedryo-offer' | 'thedryo-about'>('thedryo-carousel');
  const [activeTab, setActiveTab] = useState<'images' | 'settings' | 'content'>('images');

  // Content state
  const [content, setContent] = useState<any>({});
  const [savingContent, setSavingContent] = useState(false);
  
  // Password state
  const [newPassword, setNewPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  
  const widgetRef = useRef<any>(null);

  const fetchContent = async () => {
    try {
        const res = await fetch('/api/content');
        if (res.ok) {
            const data = await res.json();
            setContent(data);
        }
    } catch (err) {
        console.error("Failed to fetch content", err);
    }
  };

  const saveContent = async () => {
    setSavingContent(true);
    try {
        const res = await fetch('/api/content', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(content)
        });
        if (res.ok) {
            alert("Content saved successfully!");
        } else {
            alert("Failed to save content.");
        }
    } catch (err) {
        alert("Error saving content");
    } finally {
        setSavingContent(false);
    }
  };

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/carousel?folder=${activeFolder}`);
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch (error) {
      console.error('Failed to fetch images', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (activeTab === 'images') {
        fetchImages();
    } else if (activeTab === 'content') {
        fetchContent();
    }
  }, [activeFolder, activeTab]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }
    
    setPasswordLoading(true);
    try {
        const res = await fetch('/api/auth/update-password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ newPassword })
        });
        
        if (res.ok) {
            alert("Password updated successfully! Please log in again.");
            setNewPassword('');
            // Optional: Logout user or redirect
        } else {
            alert("Failed to update password.");
        }
    } catch (err) {
        alert("Something went wrong");
    } finally {
        setPasswordLoading(false);
    }
  };

  const handleDelete = async (public_id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    setDeleting(public_id);
    try {
      const res = await fetch(`/api/carousel?public_id=${public_id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setImages(prev => prev.filter(img => img.public_id !== public_id));
      } else {
        alert('Failed to delete image');
      }
    } catch (error) {
      console.error('Delete error', error);
      alert('Error deleting image');
    } finally {
      setDeleting(null);
    }
  };

  const openWidget = () => {
    if (widgetRef.current) {
      // Update widget params if needed, but usually safer to recreate or update
      // For simplicity, we create a new one each time to ensure correct folder
      // But checking if destroy exists is better, or just rely on new create options
    }

    if (!(window as any).cloudinary) {
      alert('Cloudinary SDK not loaded yet');
      return;
    }

    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
        uploadSignature: generateSignature,
        folder: activeFolder,
        resourceType: 'image',
        clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
        maxFileSize: 5000000, // 5MB
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          console.log('Upload success:', result.info);
          fetchImages(); // Refresh list
        }
      }
    );

    widget.open();
  };

  const generateSignature = async (callback: any, paramsToSign: any) => {
    try {
      const response = await fetch('/api/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paramsToSign }),
      });
      const data = await response.json();
      callback(data.signature);
    } catch (error) {
      console.error('Signature error', error);
      callback(null);
    }
  };

  const handleLogout = async () => {
    try {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/admin/login';
    } catch (error) {
        console.error('Logout failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-40 pb-12">
      <Script 
        src="https://upload-widget.cloudinary.com/global/all.js" 
        onLoad={() => console.log('Cloudinary Widget Loaded')}
      />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
             <h1 className="text-3xl font-bold text-gray-900">Carousel Manager</h1>
             <p className="text-gray-500">Manage images for your website.</p>
          </div>
          
          <div className="flex gap-3">
             <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white text-red-500 border border-red-100 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-all shadow-sm"
             >
                Logout
             </button>
             <button 
                onClick={openWidget}
                className="flex items-center gap-2 bg-[#7F00FF] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#6a00d6] transition-all shadow-lg hover:shadow-xl"
             >
                <Upload size={20} />
                Upload New Image
             </button>
          </div>
        </div>

        {/* Main Tabs (Images vs Settings) */}
        <div className="flex gap-4 mb-8">
            <button
                onClick={() => setActiveTab('images')}
                className={`px-4 py-2 rounded-lg font-bold text-lg ${activeTab === 'images' ? 'text-[#7F00FF] border-b-2 border-[#7F00FF]' : 'text-gray-400 hover:text-gray-600'}`}
            >
                Images
            </button>
            <button
                onClick={() => setActiveTab('content')}
                className={`px-4 py-2 rounded-lg font-bold text-lg ${activeTab === 'content' ? 'text-[#7F00FF] border-b-2 border-[#7F00FF]' : 'text-gray-400 hover:text-gray-600'}`}
            >
                Text Content
            </button>
            <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-lg font-bold text-lg ${activeTab === 'settings' ? 'text-[#7F00FF] border-b-2 border-[#7F00FF]' : 'text-gray-400 hover:text-gray-600'}`}
            >
                Settings
            </button>
        </div>

        {activeTab === 'images' ? (
            <>
                {/* Folder Selection Tabs */}
                {/* ... existing folder tabs ... */}
                <div className="flex gap-4 mb-8 bg-white p-2 rounded-xl border border-gray-100 w-fit">
                    <button
                        onClick={() => setActiveFolder('thedryo-carousel')}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeFolder === 'thedryo-carousel' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Main Carousel
                    </button>
                    <button
                        onClick={() => setActiveFolder('thedryo-offer')}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeFolder === 'thedryo-offer' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Offer Section (Right)
                    </button>
                    <button
                        onClick={() => setActiveFolder('thedryo-about')}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeFolder === 'thedryo-about' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        About Section
                    </button>
                </div>

                {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-[#7F00FF]" size={48} />
                </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.length === 0 ? (
                            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                                <p className="text-gray-400">No images found. Upload one to get started!</p>
                            </div>
                        ) : (
                            images.map((img) => (
                                <div key={img.public_id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group relative">
                                    <div className="relative aspect-video w-full bg-gray-100">
                                        <Image 
                                            src={img.secure_url} 
                                            alt="Carousel Image" 
                                            fill 
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-4 flex justify-between items-center">
                                        <span className="text-xs text-gray-400 font-mono truncate max-w-[150px]">
                                            {new Date(img.created_at).toLocaleDateString()}
                                        </span>
                                        <button 
                                            onClick={() => handleDelete(img.public_id)}
                                            disabled={deleting === img.public_id}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Image"
                                        >
                                            {deleting === img.public_id ? (
                                                <Loader2 size={18} className="animate-spin" />
                                            ) : (
                                                <Trash2 size={18} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </>
        ) : activeTab === 'content' ? (
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Text Content Manager</h2>
                    <button 
                        onClick={saveContent}
                        disabled={savingContent}
                        className="flex items-center gap-2 bg-[#7F00FF] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#6a00d6] disabled:opacity-50 transition-all"
                    >
                        {savingContent ? <Loader2 className="animate-spin" size={20} /> : <RefreshCw size={20} />}
                        Save Changes
                    </button>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Announcement Marquee Text</label>
                        <textarea
                            value={content.marquee_text || ''}
                            onChange={(e) => setContent((prev: any) => ({ ...prev, marquee_text: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7F00FF] outline-none min-h-[100px]"
                            placeholder="Enter the text for the scrolling ticker..."
                        />
                        <p className="text-sm text-gray-500 mt-2">This text will scroll across the top of the website.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Pricing Section Title</label>
                        <textarea
                            value={content.pricing_title || ''}
                            onChange={(e) => setContent((prev: any) => ({ ...prev, pricing_title: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7F00FF] outline-none min-h-[80px]"
                            placeholder="Gurgaon's Most Trusted Dry Cleaners..."
                        />
                         <p className="text-sm text-gray-500 mt-2">The main heading above the services grid.</p>
                    </div>
                </div>
            </div>
        ) : (
            /* Settings Tab */
            <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7F00FF] outline-none"
                            placeholder="Min 6 characters"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={passwordLoading || newPassword.length < 6}
                        className="w-full bg-[#7F00FF] text-white py-2 rounded-lg font-bold hover:bg-[#6a00d6] disabled:opacity-50 transition-colors flex justify-center"
                    >
                        {passwordLoading ? <Loader2 className="animate-spin" /> : "Update Password"}
                    </button>
                    <p className="text-xs text-gray-500 text-center mt-4">
                        Updating the password will apply to all future logins.
                    </p>
                </form>
            </div>
        )}
      </div>
    </div>
  );
}
