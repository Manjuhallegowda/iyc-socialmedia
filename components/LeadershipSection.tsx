import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Leader } from '../types';
import LeaderModal from './LeaderModal';
import { MapPin, ChevronRight, Hash } from 'lucide-react';

type TabType = 'State' | 'District' | 'Assembly';

const LeadershipSection: React.FC = () => {
  const { leaders } = useData();
  const [activeTab, setActiveTab] = useState<TabType>('State');
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  const filteredLeaders = leaders.filter((leader) => {
    if (activeTab === 'State') return leader.designation === 'State SM Chair';
    if (activeTab === 'District')
      return leader.designation === 'District SM Coordinator';
    if (activeTab === 'Assembly')
      return leader.designation === 'Assembly SM Coordinator';
    return false;
  });

  return (
    <section id="leadership" className="py-20 bg-gray-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-indiaGreen uppercase tracking-wide">
            SM Team Leadership
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Meet the digital architects behind our campaigns in Karnataka.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-saffron via-white to-indiaGreen mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-full shadow-md inline-flex overflow-x-auto max-w-full">
            {[
              { id: 'State', label: 'State Team' },
              { id: 'District', label: 'District Coordinators' },
              { id: 'Assembly', label: 'Assembly Coordinators' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-saffron text-white shadow-sm'
                    : 'text-gray-500 hover:text-indiaGreen'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredLeaders.map((leader) => (
            <div
              key={leader.id}
              onClick={() => setSelectedLeader(leader)}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-100"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-all z-10"></div>
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
                    {activeTab === 'Assembly'
                      ? `${leader.block} (AC)`
                      : activeTab === 'District'
                      ? `${leader.district} Dist`
                      : leader.state}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="flex gap-2">
                    {leader.social.twitter && (
                      <Hash size={14} className="text-gray-400" />
                    )}
                  </div>
                  <span className="text-saffron text-sm font-medium flex items-center gap-1 group-hover:underline">
                    View Profile <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
          {filteredLeaders.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400">
              No leaders found in this category.
            </div>
          )}
        </div>
      </div>

      {selectedLeader && (
        <LeaderModal
          leader={selectedLeader}
          onClose={() => setSelectedLeader(null)}
        />
      )}
    </section>
  );
};

export default LeadershipSection;
