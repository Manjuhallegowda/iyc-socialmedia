import React, { useState, FormEvent } from 'react';
import JoinForm from './JoinForm';
import Navbar from './Navbar';
import Footer from './Footer'; // Assuming you'll extract the footer later

const JoinPage: React.FC = () => {
  const [contactSent, setContactSent] = useState(false); // This state might need to be lifted if contact form is separate

  // This handleContactSubmit is currently for the general contact form.
  // If JoinForm has its own submit logic, this might not be needed here.
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => setContactSent(false), 3000);
    // Add actual form submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />

      {/* Join Us Section - This will be the main content of the new page */}
      <section
        id="join"
        className="py-20 bg-gray-50 relative overflow-hidden scroll-mt-24 pt-40"
      >
        {' '}
        {/* Added pt-40 to push content below fixed navbar */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-skyBlue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indiaGreen/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          {' '}
          {/* Using w-full as per previous changes */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navyBlue uppercase tracking-wide">
              Join The Digital Army
            </h2>
            <p className="mt-4 text-gray-600">
              Be the voice of Karnataka. Join the social media revolution.
            </p>
          </div>
          <JoinForm />
        </div>
      </section>

      {/* Assuming a footer might be desired on this page as well */}
      <Footer />
    </div>
  );
};

export default JoinPage;
