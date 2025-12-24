import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useData } from '../context/DataContext';
import { Loader2 } from 'lucide-react';

const LegalPage: React.FC = () => {
  const { legalTeam, loading } = useData();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#FDFBF7]">
        <Loader2 className="w-12 h-12 text-saffron animate-spin" />
      </div>
    );
  }

  return (
    // Changed bg-gray-50 to a warmer off-white (Khadi feel) or stick to white for cleanliness
    <div className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
      <Navbar />

      {/* Header Section with Tricolor Accent */}
      <div className="pt-32 pb-12 bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#000080] mb-6">
            Legal Wing
          </h1>
          <div className="flex justify-center mb-6">
            <div className="h-1.5 w-24 bg-[#FF9933] rounded-l-full"></div>
            <div className="h-1.5 w-24 bg-white border-t border-b border-gray-100"></div>
            <div className="h-1.5 w-24 bg-[#138808] rounded-r-full"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 font-serif italic max-w-3xl mx-auto leading-relaxed">
            "Guardians of the Constitution, Defenders of Democracy."
          </p>
        </div>
      </div>

      <main className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {legalTeam.map((member) => (
            <div
              key={member.id}
              // Card Style: Classic, bordered, less rounded (more official)
              className="bg-white group relative border-t-4 border-saffron shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Image Container: Circle or traditional portrait style */}
              <div className="p-6 pb-0 w-full flex justify-center">
                <div className="w-40 h-40 rounded-full border-4 border-gray-100 overflow-hidden shadow-inner group-hover:border-indiaGreen transition-colors duration-300">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="p-6 w-full">
                <h3 className="text-xl font-bold font-serif text-[#000080] mb-2 group-hover:text-saffron transition-colors">
                  {member.name}
                </h3>
                {/* Divider */}
                <div className="w-12 h-0.5 bg-gray-200 mx-auto my-3"></div>

                <p className="text-sm font-bold text-indiaGreen uppercase tracking-widest">
                  {member.position}
                </p>

                {/* Optional: Add location/district if available in your data */}
                {/* <p className="text-xs text-gray-500 mt-2 font-medium">Karnataka Pradesh</p> */}
              </div>

              {/* Decorative bottom corner element */}
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-r-[20px] border-b-indiaGreen border-r-indiaGreen opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}

          {legalTeam.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-400 text-lg font-serif italic">
                The list of legal representatives is currently being updated.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;
