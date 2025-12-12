
import React from 'react';
import { X, Mail, Phone, MapPin, Award, User, Clock, BookOpen } from 'lucide-react';
import { Leader } from '../types';

interface LeaderModalProps {
  leader: Leader;
  onClose: () => void;
}

const LeaderModal: React.FC<LeaderModalProps> = ({ leader, onClose }) => {
  // Prevent click inside modal from closing it
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-navyBlue/70 backdrop-blur-sm transition-all"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fadeIn relative"
        onClick={handleContentClick}
      >
        {/* Header / Banner */}
        <div className="h-32 bg-gradient-to-r from-skyBlue via-white to-indiaGreen opacity-90 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/50 hover:bg-white text-navyBlue p-2 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-6 sm:px-8 pb-8 -mt-16">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-6">
            <img
              src={leader.image}
              alt={leader.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-gray-100"
            />
            <div className="text-center sm:text-left mb-2">
              <h2 className="text-2xl font-bold text-navyBlue">{leader.name}</h2>
              <p className="text-skyBlue font-semibold">{leader.designation}</p>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-gray-500 text-sm mt-1">
                <MapPin size={14} />
                <span>
                  {leader.district ? `${leader.district}, ` : ''}
                  {leader.state}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Basic Info & Contact */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-navyBlue border-b-2 border-skyBlue/20 pb-2 mb-3">Basic Info</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-center gap-3">
                    <User size={18} className="text-skyBlue" />
                    <span>{leader.age} Years Old</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BookOpen size={18} className="text-skyBlue" />
                    <span>{leader.education}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock size={18} className="text-skyBlue" />
                    <span>Active since {leader.startYear}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-navyBlue border-b-2 border-skyBlue/20 pb-2 mb-3">Contact</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-center gap-3">
                    <Mail size={18} className="text-indiaGreen" />
                    <span>{leader.email}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone size={18} className="text-indiaGreen" />
                    <span>{leader.phone}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Bio & Achievements */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-navyBlue border-b-2 border-skyBlue/20 pb-2 mb-3">Biography</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {leader.bio}
                </p>
              </div>

              {leader.protests && leader.protests.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-navyBlue border-b-2 border-skyBlue/20 pb-2 mb-3">Key Movements</h3>
                  <div className="space-y-4">
                    {leader.protests.map((p, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-md border-l-4 border-indiaGreen">
                        <p className="font-semibold text-sm text-gray-800">{p.title}</p>
                        <p className="text-xs text-gray-500 flex justify-between mt-1">
                          <span>{p.location}</span>
                          <span>{p.date}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {leader.achievements && leader.achievements.length > 0 && (
                <div>
                   <h3 className="text-lg font-bold text-navyBlue border-b-2 border-skyBlue/20 pb-2 mb-3">Achievements</h3>
                   <ul className="space-y-2">
                     {leader.achievements.map((a, idx) => (
                       <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                         <Award size={16} className="text-skyBlue mt-0.5 shrink-0" />
                         <span>{a}</span>
                       </li>
                     ))}
                   </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderModal;
