import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useData } from '../context/DataContext';
import { Leader } from '../types';
import LeaderModal from './LeaderModal';
import { MapPin, ChevronRight, Hash } from 'lucide-react';

const TeamPage: React.FC = () => {
  const { leaders } = useData();
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />
      <main className="pt-32 pb-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-indiaGreen mb-4">Our Team</h1>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Meet the dedicated individuals who form the backbone of our social media presence across Karnataka.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              onClick={() => setSelectedLeader(leader)}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-100"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={leader.imageUrl}
                  alt={leader.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-saffron transition-colors">
                  {leader.name}
                </h3>
                <p className="text-sm font-semibold text-indiaGreen uppercase tracking-wider text-xs mb-3">
                  {leader.designation}
                </p>

                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin size={16} className="mr-1 text-indiaGreen" />
                  <span>
                    {leader.district ? `${leader.district} Dist` : leader.state}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                   <div className="flex gap-2">
                      {leader.social.twitter && <Hash size={14} className="text-gray-400" />}
                   </div>
                   <span className="text-saffron text-sm font-medium flex items-center gap-1 group-hover:underline">
                      View Profile <ChevronRight size={14} />
                   </span>
                </div>
              </div>
            </div>
          ))}
          {leaders.length === 0 && (
             <div className="col-span-full text-center py-10 text-gray-400">
                Team members will be listed here soon.
             </div>
          )}
        </div>
      </main>

      {selectedLeader && (
        <LeaderModal leader={selectedLeader} onClose={() => setSelectedLeader(null)} />
      )}

      <Footer />
    </div>
  );
};

export default TeamPage;