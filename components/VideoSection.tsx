
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Play, Youtube, X } from 'lucide-react';
import { VideoItem } from '../types';

const VideoSection: React.FC = () => {
  const { videos } = useData();
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);

  return (
    <section id="videos" className="py-20 bg-gradient-to-br from-navyBlue to-blue-600 text-white scroll-mt-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-skyBlue rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white uppercase tracking-wide">Campaign Videos</h2>
          <div className="w-24 h-1 bg-white mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-blue-100 font-medium">Watch our latest rallies, press conferences, and digital campaigns.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div 
              key={video.id} 
              onClick={() => setPlayingVideo(video)}
              className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 group transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative aspect-video w-full bg-gray-900 overflow-hidden">
                <img 
                  src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`} 
                  alt={video.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/50 shadow-lg group-hover:scale-110 group-hover:bg-skyBlue group-hover:border-skyBlue transition-all duration-300">
                    <Play size={32} fill="currentColor" className="text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-mono">
                  Tap to Watch
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2 text-navyBlue text-xs font-bold uppercase tracking-wider">
                  <Youtube size={14} className="text-red-600" />
                  <span>{video.date}</span>
                </div>
                <h3 className="text-lg font-bold text-navyBlue group-hover:text-skyBlue transition-colors line-clamp-2 leading-tight">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
          {videos.length === 0 && (
             <div className="col-span-full text-center text-white/50 py-10">
                No videos available. Check back later.
             </div>
          )}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noreferrer" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 border border-white rounded-full text-white font-bold hover:bg-white hover:text-navyBlue transition-all shadow-md backdrop-blur-sm"
          >
            <Youtube size={20} />
            Visit YouTube Channel
          </a>
        </div>
      </div>

      {/* Video Modal Popup */}
      {playingVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={() => setPlayingVideo(null)}
        >
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <button 
              className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-red-600 rounded-full p-1 transition-colors z-20"
              onClick={(e) => {
                e.stopPropagation();
                setPlayingVideo(null);
              }}
            >
              <X size={32} />
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${playingVideo.videoId}?autoplay=1&rel=0`}
              title={playingVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
