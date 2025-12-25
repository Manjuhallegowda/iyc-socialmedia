import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaHandPaper,
  FaTimes,
  FaArrowRight,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useData } from '../context/DataContext';
import { ExecutiveLeader } from '../types';

const ExecutiveLeadershipSection: React.FC = () => {
  const { executiveLeaders } = useData();
  const [selectedLeader, setSelectedLeader] = useState<ExecutiveLeader | null>(
    null
  );

  const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

  // Function to close modal
  const closeModal = () => setSelectedLeader(null);

  return (
    <section
      id="executive-leadership"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background decoration 
      <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-5 text-gray-900 pointer-events-none">
        <FaHandPaper size={400} />
      </div> */}

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className="text-4xl md:text-5xl font-black text-indiaGreen uppercase tracking-tighter leading-none">
              Executive Leadership
            </h2>
            <div className="h-2 w-full bg-gradient-to-r from-saffron via-white to-indiaGreen mt-2"></div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-xl text-gray-500 font-medium max-w-3xl mx-auto uppercase tracking-wide"
          >
            The visionaries leading the charge for a progressive India.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {executiveLeaders.map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ ...transition, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-sm shadow-lg hover:shadow-2xl transition-all duration-500 border-t-4 border-saffron overflow-hidden flex flex-col"
            >
              {/* Image Container */}
              <div
                className="relative h-72 w-full overflow-hidden bg-gray-200 cursor-pointer"
                onClick={() => setSelectedLeader(leader)}
              >
                <img
                  src={leader.imageUrl}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>

                {/* Name Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <h3 className="text-xl font-black text-white uppercase leading-none mb-1 tracking-wide shadow-black drop-shadow-md">
                    {leader.name}
                  </h3>
                  <div className="h-1 w-12 bg-green-600 group-hover:w-full transition-all duration-500 ease-out"></div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col bg-white">
                <p className="text-xs font-bold text-saffron uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">
                  {leader.title}
                </p>

                {leader.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed font-medium">
                    {leader.description}
                  </p>
                )}

                {/* View Profile Button */}
                <button
                  onClick={() => setSelectedLeader(leader)}
                  className="mt-auto flex items-center gap-2 text-xs font-bold text-gray-800 uppercase tracking-wider hover:text-indiaGreen transition-colors group/btn"
                >
                  View Full Profile
                  <span className="group-hover/btn:translate-x-1 transition-transform">
                    <FaArrowRight />
                  </span>
                </button>

                {/* Social Icons */}
                {leader.socialMedia && (
                  <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100">
                    {leader.socialMedia.twitter && (
                      <a
                        href={leader.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#1DA1F2] transition-colors"
                      >
                        <FaXTwitter size={18} />
                      </a>
                    )}
                    {leader.socialMedia.facebook && (
                      <a
                        href={leader.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#4267B2] transition-colors"
                      >
                        <FaFacebookF size={18} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-black/10 rounded-full text-gray-800 md:text-white transition-colors"
              >
                <FaTimes size={24} />
              </button>

              {/* Modal Image Side */}
              <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                <img
                  src={selectedLeader.imageUrl}
                  alt={selectedLeader.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                <div className="absolute bottom-4 left-4 md:hidden">
                  <h3 className="text-2xl font-black text-white uppercase">
                    {selectedLeader.name}
                  </h3>
                  <p className="text-saffron font-bold text-sm uppercase">
                    {selectedLeader.title}
                  </p>
                </div>
              </div>

              {/* Modal Text Side */}
              <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto bg-white">
                <div className="hidden md:block mb-6">
                  <h3 className="text-3xl font-black text-gray-900 uppercase leading-none">
                    {selectedLeader.name}
                  </h3>
                  <div className="h-1 w-20 bg-saffron mt-3 mb-2"></div>
                  <p className="text-indiaGreen font-bold text-sm uppercase tracking-wider">
                    {selectedLeader.title}
                  </p>
                </div>

                <div className="prose prose-sm max-w-none text-gray-600">
                  <p className="whitespace-pre-line leading-relaxed text-base">
                    {selectedLeader.description}
                  </p>
                </div>

                {/* Modal Social Links */}
                {selectedLeader.socialMedia && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                      Connect with Leader
                    </p>
                    <div className="flex gap-4">
                      {selectedLeader.socialMedia.twitter && (
                        <a
                          href={selectedLeader.socialMedia.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#1DA1F2] hover:text-white transition-all"
                        >
                          <FaXTwitter size={20} />
                        </a>
                      )}
                      {selectedLeader.socialMedia.facebook && (
                        <a
                          href={selectedLeader.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#4267B2] hover:text-white transition-all"
                        >
                          <FaFacebookF size={20} />
                        </a>
                      )}
                      {selectedLeader.socialMedia.instagram && (
                        <a
                          href={selectedLeader.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#E1306C] hover:text-white transition-all"
                        >
                          <FaInstagram size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExecutiveLeadershipSection;
