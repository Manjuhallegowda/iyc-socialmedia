import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useData } from '../context/DataContext';
import {
  KpyccTeamMember,
  SocialMediaTeamMember,
  LegalTeamMember,
  DistrictHierarchyData,
} from '../types';
import {
  ArrowLeft,
  Users,
  Award,
  MessageSquare,
  Scale,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Target,
} from 'lucide-react';

const KpyccTeamPage: React.FC = () => {
  const { district } = useParams<{ district: string }>();
  const { getDistrictHierarchyData, kpyccTeam, socialMediaTeam, legalTeam } =
    useData();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'kpycc' | 'social' | 'legal'
  >('overview');

  const districtData = useMemo((): DistrictHierarchyData | null => {
    if (!district) return null;
    return getDistrictHierarchyData(district);
  }, [district, getDistrictHierarchyData]);

  if (!district) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-20 container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-red-600">
              Invalid District
            </h1>
            <Link
              to="/team"
              className="text-indiaGreen hover:underline mt-4 inline-block"
            >
              ← Back to Team Map
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* District Statistics Overview */}
      {districtData && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-indiaGreen" />
            District Overview - {district}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {districtData.counts.totalActive}
              </div>
              <div className="text-sm text-blue-800 font-semibold">
                Total Active Members
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {districtData.counts.district +
                  districtData.counts.assembly +
                  districtData.counts.block}
              </div>
              <div className="text-sm text-green-800 font-semibold">
                Leadership Positions
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                {districtData.statistics.maleMembers +
                  districtData.statistics.femaleMembers}
              </div>
              <div className="text-sm text-purple-800 font-semibold">
                Team Members
              </div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">
                {districtData.statistics.youngLeaders}
              </div>
              <div className="text-sm text-orange-800 font-semibold">
                Young Leaders
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leadership Hierarchy */}
      {districtData && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Leadership Structure
          </h3>
          <div className="space-y-6">
            {/* District President */}
            {districtData.president && (
              <div className="border-l-4 border-saffron pl-6">
                <div className="flex items-center mb-2">
                  <Award className="w-5 h-5 text-saffron mr-2" />
                  <h4 className="font-bold text-lg">District President</h4>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <img
                      src={districtData.president.imageUrl}
                      alt={districtData.president.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h5 className="font-bold text-lg">
                        {districtData.president.name}
                      </h5>
                      <p className="text-indiaGreen font-semibold">
                        {districtData.president.designation}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {districtData.president.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Assembly Level */}
            {districtData.assemblyMembers.length > 0 && (
              <div className="border-l-4 border-green-500 pl-6">
                <div className="flex items-center mb-2">
                  <Users className="w-5 h-5 text-green-500 mr-2" />
                  <h4 className="font-bold text-lg">
                    Assembly Level Leaders (
                    {districtData.assemblyMembers.length})
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {districtData.assemblyMembers.map((member) => (
                    <div key={member.id} className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-bold">{member.name}</h5>
                      <p className="text-green-600 font-semibold text-sm">
                        {member.designation}
                      </p>
                      {member.assembly && (
                        <p className="text-gray-600 text-sm">
                          Assembly: {member.assembly}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Block Level */}
            {districtData.blockMembers.length > 0 && (
              <div className="border-l-4 border-purple-500 pl-6">
                <div className="flex items-center mb-2">
                  <Target className="w-5 h-5 text-purple-500 mr-2" />
                  <h4 className="font-bold text-lg">
                    Block Level Leaders ({districtData.blockMembers.length})
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {districtData.blockMembers.map((member) => (
                    <div key={member.id} className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="font-bold text-sm">{member.name}</h5>
                      <p className="text-purple-600 font-semibold text-xs">
                        {member.designation}
                      </p>
                      {member.block && (
                        <p className="text-gray-600 text-xs">
                          Block: {member.block}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderTeamMember = (
    member: KpyccTeamMember | SocialMediaTeamMember | LegalTeamMember,
    type: string
  ) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="h-48 overflow-hidden relative">
        <img
          src={member.imageUrl}
          alt={member.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
              type === 'kpycc'
                ? 'bg-saffron'
                : type === 'social'
                ? 'bg-blue-500'
                : 'bg-gray-700'
            }`}
          >
            {type === 'kpycc'
              ? 'KPYCC'
              : type === 'social'
              ? 'Social Media'
              : 'Legal'}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
        <p className="text-indiaGreen font-semibold mb-3">
          {'designation' in member
            ? member.designation
            : 'position' in member
            ? member.position
            : 'Role'}
        </p>
        {'bio' in member && member.bio && (
          <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
        )}
        {'socialMedia' in member && (
          <div className="flex space-x-3">
            {member.socialMedia?.twitter && (
              <a
                href={member.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                Twitter
              </a>
            )}
            {member.socialMedia?.facebook && (
              <a
                href={member.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Facebook
              </a>
            )}
            {member.socialMedia?.instagram && (
              <a
                href={member.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-700"
              >
                Instagram
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderKpyccTeam = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {districtData?.assemblyMembers.map((member) =>
        renderTeamMember(member, 'kpycc')
      )}
      {districtData?.blockMembers.map((member) =>
        renderTeamMember(member, 'kpycc')
      )}
      {districtData?.president &&
        renderTeamMember(districtData.president, 'kpycc')}
    </div>
  );

  const renderSocialMediaTeam = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {districtData?.smTeamMembers.map((member) =>
        renderTeamMember(member, 'social')
      )}
    </div>
  );

  const renderLegalTeam = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {districtData?.legalTeamMembers.map((member) =>
        renderTeamMember(member, 'legal')
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="pt-20 container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/team"
            className="inline-flex items-center text-indiaGreen hover:text-indiaBlue transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Team Map
          </Link>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-indiaGreen mb-2">
                  {district} District Team
                </h1>
                <p className="text-gray-600">
                  Comprehensive team structure and leadership details
                </p>
              </div>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>Karnataka</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{districtData?.counts.totalActive || 0} Members</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            {[
              { key: 'overview', label: 'Overview', icon: TrendingUp },
              { key: 'kpycc', label: 'KPYCC Team', icon: Users },
              {
                key: 'social',
                label: 'Social Media Team',
                icon: MessageSquare,
              },
              { key: 'legal', label: 'Legal Team', icon: Scale },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center px-6 py-4 font-semibold transition-colors duration-200 ${
                  activeTab === key
                    ? 'text-indiaGreen border-b-2 border-indiaGreen bg-green-50'
                    : 'text-gray-600 hover:text-indiaGreen hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="min-h-screen">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'kpycc' && renderKpyccTeam()}
          {activeTab === 'social' && renderSocialMediaTeam()}
          {activeTab === 'legal' && renderLegalTeam()}
        </div>

        {/* Empty States */}
        {activeTab === 'kpycc' &&
          districtData?.assemblyMembers.length === 0 &&
          districtData?.blockMembers.length === 0 &&
          !districtData?.president && (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No KPYCC Team Members
              </h3>
              <p className="text-gray-500">
                Team members will be displayed here when available.
              </p>
            </div>
          )}

        {activeTab === 'social' &&
          (!districtData?.smTeamMembers ||
            districtData.smTeamMembers.length === 0) && (
            <div className="text-center py-20">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Social Media Team
              </h3>
              <p className="text-gray-500">
                Social media team members will be displayed here when available.
              </p>
            </div>
          )}

        {activeTab === 'legal' &&
          (!districtData?.legalTeamMembers ||
            districtData.legalTeamMembers.length === 0) && (
            <div className="text-center py-20">
              <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Legal Team Members
              </h3>
              <p className="text-gray-500">
                Legal team members will be displayed here when available.
              </p>
            </div>
          )}
      </main>
      <Footer />
    </div>
  );
};

export default KpyccTeamPage;
