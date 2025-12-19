import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const KpyccTeamPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />
      <main className="pt-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-indiaGreen mb-4">KPYCC Team</h1>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">This is the KPYCC Team page.</p>
      </main>
      <Footer />
    </div>
  );
};

export default KpyccTeamPage;

