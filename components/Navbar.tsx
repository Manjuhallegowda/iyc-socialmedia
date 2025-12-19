import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTeamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [isMobileTeamDropdownOpen, setMobileTeamDropdownOpen] = useState(false);
  const [active, setActive] = useState<string>(
    window.location.hash || '/#home'
  );
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const teamDropdownRef = useRef<HTMLDivElement | null>(null);

  const prominentLeaders = [
    {
      name: 'D.K. Shivakumar',
      role1: 'Karnataka PCC President',
      role2: 'Deputy CM, Govt. of Karnataka',
      img: 'https://ipcmedia.in/public/uploads/profile/1756048100_12.jpg',
      href: '/profile/dk-shivakumar',
    },
    {
      name: 'Siddaramaiah',
      role1: 'Chief Minister',
      role2: 'Govt. of Karnataka',
      img: 'https://www.coorgnews.in/wp-content/uploads/2024/08/siddaramaiah-photo.jpg',
      href: '/profile/siddaramaiah',
    },

    {
      name: 'Manjunath Gowda',
      role1: 'IYC Karnataka',
      role2: 'State President',
      img: 'https://imagesvs.oneindia.com/img/2018/04/manjunath-gowda-1524829569.jpg',
      href: '/profile/manjunath-gowda',
    },
  ];

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    {
      name: 'Leadership',
      dropdown: [
        { name: 'Office Bearers', href: '/team' },
        { name: 'Legal Team', href: '/legal' },
        { name: 'Media & Communication', href: '/social-media' },
      ],
    },
    { name: 'Activities', href: '/#activities' },
    { name: 'Videos', href: '/#videos' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Contact', href: '/#contact' },
  ];

  const leaders = [
    {
      name: 'M. Kharge',
      role1: 'INC President',
      role2: 'Opposition Leader in RS',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISj9-YUNPfN5CqqcCIBj3QX9MkLQcxExoqyf3M7Ue2tGMiS_BbQMiTFyDwUk-2bJ0pJoRLGvmLkncaTOIZkjNuOfutC4JLrUMNh7z5uU&s=10',
    },
    {
      name: 'Sonia Gandhi',
      role1: 'CPP Chairperson',
      role2: 'Member of Parliament, RJ',
      img: 'https://theleaderspage.com/wp-content/uploads/2020/09/10373068_564102830388920_7420287936146617325_o.jpg',
    },
    {
      name: 'Rahul Gandhi',
      role1: 'Opposition Leader',
      role2: 'Lok Sabha',
      img: 'https://www.elections.in/political-leaders/images/rahul-congress.jpg',
    },
    {
      name: 'K C Venugopal',
      role1: 'General Secretary',
      role2: 'Karnataka Incharge, AICC',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOqJrlC9tzArbO14L-gCgMMGQVXtrgwJ20Qg&s',
    },
    {
      name: 'Manish Sharma',
      role1: 'National Incharge',
      role2: 'Indian Youth Congress',
      img: 'https://gfilesindia.com/wp-content/uploads/2025/11/Manish-Sharma-Youth-Congress-Incharge.jpg',
    },
    {
      name: 'Uday Bhanu Chib',
      role1: 'National President',
      role2: 'Indian Youth Congress',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjHbTMFAzU33eTPtWZ1HlLj4TxLw7smuAdxQ&s',
    },
    {
      name: 'Nigam Bandari',
      role1: 'Karnataka Incharge',
      role2: 'Indian Youth Congress',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd84GVVYD7HguLvW9UMTivAep7FoHWLUCu5w&s',
    },
    {
      name: 'Manu Jain',
      role1: 'National Secretory',
      role2: 'Social Media Chairman, IYC',
      img: 'https://media.licdn.com/dms/image/v2/D4E03AQHk9XtZYkZSBA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722936165390?e=2147483647&v=beta&t=98LjAWSbdXy1Azwf9yZntJ6pmsnYK10EfW5PmK4mLFY',
    },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        teamDropdownRef.current &&
        !teamDropdownRef.current.contains(event.target as Node)
      ) {
        setTeamDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [teamDropdownRef]);

  // Close mobile menu on Escape, on outside click, or on hash change
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    const onHashChange = () => setActive(window.location.hash || '/#home');

    document.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', onHashChange);

    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    // focus the first link for accessibility
    if (isOpen) setTimeout(() => firstLinkRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close mobile menu if viewport is resized to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (href: string) => {
    setActive(href);
    setIsOpen(false);
  };

  return (
    <nav
      role="navigation"
      aria-label="Main"
      className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-t-4 border-saffron"
    >
      {/* Top Bar with Leaders - Hidden on Mobile */}
      <div className="hidden md:flex bg-gray-50 border-b border-gray-200 py-2">
        <div className="w-full px-2 lg:px-8 flex justify-between items-center gap-2 overflow-x-auto no-scrollbar">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="flex items-center gap-2 lg:gap-3 group cursor-default min-w-max"
              aria-hidden
            >
              <img
                src={leader.img}
                alt={leader.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 group-hover:border-saffron transition-colors bg-gray-200 shrink-0"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    leader.name
                  )}&background=random&color=fff&size=100`;
                }}
              />
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-bold text-indiaGreen whitespace-nowrap min-w-0">
                  {leader.name}
                </span>

                {leader.role1 && (
                  <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap min-w-0">
                    {leader.role1}
                  </span>
                )}

                {leader.role2 && (
                  <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap min-w-0">
                    {leader.role2}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Navbar Content */}
      <div className="w-full bg-white h-20 relative">
        <div className="w-full px-2 h-full">
          <div className="flex justify-between h-full items-center">
            {/* Logo Section */}
            <button
              onClick={() => {
                window.location.hash = '#home';
                setActive('/#home');
              }}
              className="flex-shrink-0 flex items-center gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-saffron rounded"
              aria-label="Go to home"
            >
              <img
                src="/assets/IYC_Logo.png"
                alt="Indian National Congress Logo"
                className="h-16 w-auto object-contain drop-shadow-sm"
              />
              <div className="flex flex-col text-left">
                <span className="font-bold text-xl text-indiaGreen leading-none">
                  IYC Karnataka
                </span>
                <span className="text-xs font-semibold text-gray-600 tracking-wider">
                  SOCIAL MEDIA
                </span>
              </div>
            </button>

            {/* Prominent Leaders - Desktop Only */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6 ml-auto">
              {prominentLeaders.map((leader, index) => (
                <a
                  key={index}
                  href={leader.href}
                  className="flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-saffron rounded"
                  onClick={() => handleNavClick(leader.href)}
                >
                  <img
                    src={leader.img}
                    alt={leader.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 group-hover:border-saffron transition-colors bg-gray-200 shrink-0"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        leader.name
                      )}&background=random&color=fff&size=100`;
                    }}
                  />
                  <span className="flex flex-col">
                    <span className="text-sm font-bold text-indiaGreen whitespace-nowrap group-hover:text-saffron transition-colors">
                      {leader.name}
                    </span>
                    {leader.role1 && (
                      <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap min-w-0">
                        {leader.role1}
                      </span>
                    )}
                    {leader.role2 && (
                      <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap min-w-0">
                        {leader.role2}
                      </span>
                    )}
                  </span>
                </a>
              ))}
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center ml-6 space-x-4 lg:space-x-8">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.name}
                    className="relative"
                    ref={teamDropdownRef}
                  >
                    <button
                      onClick={() => setTeamDropdownOpen((prev) => !prev)}
                      className={`flex items-center text-gray-700 hover:text-saffron font-medium transition-colors duration-200 text-sm uppercase tracking-wide ${
                        isTeamDropdownOpen ? 'text-saffron' : ''
                      }`}
                    >
                      {link.name}
                    </button>
                    {isTeamDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              handleNavClick(item.href);
                              setTeamDropdownOpen(false);
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-gray-700 hover:text-saffron font-medium transition-colors duration-200 text-sm uppercase tracking-wide ${
                      active === link.href ? 'text-saffron' : ''
                    }`}
                  >
                    {link.name}
                  </a>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="text-indiaGreen hover:text-saffron focus:outline-none focus:ring-2 focus:ring-saffron p-2 rounded"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            className="md:hidden bg-white border-b border-gray-100 shadow-lg absolute w-full top-full left-0 z-50 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link, i) =>
                link.dropdown ? (
                  <div key={link.name}>
                    <button
                      onClick={() =>
                        setMobileTeamDropdownOpen(!isMobileTeamDropdownOpen)
                      }
                      className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-saffron hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-saffron"
                    >
                      <span>{link.name}</span>
                      {/* Add an arrow icon here if you want */}
                    </button>
                    {isMobileTeamDropdownOpen && (
                      <div className="pl-4">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => handleNavClick(item.href)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-saffron hover:bg-orange-50"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    ref={i === 0 ? firstLinkRef : undefined}
                    onClick={() => handleNavClick(link.href)}
                    className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-saffron hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-saffron ${
                      active === link.href ? 'bg-orange-50 text-saffron' : ''
                    }`}
                  >
                    {link.name}
                  </a>
                )
              )}

              <a
                href="/join"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-4 px-5 py-3 rounded-md font-bold bg-saffron text-white hover:bg-orange-600"
              >
                Join Team
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
