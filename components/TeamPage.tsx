import React from 'react';
import Navbar from './Navbar'; // Import Navbar
import Footer from './Footer'; // Import Footer

const TeamPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />
      <main className="pt-20 container mx-auto py-12 px-4"> {/* Adjust pt-20 based on your Navbar height */}
        <h1 className="text-4xl font-bold text-center text-navyBlue mb-8">Our Team</h1>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Details about our team members will be displayed here soon.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;