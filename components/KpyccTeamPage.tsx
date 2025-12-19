import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useData } from '../context/DataContext';
import { KpyccTeamMember } from '../types';

const KpyccTeamPage: React.FC = () => {
  const { district } = useParams<{ district: string }>();
  const { kpyccTeam } = useData();

  const districtTeam = useMemo(() => {
    if (!district) return [];
    return kpyccTeam.filter((member) => member.district === district);
  }, [district, kpyccTeam]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />
      <main className="pt-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-indiaGreen mb-4">
          KPYCC Team - {district}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {districtTeam.length > 0 ? (
            districtTeam.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-indiaGreen uppercase tracking-wider text-xs mb-3">
                    {member.designation}
                  </p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No team members found for this district.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KpyccTeamPage;

