import React, { useEffect, useRef, useState } from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      // clear pending timeout on unmount to avoid memory leak
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // simple email validation (you can rely on browser validation too)
    const re =
      /^(([^<>()[\\]\\.,;:\\s@\"]+(\\.[^<>()[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@(([^<>()[\\]\\.,;:\\s@\"]+\\.)+[^<>()[\\]\\.,;:\\s@\"]{2,})$/i;

    if (!re.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setSubscribed(true);
    setEmail('');

    // store the timeout id so we can clear on unmount
    timeoutRef.current = window.setTimeout(() => {
      setSubscribed(false);
      timeoutRef.current = null;
    }, 3000);
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <img
                src="../assets/IYC_Flag.png"
                alt="IYC Karnataka"
                className="h-12 w-auto"
              />
              <img
                src="../assets/Indian_National_Congress_Flag.svg.png"
                alt="INC"
                className="h-12 w-auto hidden md:block"
              />
            </div>
            <h3 className="text-xl font-bold">IYC Karnataka</h3>
            <p className="text-gray-400 text-sm">
              Indian Youth Congress - Karnataka State Wing. Empowering youth
              leadership and democratic participation across our state.
            </p>

            <div className="flex items-center space-x-1 mt-3">
              <span className="block h-1 w-6 bg-orange-500 rounded-sm" />
              <span className="block h-1 w-6 bg-white rounded-sm" />
              <span className="block h-1 w-6 bg-green-600 rounded-sm" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/AboutIYCPage" className="hover:text-white transition">
                  About IYC
                </a>
              </li>
              <li>
                <a href="#join" className="hover:text-white transition">
                  Join the Movement
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-white transition">
                  Events & Programs
                </a>
              </li>
              <li>
                <a href="#leadership" className="hover:text-white transition">
                  State Leadership
                </a>
              </li>
              <li>
                <a href="#media" className="hover:text-white transition">
                  News & Media
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
            <div className="mt-4 text-gray-400 text-sm">
              <div>MG Road, Bengaluru - 560001</div>
              <div>
                Email:{' '}
                <a
                  href="mailto:contact@iyckarnataka.in"
                  className="hover:text-white"
                >
                  contact@iyckarnataka.com
                </a>
              </div>
              <div>Phone: +91 98765 43210</div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
            <p className="text-gray-400 text-sm mb-3">
              Stay connected join us on social media for real-time updates.
            </p>

            <div className="flex items-center space-x-4 text-2xl text-gray-300">
              <a
                href="https://www.facebook.com/IYCKar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-blue-500 transform hover:scale-110 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://x.com/IYCKarnataka"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-sky-400 transform hover:scale-110 transition"
              >
                <FaXTwitter />
              </a>

              <a
                href="https://www.instagram.com/iyc.karnataka"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-pink-500 transform hover:scale-110 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.youtube.com/c/IndianYouthCongress"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-red-600 transform hover:scale-110 transition"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <div className="flex justify-center space-x-1 mb-4">
            <div className="h-1 w-8 bg-orange-500 rounded-sm" />
            <div className="h-1 w-8 bg-white rounded-sm" />
            <div className="h-1 w-8 bg-green-600 rounded-sm" />
          </div>

          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} IYC Karnataka. All rights
            reserved.
          </p>

          <p className="text-gray-600 text-xs mt-2">
            Built by{' '}
            <a
              href="https://www.ranstacksolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white underline underline-offset-4 transition"
            >
              Ranstack Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
