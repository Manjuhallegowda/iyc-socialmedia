
import React from 'react';
import { X, Calendar, User, Newspaper } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsModalProps {
  news: NewsItem;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ news, onClose }) => {
  // Prevent click inside modal from closing it
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fadeIn relative flex flex-col"
        onClick={handleContentClick}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 py-4">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Press Release / News</h2>
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div>
          {/* Image */}
          {news.image && (
            <div className="w-full h-64 sm:h-80 relative">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          )}

          <div className="p-6 sm:p-8">
            {/* Title & Metadata */}
            <h1 className="text-2xl sm:text-3xl font-bold text-indiaGreen mb-4 leading-tight">
              {news.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
               <div className="flex items-center gap-1.5">
                 <Calendar size={16} className="text-saffron" />
                 <span>{news.date}</span>
               </div>
               {news.source && (
                 <div className="flex items-center gap-1.5">
                   <Newspaper size={16} className="text-indiaGreen" />
                   <span>{news.source}</span>
                 </div>
               )}
               {news.author && (
                 <div className="flex items-center gap-1.5">
                   <User size={16} className="text-indiaGreen" />
                   <span>By {news.author}</span>
                 </div>
               )}
            </div>

            {/* Article Body */}
            <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
              {news.content ? (
                news.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-lg">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-lg">{news.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end">
           <button 
             onClick={onClose}
             className="px-6 py-2 bg-saffron text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
           >
             Close Article
           </button>
        </div>

      </div>
    </div>
  );
};

export default NewsModal;
