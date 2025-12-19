import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useData } from '../context/DataContext';
import { LegalTeamMember } from '../types';
import { Loader2 } from 'lucide-react';

const LegalPage: React.FC = () => {
  const { legalTeam, loading } = useData();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-saffron animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />
      <main className="pt-40 pb-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-indiaGreen mb-4">
          Legal Team
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          The legal experts defending our rights and values.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {legalTeam.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-saffron transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-indiaGreen uppercase tracking-wider text-xs mb-3">
                  {member.position}
                </p>
              </div>
            </div>
          ))}
          {legalTeam.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400">
              Team members will be listed here soon.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;
