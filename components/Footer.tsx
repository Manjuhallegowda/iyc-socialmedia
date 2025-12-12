import React, { useEffect, useRef, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

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
              Indian Youth Congress — Karnataka State Wing. Empowering youth
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
                <a href="#about" className="hover:text-white transition">
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
            <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
            <p className="text-gray-400 text-sm mb-3">
              Stay connected — join us on social media for real-time updates.
            </p>
            <div className="flex items-center space-x-4 text-2xl text-gray-300">
              {/* Replace '#' with real URLs */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-blue-500 transform hover:scale-110 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-sky-400 transform hover:scale-110 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-pink-500 transform hover:scale-110 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-red-600 transform hover:scale-110 transition"
              >
                <FaYoutube />
              </a>
            </div>

            <div className="mt-4 text-gray-400 text-sm">
              <div>MG Road, Bengaluru — 560001</div>
              <div>
                Email:{' '}
                <a
                  href="mailto:contact@iyckarnataka.in"
                  className="hover:text-white"
                >
                  contact@iyckarnataka.in
                </a>
              </div>
              <div>Phone: +91 98765 43210</div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-3">
              Subscribe to receive campaign updates, events and volunteer calls.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2"
              noValidate
            >
              <input
                type="email"
                value={email}
                aria-label="Email address"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="Your email"
                required
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-navyBlue hover:bg-navyBlueDark text-white text-sm transition"
              >
                Subscribe
              </button>
            </form>

            {/* helpful for screen-readers so they announce the message */}
            <div aria-live="polite" className="min-h-[1.25rem]">
              {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
              {subscribed && (
                <p className="text-xs text-emerald-400 mt-2">
                  Thanks for subscribing!
                </p>
              )}
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
