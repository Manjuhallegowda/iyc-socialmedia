import React, { useState, useMemo } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useData } from '../context/DataContext';
import {
  Loader2,
  Camera,
  X,
  Download,
  Share2,
  Calendar,
  Filter,
  Maximize2,
} from 'lucide-react';

const GalleryPage: React.FC = () => {
  const { galleryItems, loading } = useData();
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  // Simulated categories for the political context
  const categories = ['All', 'Rallies', 'Protests', 'Seva', 'Press Meets'];

  // Filter logic (assuming your data might have a category field, if not, it returns all)
  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return galleryItems;
    // If your backend data doesn't have categories yet, this line ensures images still show
    // You would ideally filter by item.category === activeFilter
    return galleryItems;
  }, [galleryItems, activeFilter]);

  const openModal = (item: any) => {
    setSelectedImage(item);
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  // Helper to handle image download
  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || 'iyc-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed', error);
    }
  };

  // Helper for Web Share API
  const handleShare = async (item: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'IYC Karnataka Gallery',
          text: item.alt || 'Check out this moment from IYC Karnataka',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="pt-28 pb-20">
        {/* --- Header Section --- */}
        <div className="bg-slate-900 text-white pt-16 pb-24 px-4 relative overflow-hidden">
          {/* Abstract Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="container mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-slate-800 border border-slate-700 text-orange-400 text-xs font-bold uppercase tracking-widest">
              <Camera size={14} />
              Official Media Centre
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
              Visuals of the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-400">
                Movement
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Documenting the struggle, the service, and the solidarity.
              High-resolution images for press and social media use.
            </p>
          </div>
        </div>

        {/* --- Filter Bar --- */}
        <div className="container mx-auto px-4 -mt-8 relative z-20">
          <div className="bg-white p-2 rounded-xl shadow-xl border border-slate-200 inline-flex flex-wrap justify-center gap-2 w-full md:w-auto mx-auto md:block text-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-slate-900 text-white shadow-lg transform scale-105'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- Gallery Grid --- */}
        <div className="container mx-auto px-4 mt-16">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-20 gap-4">
              <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Loading Media...
              </span>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative break-inside-avoid rounded-xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border-b-4 border-transparent hover:border-orange-500"
                  onClick={() => openModal(item)}
                >
                  <img
                    src={item.thumbnailUrl || item.imageUrl}
                    alt={item.alt || 'Gallery Image'}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
                        <Calendar size={12} />
                        <span>{new Date().toLocaleDateString()}</span>{' '}
                        {/* Replace with real date if available */}
                      </div>
                      <p className="text-white font-bold leading-tight line-clamp-2">
                        {item.alt || 'Official IYC Event Coverage'}
                      </p>
                      <div className="flex items-center gap-2 mt-4 text-white/80 text-xs font-semibold">
                        <Maximize2 size={14} />
                        <span>Click to Expand</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* --- Lightbox Modal --- */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-white/50 hover:text-white hover:rotate-90 transition-all duration-300 z-50 p-2"
          >
            <X size={32} />
          </button>

          <div
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div className="flex-1 bg-black flex items-center justify-center relative">
              <img
                src={selectedImage.imageUrl}
                alt="Enlarged view"
                className="max-w-full max-h-[60vh] md:max-h-[85vh] object-contain"
              />
            </div>

            {/* Sidebar / Info Panel (Good for political context) */}
            <div className="w-full md:w-80 bg-slate-900 p-6 flex flex-col border-l border-slate-800">
              <div className="flex-1">
                <div className="inline-block px-2 py-1 rounded bg-orange-600/10 text-orange-500 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-600/20">
                  IYC Official Media
                </div>
                <h3 className="text-white text-xl font-bold mb-2">
                  {selectedImage.alt || 'Event Highlights'}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {/* Placeholder description if none exists in data */}
                  Official coverage of the event. United we stand, united we
                  serve.
                </p>

                <div className="flex items-center gap-2 text-slate-500 text-xs border-t border-slate-800 pt-4">
                  <Calendar size={14} />
                  <span>Captured on {new Date().toLocaleDateString()}</span>
                </div>
              </div>

              {/* Action Buttons - Crucial for IT Cell/Volunteers */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-800">
                <button
                  onClick={() =>
                    handleDownload(selectedImage.imageUrl, 'iyc-media.jpg')
                  }
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-slate-900 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors"
                >
                  <Download size={16} />
                  Download
                </button>
                <button
                  onClick={() => handleShare(selectedImage)}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
                >
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GalleryPage;
