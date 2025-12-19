import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useData } from '../context/DataContext'; // Import useData
import { ExecutiveLeader } from '../types'; // Import ExecutiveLeader from types

const ExecutiveLeadershipSection: React.FC = () => {
  const { executiveLeaders } = useData(); // Use executiveLeaders from context
  const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

  return (
    <section id="executive-leadership" className="py-20 bg-gray-50 scroll-mt-24">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={transition}
            viewport={{ once: true }}
            className="text-3xl font-bold text-indiaGreen uppercase tracking-wide"
          >
            Meet Our Executive Leadership
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ...transition, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-gray-600 max-w-2xl mx-auto"
          >
            Driving the vision and strategy for Indian Youth Congress at National and State levels.
          </motion.p>
          <div className="w-24 h-1 bg-gradient-to-r from-saffron via-white to-indiaGreen mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {executiveLeaders.map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ ...transition, delay: index * 0.15 + 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-xl overflow-hidden text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100 flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img src={leader.imageUrl} alt={leader.name} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-indiaGreen mb-1">{leader.name}</h3>
                <p className="text-saffron text-sm font-semibold mb-4">{leader.title}</p>
                {leader.description && <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{leader.description}</p>}
                
                {leader.socialMedia && (
                  <div className="flex justify-center space-x-4 mt-auto pt-4 border-t border-gray-100">
                    {leader.socialMedia.twitter && (
                      <a href={leader.socialMedia.twitter} target="_blank" rel="noopener noreferrer" aria-label={`Twitter of ${leader.name}`} className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-125">
                        <FaTwitter size={20} />
                      </a>
                    )}
                    {leader.socialMedia.facebook && (
                      <a href={leader.socialMedia.facebook} target="_blank" rel="noopener noreferrer" aria-label={`Facebook of ${leader.name}`} className="text-gray-400 hover:text-blue-600 transition-colors transform hover:scale-125">
                        <FaFacebookF size={20} />
                      </a>
                    )}
                    {leader.socialMedia.instagram && (
                      <a href={leader.socialMedia.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram of ${leader.name}`} className="text-gray-400 hover:text-pink-500 transition-colors transform hover:scale-125">
                        <FaInstagram size={20} />
                      </a>
                    )}
                    {leader.socialMedia.youtube && (
                      <a href={leader.socialMedia.youtube} target="_blank" rel="noopener noreferrer" aria-label={`YouTube of ${leader.name}`} className="text-gray-400 hover:text-red-600 transition-colors transform hover:scale-125">
                        <FaYoutube size={20} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveLeadershipSection;
