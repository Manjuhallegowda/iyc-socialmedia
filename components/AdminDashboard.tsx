import React, { useState } from 'react';

import { useData } from '../context/DataContext';

import { uploadImageToR2, apiChangePassword } from '../services/api';

import {
  KpyccTeamMember,
  NewsItem,
  VideoItem,
  GalleryItem,
  User,
  ExecutiveLeader,
  StateLeader,
  SocialMediaTeamMember,
  LegalTeamMember,
  Activity,
} from '../types';

import {
  Trash2,
  Plus,
  LogOut,
  Users,
  Newspaper,
  Calendar,
  Video,
  Upload,
  X,
  Edit,
  Image as GalleryIcon,
  Settings,
  Search,
  LayoutDashboard,
  ChevronRight,
  Shield,
  Megaphone,
  Briefcase,
  Menu, // Added Menu icon
} from 'lucide-react';

const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const {
    kpyccTeam,

    executiveLeaders,

    stateLeaders,

    news,

    videos,

    galleryItems,

    users,

    socialMediaTeam,

    legalTeam,

    activities,

    addKpyccTeamMember,

    updateKpyccTeamMember,

    deleteKpyccTeamMember,

    addExecutiveLeader,

    updateExecutiveLeader,

    deleteExecutiveLeader,

    addStateLeader,

    updateStateLeader,

    deleteStateLeader,

    addNews,

    updateNews,

    deleteNews,

    addVideo,

    updateVideo,

    deleteVideo,

    addGalleryItem,

    updateGalleryItem,

    deleteGalleryItem,

    addUser,

    deleteUser,

    addSocialMediaTeamMember,

    updateSocialMediaTeamMember,

    deleteSocialMediaTeamMember,

    addLegalTeamMember,

    updateLegalTeamMember,

    deleteLegalTeamMember,

    addActivity,

    updateActivity,

    deleteActivity,
  } = useData();

  const [activeTab, setActiveTab] = useState<
    | 'kpyccTeam'
    | 'executiveLeaders'
    | 'stateLeaders'
    | 'news'
    | 'activities'
    | 'videos'
    | 'gallery'
    | 'settings'
    | 'socialMediaTeam'
    | 'legalTeam'
  >('kpyccTeam');

  const [showModal, setShowModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

  // Generic Form State

  const [formData, setFormData] = useState<any>({});

  const [uploading, setUploading] = useState(false);

  const [selectedLeaderId, setSelectedLeaderId] = useState<string | null>(null);

  // State for Settings tab

  const [currentPassword, setCurrentPassword] = useState('');

  const [newPassword, setNewPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const [success, setSuccess] = useState('');

  // State for Settings tab (user management)

  const [newUsername, setNewUsername] = useState('');

  const [newUserPassword, setNewUserPassword] = useState('');

  const [newUserConfirmPassword, setNewUserConfirmPassword] = useState('');

  const [userMgmtError, setUserMgmtError] = useState('');

  const [userMgmtSuccess, setUserMgmtSuccess] = useState('');

  // --- HANDLERS (Unchanged) ---

  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');

    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');

      return;
    }

    if (!currentPassword || !newPassword) {
      setError('All fields are required.');

      return;
    }

    try {
      await apiChangePassword(currentPassword, newPassword);

      setSuccess('Password updated successfully!');

      setCurrentPassword('');

      setNewPassword('');

      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to update password.');
    }
  };

  const handleNewUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setUserMgmtError('');

    setUserMgmtSuccess('');

    if (newUserPassword !== newUserConfirmPassword) {
      setUserMgmtError('Passwords do not match.');

      return;
    }

    if (!newUsername || !newUserPassword) {
      setUserMgmtError('Username and password are required.');

      return;
    }

    try {
      await addUser({ username: newUsername, password: newUserPassword });

      setUserMgmtSuccess('User added successfully!');

      setNewUsername('');

      setNewUserPassword('');

      setNewUserConfirmPassword('');
    } catch (err: any) {
      setUserMgmtError(err.message || 'Failed to add user.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);

        setUserMgmtSuccess('User deleted successfully!');

        setTimeout(() => setUserMgmtSuccess(''), 3000);
      } catch (err: any) {
        setUserMgmtError(err.message || 'Failed to delete user.');

        setTimeout(() => setUserMgmtError(''), 3000);
      }
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,

    fieldName: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);

      const imageUrl = await uploadImageToR2(e.target.files[0]);

      setFormData({
        ...formData,

        [fieldName]: imageUrl,

        ...(activeTab === 'gallery' && { thumbnailUrl: imageUrl }),
      });

      setUploading(false);
    }
  };

  const handleAddNew = () => {
    setFormData({});

    setSelectedLeaderId(null);

    setShowModal(true);
  };

  const handleEdit = (item: any) => {
    if (activeTab === 'kpyccTeam' && item.social) {
      const { social, activity, mailstone, ...rest } = item;

      setFormData({
        ...rest,

        ...JSON.parse(social || '{}'),

        activity: (JSON.parse(activity || '[]') as string[]).join(', '),

        mailstone: (JSON.parse(mailstone || '[]') as string[]).join(', '),
      });
    } else if (activeTab === 'executiveLeaders' && item.socialMedia) {
      const { socialMedia, ...rest } = item;

      setFormData({ ...rest, ...socialMedia });

      setSelectedLeaderId(null);
    } else if (activeTab === 'stateLeaders' && item.socialMedia) {
      const { socialMedia, activities, milestones, ...rest } = item;

      setFormData({
        ...rest,

        ...socialMedia,

        activities: (activities || [])

          .map((a: any) => a.description)

          .join(',\n'),

        milestones: (milestones || [])

          .map((m: any) => m.description)

          .join(',\n'),
      });

      setSelectedLeaderId(null);
    } else if (activeTab === 'socialMediaTeam' && item.socialMedia) {
      const { socialMedia, ...rest } = item;

      setFormData({ ...rest, ...socialMedia });
    } else {
      setFormData(item);

      setSelectedLeaderId(null);
    }

    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEditing = !!formData.id;

    if (!isEditing && !formData.imageUrl) {
      const imageTabs = [
        'kpyccTeam',

        'executiveLeaders',

        'news',

        'gallery',

        'socialMediaTeam',

        'legalTeam',

        'activities',
      ];

      if (imageTabs.includes(activeTab)) {
        alert('Please upload an image.');

        return;
      }
    }

    if (activeTab === 'kpyccTeam') {
      const { twitter, facebook, instagram, activity, mailstone, ...rest } =
        formData;

      const memberData: Partial<KpyccTeamMember> = {
        ...rest,

        startYear: Number(formData.startYear) || 0,

        social: JSON.stringify({
          twitter: twitter || '',

          facebook: facebook || '',

          instagram: instagram || '',
        }),

        activity: JSON.stringify(
          (activity || '')

            .split(',')

            .map((s: string) => s.trim())

            .filter((s: string) => s)
        ),

        mailstone: JSON.stringify(
          (mailstone || '')

            .split(',')

            .map((s: string) => s.trim())

            .filter((s: string) => s)
        ),
      };

      if (isEditing) await updateKpyccTeamMember(memberData as KpyccTeamMember);
      else await addKpyccTeamMember(memberData as KpyccTeamMember);
    } else if (activeTab === 'executiveLeaders') {
      const { twitter, facebook, instagram, youtube, ...rest } = formData;

      const executiveLeaderData: Partial<ExecutiveLeader> = {
        ...rest,

        socialMedia: {
          twitter: twitter || '',

          facebook: facebook || '',

          instagram: instagram || '',

          youtube: youtube || '',
        },
      };

      if (isEditing)
        await updateExecutiveLeader(executiveLeaderData as ExecutiveLeader);
      else await addExecutiveLeader(executiveLeaderData as ExecutiveLeader);
    } else if (activeTab === 'stateLeaders') {
      const {
        twitter,

        facebook,

        instagram,

        youtube,

        activities,

        milestones,

        ...rest
      } = formData;

      const activitiesArray = (activities || '')

        .split(/[,\n]/)

        .map((s: string) => s.trim())

        .filter((s: string) => s)

        .map((desc: string) => ({
          date: new Date().toISOString().split('T')[0],

          title: desc.substring(0, 50) + (desc.length > 50 ? '...' : ''),

          description: desc,
        }));

      const milestonesArray = (milestones || '')

        .split(/[,\n]/)

        .map((s: string) => s.trim())

        .filter((s: string) => s)

        .map((desc: string) => ({
          date: new Date().toISOString().split('T')[0],

          description: desc,
        }));

      const stateLeaderData: Partial<StateLeader> = {
        ...rest,

        imageUrl: formData.imageUrl || '',

        socialMedia: {
          twitter: twitter || '',

          facebook: facebook || '',

          instagram: instagram || '',

          youtube: youtube || '',
        },

        activities: activitiesArray || [],

        milestones: milestonesArray || [],
      };

      if (isEditing) await updateStateLeader(stateLeaderData as StateLeader);
      else await addStateLeader(stateLeaderData as StateLeader);
    } else if (activeTab === 'news') {
      const baseNewsData: Omit<NewsItem, 'id'> = {
        title: formData.title || '',

        date: formData.date || '',

        link: formData.link || '',

        imageUrl: formData.imageUrl || '',

        description: formData.description || '',

        content: formData.content || null,

        source: formData.source || null,

        author: formData.author || null,
      };

      if (isEditing) {
        const newsDataForUpdate: NewsItem = {
          id: formData.id,

          ...baseNewsData,
        };

        await updateNews(newsDataForUpdate);
      } else {
        await addNews(baseNewsData);
      }
    } else if (activeTab === 'activities') {
      const activityData: Omit<Activity, 'id'> = {
        title: formData.title || '',

        type: formData.type || '',

        date: formData.date || '',

        location: formData.location || '',

        description: formData.description || '',

        imageUrl: formData.imageUrl || '',
      };

      if (isEditing) {
        await updateActivity({ id: formData.id, ...activityData });
      } else {
        await addActivity(activityData);
      }
    } else if (activeTab === 'videos') {
      const videoData = {
        ...formData,

        date: formData.date || new Date().toISOString().split('T')[0],
      } as VideoItem;

      if (isEditing) await updateVideo(videoData);
      else await addVideo(videoData);
    } else if (activeTab === 'gallery') {
      if (isEditing) await updateGalleryItem(formData as GalleryItem);
      else await addGalleryItem(formData as GalleryItem);
    } else if (activeTab === 'socialMediaTeam') {
      const { twitter, facebook, instagram, youtube, ...rest } = formData;

      const smData: Partial<SocialMediaTeamMember> = {
        ...rest,

        socialMedia: {
          twitter,

          facebook,

          instagram,

          youtube,
        },
      };

      if (isEditing)
        await updateSocialMediaTeamMember(smData as SocialMediaTeamMember);
      else await addSocialMediaTeamMember(smData as SocialMediaTeamMember);
    } else if (activeTab === 'legalTeam') {
      if (isEditing) await updateLegalTeamMember(formData as LegalTeamMember);
      else await addLegalTeamMember(formData as LegalTeamMember);
    }

    setShowModal(false);

    setFormData({});

    setSelectedLeaderId(null);
  };

  // --- UI COMPONENTS ---

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-xs font-semibold uppercase">{title}</p>

        <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
      </div>

      <div className={`p-3 rounded-full ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
  );

  const SidebarItem = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => {
        setActiveTab(id);

        setIsSidebarOpen(false); // Close sidebar on mobile after selection
      }}
      className={`group flex items-center justify-between w-full p-3 mb-1 rounded-lg transition-all duration-200 ${
        activeTab === id
          ? 'bg-gradient-to-r from-saffron to-orange-500 text-white shadow-md'
          : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon
          size={18}
          className={
            activeTab === id
              ? 'text-white'
              : 'text-gray-400 group-hover:text-orange-500'
          }
        />

        <span className="font-medium text-sm">{label}</span>
      </div>

      {activeTab === id && <ChevronRight size={16} />}
    </button>
  );

  const renderSidebar = () => (
    <>
      {/* Mobile Overlay */}

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}

      <div
        className={`fixed left-0 top-0 h-screen bg-white w-64 shadow-xl z-40 border-r border-gray-100 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-6 pb-8 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-indiaGreen w-8 h-8 rounded flex items-center justify-center text-white font-bold">
                IY
              </div>

              <h1 className="text-xl font-extrabold tracking-tight text-gray-800">
                <span className="text-saffron">C</span>RM
              </h1>
            </div>

            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider ml-10">
              Admin Dashboard v2.0
            </p>
          </div>

          {/* Mobile Close Button */}

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-red-500"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar h-[calc(100vh-180px)]">
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-400 uppercase mb-3 px-3">
              Leadership
            </p>

            <SidebarItem
              id="executiveLeaders"
              label="Executive Leaders"
              icon={Shield}
            />

            <SidebarItem
              id="stateLeaders"
              label="State Leaders"
              icon={Briefcase}
            />

            <SidebarItem id="kpyccTeam" label="KPYCC Team" icon={Users} />
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold text-gray-400 uppercase mb-3 px-3">
              Departments
            </p>

            <SidebarItem
              id="socialMediaTeam"
              label="SM Team"
              icon={Megaphone}
            />

            <SidebarItem id="legalTeam" label="Legal Team" icon={Shield} />
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold text-gray-400 uppercase mb-3 px-3">
              Content
            </p>

            <SidebarItem id="news" label="News & Updates" icon={Newspaper} />

            <SidebarItem id="activities" label="Activities" icon={Calendar} />

            <SidebarItem id="videos" label="Videos" icon={Video} />

            <SidebarItem
              id="gallery"
              label="Media Gallery"
              icon={GalleryIcon}
            />
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100 bg-gray-50 absolute bottom-0 w-full">
          <SidebarItem id="settings" label="Settings" icon={Settings} />

          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-50 text-red-500 transition-colors mt-2"
          >
            <LogOut size={18} />

            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );

  const renderTable = () => {
    let data: any[] = [];

    let count = 0;

    let label = '';

    // Determine data source based on tab

    switch (activeTab) {
      case 'kpyccTeam':
        data = kpyccTeam;

        count = kpyccTeam.length;

        label = 'Team Members';

        break;

      case 'executiveLeaders':
        data = executiveLeaders;

        count = executiveLeaders.length;

        label = 'Executives';

        break;

      case 'stateLeaders':
        data = stateLeaders;

        count = stateLeaders.length;

        label = 'State Leaders';

        break;

      case 'socialMediaTeam':
        data = socialMediaTeam;

        count = socialMediaTeam.length;

        label = 'SM Staff';

        break;

      case 'legalTeam':
        data = legalTeam;

        count = legalTeam.length;

        label = 'Lawyers';

        break;

      case 'news':
        data = news;

        count = news.length;

        label = 'Articles';

        break;

      case 'activities':
        data = activities;

        count = activities.length;

        label = 'Events';

        break;

      case 'videos':
        data = videos;

        count = videos.length;

        label = 'Videos';

        break;

      case 'gallery':
        data = galleryItems;

        count = galleryItems.length;

        label = 'Images';

        break;
    }

    // Filter logic

    const filteredData = data.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-6 animate-fade-in-up">
        {/* Quick Stats Row */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <StatCard
            title={`Total ${label}`}
            value={count}
            icon={LayoutDashboard}
            color="bg-blue-500"
          />

          <StatCard
            title="Active Status"
            value="Online"
            icon={Shield}
            color="bg-green-500"
          />

          <StatCard
            title="Last Updated"
            value="Today"
            icon={Calendar}
            color="bg-purple-500"
          />
        </div>

        {/* Toolbar */}

        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 gap-4">
          <div className="relative w-full md:max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder={`Search ${label}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron/50 text-sm bg-gray-50"
            />
          </div>

          <div className="text-sm text-gray-500 w-full md:w-auto text-center md:text-right">
            Showing{' '}
            <span className="font-bold text-gray-800">
              {filteredData.length}
            </span>{' '}
            entries
          </div>
        </div>

        {/* Modern Table */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-xs tracking-wider">
                    Preview
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-xs tracking-wider">
                    Primary Info
                  </th>

                  {/* Hidden on small screens */}

                  <th className="hidden md:table-cell px-6 py-4 font-semibold text-gray-500 uppercase text-xs tracking-wider">
                    Additional Details
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-xs tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-orange-50/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {activeTab === 'videos' ? (
                        <div className="w-12 h-12 bg-red-100 text-red-500 flex items-center justify-center rounded-lg">
                          <Video size={20} />
                        </div>
                      ) : (
                        <div className="relative w-12 h-12">
                          <img
                            src={item.thumbnailUrl || item.imageUrl}
                            className="w-full h-full rounded-lg object-cover border border-gray-100 shadow-sm"
                            alt=""
                          />
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 text-base">
                          {item.name || item.title || item.alt}
                        </span>

                        <span className="text-gray-500 text-xs mt-1 line-clamp-1">
                          {item.designation || item.position || item.date}
                        </span>
                      </div>
                    </td>

                    {/* Hidden on small screens */}

                    <td className="hidden md:table-cell px-6 py-4">
                      {item.tag && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {item.tag}
                        </span>
                      )}

                      {item.videoId && (
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                          {item.videoId}
                        </span>
                      )}

                      {item.location && (
                        <span className="text-gray-600 flex items-center gap-1">
                          <Calendar size={12} /> {item.location}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      {/* Always show actions, remove hover-only opacity for mobile friendliness */}

                      <div className="flex items-center justify-end gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-gray-500 hover:text-saffron hover:bg-orange-100 p-2 rounded-lg transition-colors"
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          onClick={() => {
                            if (activeTab === 'kpyccTeam')
                              deleteKpyccTeamMember(item.id);

                            if (activeTab === 'executiveLeaders')
                              deleteExecutiveLeader(item.id);

                            if (activeTab === 'stateLeaders')
                              deleteStateLeader(item.id);

                            if (activeTab === 'news') deleteNews(item.id);

                            if (activeTab === 'activities')
                              deleteActivity(item.id);

                            if (activeTab === 'videos') deleteVideo(item.id);

                            if (activeTab === 'gallery')
                              deleteGalleryItem(item.id);

                            if (activeTab === 'socialMediaTeam')
                              deleteSocialMediaTeamMember(item.id);

                            if (activeTab === 'legalTeam')
                              deleteLegalTeamMember(item.id);
                          }}
                          className="text-gray-500 hover:text-red-500 hover:bg-red-100 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderModal = () => (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-in">
        {/* Header */}

        <div className="px-4 py-4 md:px-8 md:py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-800">
              {formData.id ? 'Edit' : 'New'}{' '}
              <span className="text-saffron">
                {activeTab.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </h2>
          </div>

          <button
            onClick={() => {
              setShowModal(false);

              setFormData({});

              setSelectedLeaderId(null);
            }}
            className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Body */}

        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* --- Executive Leaders Form --- */}

            {activeTab === 'executiveLeaders' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-4 md:col-span-2">
                  <h3 className="text-sm font-bold text-gray-900 uppercase border-b pb-2 mb-4">
                    Basic Information
                  </h3>
                </div>

                <input
                  required
                  placeholder="Full Name"
                  value={formData.name || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <input
                  required
                  placeholder="Title (e.g., National President)"
                  value={formData.title || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />

                <div className="md:col-span-2">
                  <textarea
                    placeholder="Description / Bio"
                    value={formData.description || ''}
                    className="input-field min-h-[100px]"
                    rows={3}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-4 md:col-span-2 mt-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase border-b pb-2 mb-4">
                    Social Media Presence
                  </h3>
                </div>

                <input
                  placeholder="Twitter URL"
                  value={formData.twitter || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, twitter: e.target.value })
                  }
                />

                <input
                  placeholder="Facebook URL"
                  value={formData.facebook || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, facebook: e.target.value })
                  }
                />

                <input
                  placeholder="Instagram URL"
                  value={formData.instagram || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, instagram: e.target.value })
                  }
                />

                <input
                  placeholder="YouTube URL"
                  value={formData.youtube || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, youtube: e.target.value })
                  }
                />

                <div className="md:col-span-2">
                  <h3 className="text-sm font-bold text-gray-900 uppercase border-b pb-2 mb-4">
                    Profile Image
                  </h3>

                  <div className="border-2 border-dashed border-gray-200 bg-gray-50 p-6 md:p-8 rounded-xl text-center hover:border-saffron transition-colors">
                    <label className="cursor-pointer flex flex-col items-center gap-2">
                      <div className="p-3 bg-white rounded-full shadow-sm">
                        <Upload size={24} className="text-saffron" />
                      </div>

                      <span className="font-medium text-gray-600">
                        Click to upload photo
                      </span>

                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, 'imageUrl')}
                      />
                    </label>

                    {uploading && (
                      <p className="text-xs text-blue-500 mt-2 font-medium">
                        Uploading to Cloudflare R2...
                      </p>
                    )}

                    {formData.imageUrl && !uploading && (
                      <p className="text-xs text-green-600 mt-2 font-bold flex items-center justify-center gap-1">
                        ✓ Image Ready
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* --- State Leaders Form --- */}

            {activeTab === 'stateLeaders' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="md:col-span-2">
                  <h3 className="section-header">Leader Details</h3>
                </div>

                <input
                  required
                  placeholder="Full Name"
                  value={formData.name || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <input
                  required
                  placeholder="Designation"
                  value={formData.designation || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                />

                <input
                  required
                  placeholder="State"
                  value={formData.state || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />

                <div className="md:col-span-2">
                  <textarea
                    placeholder="Bio"
                    value={formData.bio || ''}
                    className="input-field"
                    rows={3}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <h3 className="section-header">Key Information</h3>
                </div>

                <textarea
                  placeholder="Activities (comma or newline separated)"
                  value={formData.activities || ''}
                  className="input-field"
                  rows={3}
                  onChange={(e) =>
                    setFormData({ ...formData, activities: e.target.value })
                  }
                />

                <textarea
                  placeholder="Milestones (comma or newline separated)"
                  value={formData.milestones || ''}
                  className="input-field"
                  rows={3}
                  onChange={(e) =>
                    setFormData({ ...formData, milestones: e.target.value })
                  }
                />

                <div className="md:col-span-2">
                  <h3 className="section-header">Social Media</h3>
                </div>

                <input
                  placeholder="Twitter URL"
                  value={formData.twitter || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, twitter: e.target.value })
                  }
                />

                <input
                  placeholder="Facebook URL"
                  value={formData.facebook || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, facebook: e.target.value })
                  }
                />

                <input
                  placeholder="Instagram URL"
                  value={formData.instagram || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, instagram: e.target.value })
                  }
                />

                <input
                  placeholder="YouTube URL"
                  value={formData.youtube || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, youtube: e.target.value })
                  }
                />

                <div className="md:col-span-2">
                  <div className="border-2 border-dashed border-gray-200 bg-gray-50 p-6 rounded-xl text-center">
                    <label className="cursor-pointer block">
                      <span className="text-saffron font-bold flex items-center justify-center gap-2">
                        <Upload size={16} /> Upload Photo
                      </span>

                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, 'imageUrl')}
                      />
                    </label>

                    {uploading && (
                      <p className="text-xs text-gray-500 mt-2">Uploading...</p>
                    )}

                    {formData.imageUrl && !uploading && (
                      <p className="text-xs text-green-600 mt-2">
                        Image Uploaded!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* --- KPYCC Team Form (With Hierarchy) --- */}

            {activeTab === 'kpyccTeam' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="md:col-span-2">
                  <h3 className="section-header">Member Identity</h3>
                </div>

                <input
                  required
                  placeholder="Full Name"
                  value={formData.name || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <input
                  required
                  placeholder="Designation"
                  value={formData.designation || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                />

                {/* Hierarchy Logic */}

                <div className="md:col-span-2 bg-orange-50 p-4 md:p-6 rounded-xl border border-orange-100 space-y-4">
                  <h4 className="font-bold text-orange-800 text-sm flex items-center gap-2">
                    <Shield size={16} /> Jurisdiction / Level
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      required
                      value={formData.level || ''}
                      className="input-field bg-white"
                      onChange={(e) => {
                        const newLevel = e.target.value;

                        setFormData({
                          ...formData,

                          level: newLevel,

                          district:
                            newLevel === 'State' ? '' : formData.district,

                          assembly:
                            newLevel === 'State' || newLevel === 'District'
                              ? ''
                              : formData.assembly,

                          block: newLevel === 'Block' ? formData.block : '',
                        });
                      }}
                    >
                      <option value="" disabled>
                        Select Level
                      </option>

                      <option value="State">Karnataka (State Level)</option>

                      <option value="District">District</option>

                      <option value="Assembly">Assembly</option>

                      <option value="Block">Block</option>
                    </select>

                    {(formData.level === 'District' ||
                      formData.level === 'Assembly' ||
                      formData.level === 'Block') && (
                      <input
                        required
                        placeholder="District Name"
                        value={formData.district || ''}
                        className="input-field animate-fade-in"
                        onChange={(e) =>
                          setFormData({ ...formData, district: e.target.value })
                        }
                      />
                    )}

                    {(formData.level === 'Assembly' ||
                      formData.level === 'Block') && (
                      <input
                        required
                        placeholder="Assembly Constituency"
                        value={formData.assembly || ''}
                        className="input-field animate-fade-in"
                        onChange={(e) =>
                          setFormData({ ...formData, assembly: e.target.value })
                        }
                      />
                    )}

                    {formData.level === 'Block' && (
                      <input
                        required
                        placeholder="Block Name"
                        value={formData.block || ''}
                        className="input-field animate-fade-in"
                        onChange={(e) =>
                          setFormData({ ...formData, block: e.target.value })
                        }
                      />
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="section-header">Personal Details</h3>
                </div>

                <input
                  required
                  type="number"
                  placeholder="Start Year"
                  value={formData.startYear || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, startYear: e.target.value })
                  }
                />

                <input
                  required
                  placeholder="Email"
                  type="email"
                  value={formData.email || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <input
                  required
                  placeholder="Phone Number"
                  type="tel"
                  value={formData.phone || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />

                <div className="md:col-span-2">
                  <textarea
                    required
                    placeholder="Bio"
                    value={formData.bio || ''}
                    className="input-field"
                    rows={3}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <h3 className="section-header">Socials & Media</h3>
                </div>

                <input
                  placeholder="Twitter URL"
                  value={formData.twitter || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, twitter: e.target.value })
                  }
                />

                <input
                  placeholder="Facebook URL"
                  value={formData.facebook || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, facebook: e.target.value })
                  }
                />

                <input
                  placeholder="Instagram URL"
                  value={formData.instagram || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, instagram: e.target.value })
                  }
                />

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <textarea
                    placeholder="Activities (comma-separated)"
                    value={formData.activity || ''}
                    className="input-field"
                    rows={3}
                    onChange={(e) =>
                      setFormData({ ...formData, activity: e.target.value })
                    }
                  />

                  <textarea
                    placeholder="Milestones (comma-separated)"
                    value={formData.mailstone || ''}
                    className="input-field"
                    rows={3}
                    onChange={(e) =>
                      setFormData({ ...formData, mailstone: e.target.value })
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="border-2 border-dashed border-gray-200 bg-gray-50 p-6 rounded-xl text-center">
                    <label className="cursor-pointer block">
                      <span className="text-saffron font-bold flex items-center justify-center gap-2">
                        <Upload size={16} /> Upload Photo
                      </span>

                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, 'imageUrl')}
                      />
                    </label>

                    {uploading && (
                      <p className="text-xs text-gray-500 mt-2">Uploading...</p>
                    )}

                    {formData.imageUrl && !uploading && (
                      <p className="text-xs text-green-600 mt-2">
                        Image Uploaded!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* --- News Form --- */}

            {activeTab === 'news' && (
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <input
                  required
                  placeholder="Headline"
                  value={formData.title || ''}
                  className="input-field text-lg font-bold"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={formData.date || ''}
                    className="input-field"
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />

                  <input
                    required
                    placeholder="News Source Link"
                    value={formData.link || ''}
                    className="input-field"
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                  />
                </div>

                <textarea
                  required
                  placeholder="Short Description / Excerpt"
                  value={formData.description || ''}
                  className="input-field min-h-[120px]"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />

                <div className="border-2 border-dashed border-gray-200 bg-gray-50 p-6 md:p-8 rounded-xl text-center">
                  <label className="cursor-pointer block">
                    <span className="text-saffron font-bold flex items-center justify-center gap-2">
                      <Upload size={16} /> Upload Article Thumbnail
                    </span>

                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'imageUrl')}
                    />
                  </label>

                  {formData.imageUrl && (
                    <p className="text-xs text-green-600 mt-2">✓ Selected</p>
                  )}
                </div>
              </div>
            )}

            {/* --- Activities Form --- */}

            {activeTab === 'activities' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <input
                  required
                  placeholder="Activity Title"
                  value={formData.title || ''}
                  className="input-field md:col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />

                <input
                  required
                  placeholder="Type (e.g. Protest, Campaign)"
                  value={formData.type || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                />

                <input
                  type="date"
                  value={formData.date || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />

                <input
                  required
                  placeholder="Location"
                  value={formData.location || ''}
                  className="input-field md:col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />

                <textarea
                  required
                  placeholder="Description"
                  value={formData.description || ''}
                  className="input-field md:col-span-2"
                  rows={4}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />

                <div className="md:col-span-2 border-2 border-dashed border-gray-200 bg-gray-50 p-4 rounded text-center">
                  <label className="cursor-pointer block">
                    <span className="text-saffron font-bold flex items-center justify-center gap-2">
                      <Upload size={16} /> Upload Event Photo
                    </span>

                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'imageUrl')}
                    />
                  </label>

                  {formData.imageUrl && (
                    <p className="text-xs text-green-600 mt-2">Uploaded</p>
                  )}
                </div>
              </div>
            )}

            {/* --- Videos Form --- */}

            {activeTab === 'videos' && (
              <div className="grid grid-cols-1 gap-6">
                <input
                  required
                  placeholder="Video Title"
                  value={formData.title || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none hidden md:flex">
                    <span className="text-gray-500 text-sm">
                      youtube.com/watch?v=
                    </span>
                  </div>

                  <input
                    required
                    placeholder="Video ID (e.g. dQw4w9WgXcQ)"
                    value={formData.videoId || ''}
                    className="input-field md:pl-48"
                    onChange={(e) =>
                      setFormData({ ...formData, videoId: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            {/* --- Gallery Form --- */}

            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <input
                  placeholder="Alt text / Caption"
                  value={formData.alt || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, alt: e.target.value })
                  }
                />

                <select
                  value={formData.tag || 'gallery'}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, tag: e.target.value })
                  }
                >
                  <option value="gallery">Standard Gallery</option>

                  <option value="hero">Hero Section</option>

                  <option value="about">About Section</option>
                </select>

                <div className="border-2 border-dashed border-gray-200 bg-gray-50 p-8 rounded-xl text-center">
                  <label className="cursor-pointer block">
                    <span className="text-saffron font-bold flex items-center justify-center gap-2">
                      <Upload size={16} /> Upload Image
                    </span>

                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'imageUrl')}
                    />
                  </label>

                  {formData.imageUrl && (
                    <p className="text-xs text-green-600 mt-2">✓ Ready</p>
                  )}
                </div>
              </div>
            )}

            {/* --- Social Media Team Form --- */}

            {activeTab === 'socialMediaTeam' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="md:col-span-2">
                  <h3 className="section-header">Staff Details</h3>
                </div>

                <input
                  required
                  placeholder="Name"
                  value={formData.name || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <input
                  required
                  placeholder="Position"
                  value={formData.position || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                />

                <select
                  required
                  value={formData.level || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, level: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select Level
                  </option>

                  <option value="State">State</option>

                  <option value="District">District</option>

                  <option value="Assembly">Assembly</option>

                  <option value="Block">Block</option>
                </select>

                <input
                  required
                  placeholder="Name of Place (District/Block name)"
                  value={formData.placeName || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, placeName: e.target.value })
                  }
                />

                <textarea
                  placeholder="Bio"
                  value={formData.bio || ''}
                  className="input-field md:col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />

                <div className="md:col-span-2">
                  <h3 className="section-header">Links</h3>
                </div>

                <input
                  placeholder="Instagram"
                  value={formData.instagram || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, instagram: e.target.value })
                  }
                />

                <input
                  placeholder="Twitter"
                  value={formData.twitter || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, twitter: e.target.value })
                  }
                />

                <input
                  placeholder="Facebook"
                  value={formData.facebook || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, facebook: e.target.value })
                  }
                />

                <input
                  placeholder="YouTube"
                  value={formData.youtube || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, youtube: e.target.value })
                  }
                />

                <div className="md:col-span-2 border-2 border-dashed border-gray-200 bg-gray-50 p-4 rounded text-center">
                  <label className="cursor-pointer block">
                    <span className="text-saffron font-bold flex items-center justify-center gap-2">
                      <Upload size={16} /> Upload Photo
                    </span>

                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'imageUrl')}
                    />
                  </label>

                  {formData.imageUrl && (
                    <p className="text-xs text-green-600 mt-2">Uploaded</p>
                  )}
                </div>
              </div>
            )}

            {/* --- Legal Team Form --- */}

            {activeTab === 'legalTeam' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <input
                  required
                  placeholder="Name"
                  value={formData.name || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <input
                  required
                  placeholder="Position"
                  value={formData.position || ''}
                  className="input-field"
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                />

                <textarea
                  placeholder="Bio"
                  value={formData.bio || ''}
                  className="input-field md:col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />

                <div className="md:col-span-2 border-2 border-dashed border-gray-200 bg-gray-50 p-4 rounded text-center">
                  <label className="cursor-pointer block">
                    <span className="text-saffron font-bold flex items-center justify-center gap-2">
                      <Upload size={16} /> Upload Photo
                    </span>

                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'imageUrl')}
                    />
                  </label>

                  {formData.imageUrl && (
                    <p className="text-xs text-green-600 mt-2">Uploaded</p>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer Actions */}

        <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 md:px-6 rounded-lg text-gray-600 font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>

          <button
            disabled={uploading}
            onClick={handleSubmit}
            className="px-4 py-2 md:px-6 rounded-lg bg-saffron text-white font-bold shadow-lg hover:bg-orange-600 hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {uploading
              ? 'Processing...'
              : formData.id
              ? 'Save Changes'
              : 'Create Record'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8 animate-fade-in-up max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Change Password Card */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Shield size={20} className="text-saffron" /> Security
            </h3>
          </div>

          <div className="p-6">
            <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Current Password
                </label>

                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="input-field mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  New Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field mt-1"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              {success && <p className="text-green-500 text-sm">{success}</p>}

              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 rounded-lg font-bold hover:bg-black transition-colors"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>

        {/* Manage Users Card */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Users size={20} className="text-saffron" /> User Management
            </h3>
          </div>

          <div className="p-6">
            {/* Add User */}

            <form
              onSubmit={handleNewUserSubmit}
              className="space-y-4 mb-8 bg-gray-50 p-4 rounded-lg border border-gray-100"
            >
              <h4 className="text-sm font-bold text-gray-700">Add New Admin</h4>

              <input
                type="text"
                placeholder="Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="input-field bg-white"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="password"
                  placeholder="Password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  className="input-field bg-white"
                />

                <input
                  type="password"
                  placeholder="Confirm"
                  value={newUserConfirmPassword}
                  onChange={(e) => setNewUserConfirmPassword(e.target.value)}
                  className="input-field bg-white"
                />
              </div>

              {userMgmtError && (
                <p className="text-red-500 text-sm">{userMgmtError}</p>
              )}

              {userMgmtSuccess && (
                <p className="text-green-500 text-sm">{userMgmtSuccess}</p>
              )}

              <button
                type="submit"
                className="w-full bg-saffron text-white py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors"
              >
                Add User
              </button>
            </form>

            {/* List Users */}

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-gray-500 uppercase">
                Existing Admins
              </h4>

              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center p-3 bg-white border rounded-lg hover:shadow-sm transition-shadow"
                >
                  <span className="font-medium text-gray-700">
                    {user.username}
                  </span>

                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex bg-[#F3F4F6] min-h-screen font-sans text-gray-800">
      <style>{`

        .input-field {

          width: 100%;

          padding: 0.75rem 1rem;

          border: 1px solid #E5E7EB;

          border-radius: 0.5rem;

          transition: all 0.2s;

          outline: none;

        }

        .input-field:focus {

          border-color: #FF9933;

          box-shadow: 0 0 0 2px rgba(255, 153, 51, 0.2);

        }

        .section-header {

          font-size: 0.85rem;

          font-weight: 700;

          text-transform: uppercase;

          color: #9CA3AF;

          border-bottom: 1px solid #E5E7EB;

          padding-bottom: 0.5rem;

          margin-bottom: 1rem;

        }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }

        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }

        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #D1D5DB; border-radius: 20px; }

      `}</style>

      {renderSidebar()}

      <div className="flex-1 ml-0 md:ml-64 p-4 md:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-6 md:mb-8 sticky top-0 bg-[#F3F4F6] z-20 py-2">
          <div className="flex items-center gap-3">
            {/* Hamburger Button (Mobile Only) */}

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>

            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
                {activeTab === 'settings'
                  ? 'Settings'
                  : activeTab.replace(/([A-Z])/g, ' $1').trim()}
              </h2>

              <p className="text-xs md:text-sm text-gray-500 hidden md:block">
                Manage your website content and team.
              </p>
            </div>
          </div>

          {activeTab !== 'settings' && (
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={handleAddNew}
                className="flex items-center gap-2 bg-gradient-to-r from-saffron to-orange-600 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all text-sm md:text-base"
              >
                <Plus size={18} />

                <span className="hidden md:inline">Add Record</span>

                <span className="md:hidden">Add</span>
              </button>
            </div>
          )}
        </header>

        {activeTab !== 'settings' && renderTable()}

        {activeTab === 'settings' && renderSettings()}

        {showModal && renderModal()}
      </div>
    </div>
  );
};

export default AdminDashboard;
