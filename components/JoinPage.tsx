import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

import JoinForm from './JoinForm';
import Navbar from './Navbar';
import Footer from './Footer';

/* -------------------------------------------------------
   Brand & Theme Constants
------------------------------------------------------- */
const COLORS = {
  saffron: 'text-orange-600',
  saffronHover: 'hover:text-orange-800',
  indiaGreen: 'text-green-700',
  background: 'bg-gray-50',
};

const FORM_BG = '/assets/ppl.png';

/* -------------------------------------------------------
   Component
------------------------------------------------------- */
const JoinPage: React.FC = () => {
  return (
    <div
      className={`min-h-screen ${COLORS.background} text-gray-800 font-sans`}
    >
      <Navbar />

      <main id="main-content" className="pt-20">
        {/* Back Navigation */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-6 pt-4">
          <Link
            to="/"
            aria-label="Back to Home"
            className={`inline-flex items-center gap-2 font-semibold transition-colors ${COLORS.saffron} ${COLORS.saffronHover}`}
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        {/* Join Form Section */}
        <section
          id="join-form"
          className="relative py-16 bg-cover bg-center"
          style={{ backgroundImage: `url(${FORM_BG})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content Container */}
          <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
            {/* Hero Content */}
            <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
                Join the Digital Force
              </h1>
              <p className="text-base md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Be the voice of young India in the digital space. Your keyboard
                is your most powerful tool for democracy and change.
              </p>
            </div>

            <JoinForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default JoinPage;
