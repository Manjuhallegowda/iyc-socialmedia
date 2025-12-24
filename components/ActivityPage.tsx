import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { Activity } from '../types';
import ActivityModal from './ActivityModal';
import Navbar from './Navbar';
import Footer from './Footer';
import { Share2, ArrowRight, Calendar, MapPin, Hand } from 'lucide-react';

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

// Helper component for the Tricolor Accent
const TricolorBar = ({ className = '' }: { className?: string }) => (
  <div className={`h-1.5 w-full flex ${className}`}>
    <div className="h-full w-1/3 bg-[#FF9933]"></div> {/* Saffron */}
    <div className="h-full w-1/3 bg-white"></div> {/* White */}
    <div className="h-full w-1/3 bg-[#138808]"></div> {/* India Green */}
  </div>
);

const ActivityPage: React.FC = () => {
  const { activities } = useData();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-[#FF9933] selection:text-white">
      <Navbar />

      <main className="pt-20">
        {/* Header Section */}
        <section className="relative py-24 bg-white overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-900 text-sm font-bold tracking-wider mb-6 border border-blue-100 uppercase">
                <Hand size={16} className="text-blue-800" />
                Indian Youth Congress
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
                Campaigns for the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-blue-900 to-[#138808]">
                  Nation
                </span>
              </h2>

              <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
                Join the movement that defines the future. Explore our latest
                on-ground activities, yatras, and social initiatives driving
                change across India.
              </p>

              <div className="w-32 h-1.5 mx-auto mt-8 rounded-full overflow-hidden">
                <TricolorBar />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Activities List */}
        <section id="activities" className="pb-24 bg-gray-50">
          <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
            {activities.map((activity, index) => (
              <motion.article
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.1 }}
                viewport={{ once: true, margin: '-50px' }}
                className={`relative group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100`}
              >
                {/* Tricolor decorative border on the left for card identity */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 flex flex-col">
                  <div className="flex-1 bg-[#FF9933]"></div>
                  <div className="flex-1 bg-white"></div>
                  <div className="flex-1 bg-[#138808]"></div>
                </div>

                <div
                  className={`flex flex-col ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  } h-full`}
                >
                  {/* Image Section */}
                  <div className="lg:w-1/2 relative overflow-hidden h-64 lg:h-auto">
                    <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img
                      src={activity.imageUrl}
                      alt={activity.title}
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute top-4 left-6 z-20">
                      <span className="inline-block px-3 py-1 bg-white/95 backdrop-blur text-[#138808] text-xs font-bold uppercase tracking-wider rounded shadow-sm border-l-4 border-[#138808]">
                        {activity.type}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 font-medium">
                      <div className="flex items-center gap-1.5 text-[#FF9933]">
                        <Calendar size={16} />
                        <span>{activity.date}</span>
                      </div>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <div className="flex items-center gap-1.5">
                        <MapPin size={16} />
                        <span>{activity.location}</span>
                      </div>
                    </div>

                    <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-900 transition-colors">
                      {activity.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-8 line-clamp-3">
                      {activity.description}
                    </p>

                    <div className="flex flex-wrap gap-4 items-center mt-auto">
                      <button
                        onClick={() => setSelectedActivity(activity)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#FF9933] hover:bg-orange-600 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg transform active:scale-95"
                      >
                        Join Campaign
                        <ArrowRight size={18} />
                      </button>

                      <button
                        onClick={() => {
                          const shareData = {
                            title: activity.title,
                            text: activity.description,
                            url: window.location.href,
                          };
                          // Navigator share logic
                          if ((navigator as any).share) {
                            (navigator as any).share(shareData).catch(() => {});
                          } else {
                            navigator.clipboard?.writeText(
                              window.location.href
                            );
                          }
                        }}
                        className="p-3 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                        title="Share this campaign"
                      >
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {selectedActivity && (
        <ActivityModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
      )}
    </div>
  );
};

export default ActivityPage;
