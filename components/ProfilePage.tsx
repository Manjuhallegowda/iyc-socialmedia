import React from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ExecutiveLeader } from '../types';
import Navbar from './Navbar';
import Footer from './Footer';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const ProfilePage: React.FC = () => {
  const { leaderId } = useParams<{ leaderId: string }>();
  const { executiveLeaders } = useData();

  // Find the leader from the context based on the leaderId
  const leader = executiveLeaders.find((l) => l.id === leaderId);

  if (!leader) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center text-center px-4">
          <h1 className="text-2xl font-bold text-gray-700">Leader not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-20 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full object-cover md:h-full md:w-64"
                  src={leader.imageUrl}
                  alt={leader.name}
                />
              </div>
              <div className="p-8 flex-grow">
                <div className="uppercase tracking-wide text-sm text-saffron font-semibold">
                  {leader.title}
                </div>
                <h1 className="block mt-1 text-3xl leading-tight font-extrabold text-indiaGreen">
                  {leader.name}
                </h1>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {leader.description}
                </p>

                {/* Social Media Links */}
                {leader.socialMedia && (
                  <div className="flex space-x-4 mt-6">
                    {leader.socialMedia.twitter && (
                      <a
                        href={leader.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <FaTwitter size={24} />
                      </a>
                    )}
                    {leader.socialMedia.facebook && (
                      <a
                        href={leader.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <FaFacebookF size={24} />
                      </a>
                    )}
                    {leader.socialMedia.instagram && (
                      <a
                        href={leader.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-pink-500 transition-colors"
                      >
                        <FaInstagram size={24} />
                      </a>
                    )}
                     {leader.socialMedia.youtube && (
                      <a
                        href={leader.socialMedia.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FaYoutube size={24} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
