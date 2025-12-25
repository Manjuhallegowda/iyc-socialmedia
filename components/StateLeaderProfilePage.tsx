import React from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Navbar from './Navbar';
import Footer from './Footer';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const StateLeaderProfilePage: React.FC = () => {
  const { leaderId } = useParams<{ leaderId: string }>();
  const { stateLeaders } = useData();

  const leader = stateLeaders.find((l) => l.id === leaderId);

  if (!leader) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <h1 className="text-lg font-semibold text-gray-600">
            Leader not found
          </h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-40 pb-20 container mx-auto px-4">
        <div className="max-w-7xl mx-auto px-4">
          {/* Article Title */}
          <h1 className="text-3xl font-serif font-bold text-indiaGreen border-b-2 border-indiaGreen pb-2">
            {leader.name}
          </h1>

          <p className="text-sm text-gray-600 mt-1">
            {leader.designation}, {leader.state}
          </p>

          <div className="mt-6 flex flex-col lg:flex-row gap-8">
            {/* Main Article Content */}
            <article className="flex-1 text-gray-800 text-[15px] leading-relaxed">
              {/* Overview */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-saffron border-b border-gray-300 mb-3">
                  Overview
                </h2>
                <p>{leader.bio}</p>
              </section>

              {/* Political Career */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-saffron border-b border-gray-300 mb-3">
                  Political Career
                </h2>
                <p>
                  {leader.name} serves as {leader.designation} from{' '}
                  {leader.state}. The leader has been actively involved in
                  organizational responsibilities, public outreach programs, and
                  youth-oriented political initiatives.
                </p>
              </section>

              {/* Positions Held */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-saffron border-b border-gray-300 mb-3">
                  Positions Held
                </h2>

                <table className="w-full border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-3 py-2 text-left font-semibold">
                        Position
                      </th>
                      <th className="border px-3 py-2 text-left font-semibold">
                        Organization
                      </th>
                      <th className="border px-3 py-2 text-left font-semibold">
                        Term
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-3 py-2">{leader.designation}</td>
                      <td className="border px-3 py-2">
                        Indian Youth Congress
                      </td>
                      <td className="border px-3 py-2">Present</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* Press & Media */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-saffron border-b border-gray-300 mb-3">
                  Press & Media
                </h2>

                <ul className="list-disc ml-5 space-y-2">
                  <li>
                    Coverage in regional and national media related to public
                    programs, political campaigns, and organizational
                    activities.
                  </li>
                  <li>
                    Participation in press conferences, interviews, and public
                    discussions on policy and youth engagement.
                  </li>
                  <li>
                    Statements and media interactions issued through official
                    party channels.
                  </li>
                </ul>
              </section>

              {/* References */}
              <section className="mb-6">
                <h2 className="text-xl font-semibold text-saffron border-b border-gray-300 mb-3">
                  References & Party Documents
                </h2>

                <ol className="list-decimal ml-5 space-y-2 text-sm text-gray-700">
                  <li>
                    Official communications and publications of the Indian
                    National Congress.
                  </li>
                  <li>
                    Indian Youth Congress organizational records and official
                    appointment documents.
                  </li>
                  <li>
                    Verified media reports, public speeches, and press releases.
                  </li>
                </ol>
              </section>
            </article>

            {/* Infobox */}
            <aside className="w-full lg:w-80 border border-gray-300 text-sm h-fit">
              <div className="bg-indiaGreen text-white text-center font-semibold px-4 py-2">
                {leader.name}
              </div>

              <div className="p-4">
                <img
                  src={leader.imageUrl}
                  alt={leader.name}
                  className="w-full mb-4 border"
                />

                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-t">
                      <th className="py-1 pr-2 text-left font-medium">
                        Designation
                      </th>
                      <td className="py-1">{leader.designation}</td>
                    </tr>
                    <tr className="border-t">
                      <th className="py-1 pr-2 text-left font-medium">State</th>
                      <td className="py-1">{leader.state}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Social Media */}
                {leader.socialMedia && (
                  <div className="flex justify-center gap-4 mt-4 text-indiaGreen">
                    {leader.socialMedia.twitter && (
                      <a
                        href={leader.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaXTwitter />
                      </a>
                    )}
                    {leader.socialMedia.facebook && (
                      <a
                        href={leader.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebookF />
                      </a>
                    )}
                    {leader.socialMedia.instagram && (
                      <a
                        href={leader.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram />
                      </a>
                    )}
                    {leader.socialMedia.youtube && (
                      <a
                        href={leader.socialMedia.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaYoutube />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StateLeaderProfilePage;
