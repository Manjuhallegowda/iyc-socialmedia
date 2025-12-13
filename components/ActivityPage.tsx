
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { Activity } from '../types';
import ActivityModal from './ActivityModal';
import Navbar from './Navbar';
import Footer from './Footer';
import { Share2, ArrowRight } from 'lucide-react';

const transition = { duration: 0.5, ease: 'easeOut' };

const ActivityPage: React.FC = () => {
  const { activities } = useData();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-24">
        <section id="activities" className="py-20 bg-white scroll-mt-24">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-indiaGreen uppercase tracking-wide">
                <span>Join the Movement</span>
                <span className="block h-1 w-20 bg-saffron mt-2"></span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-saffron via-white to-indiaGreen mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="space-y-12">
              {activities.map((activity, index) => (
                <motion.article
                  key={activity.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ ...transition, delay: index * 0.06 }}
                  viewport={{ once: true }}
                  className={`flex flex-col ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
                  } gap-8 items-center`}
                  aria-labelledby={`activity-${activity.id}`}
                >
                  <div className="w-full md:w-1/2">
                    <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                      <img
                        src={activity.imageUrl}
                        alt={activity.title}
                        loading="lazy"
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indiaGreen shadow-sm">
                        {activity.type}
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 space-y-4">
                    <div className="flex items-center gap-2 text-saffron font-bold text-sm">
                      <span>{activity.date}</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span>{activity.location}</span>
                    </div>
                    <h3
                      id={`activity-${activity.id}`}
                      className="text-2xl font-bold text-gray-800"
                    >
                      {activity.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {activity.description}
                    </p>
                    <div className="flex gap-3 items-center">
                      <button
                        onClick={() => setSelectedActivity(activity)}
                        className="flex items-center text-indiaGreen font-semibold hover:text-saffron transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                        aria-label={`Open details for ${activity.title}`}
                      >
                        View Campaign{' '}
                        <ArrowRight
                          size={16}
                          className="ml-2 group-hover:translate-x-1 transition-transform"
                        />
                      </button>

                      <button
                        onClick={() => {
                          const shareData = {
                            title: activity.title,
                            text: activity.description,
                            url: window.location.href,
                          };
                          if ((navigator as any).share)
                            (navigator as any)
                              .share(shareData)
                              .catch(() => undefined);
                          else
                            navigator.clipboard
                              ?.writeText(window.location.href)
                              .then(() => alert('Link copied'));
                        }}
                        className="px-3 py-1 bg-orange-50 rounded-full text-saffron text-sm font-semibold"
                        aria-label={`Share ${activity.title}`}
                      >
                        <Share2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
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
