
import React from 'react';
import { X, Calendar, MapPin, Tag, BarChart3 } from 'lucide-react';
import { Activity } from '../types';

interface ActivityModalProps {
  activity: Activity;
  onClose: () => void;
}

const ActivityModal: React.FC<ActivityModalProps> = ({ activity, onClose }) => {
  // Prevent click inside modal from closing it
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fadeIn relative flex flex-col"
        onClick={handleContentClick}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full transition-colors backdrop-blur-md"
        >
          <X size={24} />
        </button>

        {/* Hero Image */}
        <div className="h-64 sm:h-80 w-full relative shrink-0">
          <img
            src={activity.imageUrl}
            alt={activity.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <span className={`inline-block px-3 py-1 mb-3 text-xs font-bold text-white rounded uppercase tracking-wider ${activity.type === 'Protest' ? 'bg-red-600' : 'bg-saffron'}`}>
              {activity.type}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white shadow-sm leading-tight">
              {activity.title}
            </h2>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Metadata Row */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pb-6 border-b border-gray-100 text-sm text-gray-600 font-medium">
             <div className="flex items-center gap-2">
               <Calendar size={18} className="text-indiaGreen" />
               <span>{activity.date}</span>
             </div>
             {activity.location && (
               <div className="flex items-center gap-2">
                 <MapPin size={18} className="text-indiaGreen" />
                 <span>{activity.location}</span>
               </div>
             )}
          </div>

          {/* Description */}
          <div className="space-y-4">
             <h3 className="text-xl font-bold text-indiaGreen">About the Campaign</h3>
             <p className="text-gray-700 leading-relaxed text-lg">
               {activity.fullDescription || activity.description}
             </p>
          </div>

          {/* Stats Grid */}
          {activity.stats && activity.stats.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
               <div className="flex items-center gap-2 mb-4">
                 <BarChart3 size={20} className="text-saffron" />
                 <h3 className="text-lg font-bold text-indiaGreen">Impact Highlights</h3>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 {activity.stats.map((stat, idx) => (
                   <div key={idx} className="text-center p-4 bg-white rounded-lg shadow-sm border-b-4 border-indiaGreen">
                     <p className="text-2xl font-extrabold text-gray-800">{stat.value}</p>
                     <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mt-1">{stat.label}</p>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* Call to Action (Mock) */}
          <div className="flex justify-center pt-4">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              Close Details
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ActivityModal;
