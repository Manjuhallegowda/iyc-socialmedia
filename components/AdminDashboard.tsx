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
  Target,
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

  // Generic Form State
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);
  const [selectedLeaderId, setSelectedLeaderId] = useState<string | null>(
    null
  ); // New state for leader selection

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

  // --- HANDLERS ---

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
        // Clear success/error after a short delay
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
      // For gallery, we can create a smaller thumbnail, but for now we use the same image
      const imageUrl = await uploadImageToR2(e.target.files[0]);
      setFormData({
        ...formData,
        [fieldName]: imageUrl,
        ...(activeTab === 'gallery' && { thumbnailUrl: imageUrl }), // Set thumbnail for gallery
      });
      setUploading(false);
    }
  };

  const handleAddNew = () => {
    setFormData({}); // Clear form data for new entry
    setSelectedLeaderId(null); // Clear selected leader
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
      setSelectedLeaderId(null); // Clear for non-leader-associated items
    } else if (activeTab === 'stateLeaders' && item.socialMedia) {
      const { socialMedia, activities, milestones, ...rest } = item;
      setFormData({
        ...rest,
        ...socialMedia,
        activities: (activities || []).map((a) => a.description).join(',\n'),
        milestones: (milestones || []).map((m) => m.description).join(',\n'),
      });
      setSelectedLeaderId(null); // Clear for non-leader-associated items
    } else if (activeTab === 'socialMediaTeam' && item.socialMedia) {
      const { socialMedia, ...rest } = item;
      setFormData({ ...rest, ...socialMedia });
    } else {
      setFormData(item);
      setSelectedLeaderId(null); // Clear for other items
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = !!formData.id;

    // Manual validation for image upload on new entries
    if (!isEditing && !formData.imageUrl) {
      // Find the active tab that requires an image
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
      const { twitter, facebook, instagram, activity, mailstone, ...rest } = formData;
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
      // New: Handle Executive Leaders
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
        .map((s) => s.trim())
        .filter((s) => s)
        .map((desc) => ({
          date: new Date().toISOString().split('T')[0],
          title: desc.substring(0, 50) + (desc.length > 50 ? '...' : ''),
          description: desc,
        }));

      const milestonesArray = (milestones || '')
        .split(/[,\n]/)
        .map((s) => s.trim())
        .filter((s) => s)
        .map((desc) => ({
          date: new Date().toISOString().split('T')[0],
          description: desc,
        }));

      const stateLeaderData: Partial<StateLeader> = {
        ...rest,
        socialMedia: {
          twitter: twitter || '',
          facebook: facebook || '',
          instagram: instagram || '',
          youtube: youtube || '',
        },
        activities: activitiesArray,
        milestones: milestonesArray,
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
        // For editing, include the ID and call updateNews
        const newsDataForUpdate: NewsItem = {
          id: formData.id, // ID must be present for update
          ...baseNewsData,
        };
        await updateNews(newsDataForUpdate);
      } else {
        // For adding, explicitly omit the ID and call addNews
        await addNews(baseNewsData); // The backend will generate the ID
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
    setSelectedLeaderId(null); // Clear selected leader after submit
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change logic
  };

  // --- RENDERERS ---

  const renderSidebar = () => (
    <div className="w-64 bg-white text-indiaGreen h-screen fixed left-0 top-0 flex flex-col shadow-2xl z-20">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="bg-saffron p-1 rounded">IYC</span> CRM
        </h1>
        <p className="text-xs text-gray-500 mt-1">Cloudflare D1/R2 Admin</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => setActiveTab('kpyccTeam')}
          className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
            activeTab === 'kpyccTeam'
              ? 'bg-saffron text-white'
              : 'hover:bg-gray-100 text-indiaGreen'
          }`}
        >
          <Users size={18} /> KPYCC Team
        </button>
        <button
          onClick={() => setActiveTab('executiveLeaders')}
          className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
            activeTab === 'executiveLeaders'
              ? 'bg-saffron text-white'
              : 'hover:bg-gray-100 text-indiaGreen'
          }`}
        >
          <Users size={18} /> Executive Leaders
        </button>
        <button
          onClick={() => setActiveTab('stateLeaders')}
          className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
            activeTab === 'stateLeaders'
              ? 'bg-saffron text-white'
              : 'hover:bg-gray-100 text-indiaGreen'
          }`}
        >
          <Users size={18} /> State Leaders
        </button>
        <button
          onClick={() => setActiveTab('socialMediaTeam')}
          className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
            activeTab === 'socialMediaTeam'
              ? 'bg-saffron text-white'
              : 'hover:bg-gray-100 text-indiaGreen'
          }`}
        >
          <Users size={18} /> SM Team
        </button>
        <button
          onClick={() => setActiveTab('legalTeam')}
          className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
            activeTab === 'legalTeam'
              ? 'bg-saffron text-white'
              : 'hover:bg-gray-100 text-indiaGreen'
          }`}
        >
          <Users size={18} /> Legal Team
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
            activeTab === 'news'
              ? 'bg-saffron text-white'
              : 'hover:bg-gray-100 text-indiaGreen'
          }`}
        >
          <Newspaper size={18} /> News
        </button>
        <button
          onClick={() => setActiveTab('activities')}
          className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
            activeTab === 'activities'
              ? 'bg-saffron text-white'
              : 'hover:bg-gray-100 text-indiaGreen'
          }`}
        >
          <Calendar size={18} /> Activities
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
            activeTab === 'videos'
              ? 'bg-saffron text-white'
              : 'hover:bg-gray-100 text-indiaGreen'
          }`}
        >
          <Video size={18} /> Videos
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
            activeTab === 'gallery'
              ? 'bg-saffron text-white'
              : 'hover:bg-gray-100 text-indiaGreen'
          }`}
        >
          <GalleryIcon size={18} /> Gallery
        </button>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
            activeTab === 'settings'
              ? 'bg-saffron text-white'
              : 'hover:bg-gray-100 text-indiaGreen'
          }`}
        >
          <Settings size={18} /> Settings
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-100 text-red-500 transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );

  const renderTable = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500">
              <tr>
                <th className="px-6 py-4">Image/Preview</th>
                <th className="px-6 py-4">Title / Name / Alt Text</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activeTab === 'kpyccTeam' &&
                kpyccTeam.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={item.imageUrl}
                        className="w-10 h-10 rounded-full object-cover"
                        alt=""
                      />
                    </td>
                    <td className="px-6 py-4 font-bold text-indiaGreen">
                      {item.name}
                    </td>
                    <td className="px-6 py-4">{item.designation}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-saffron hover:bg-orange-50 p-2 rounded mr-2"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteKpyccTeamMember(item.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              {activeTab === 'executiveLeaders' &&
                executiveLeaders.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={item.imageUrl}
                        className="w-10 h-10 rounded-full object-cover"
                        alt=""
                      />
                    </td>
                    <td className="px-6 py-4 font-bold text-indiaGreen">
                      {item.name}
                    </td>
                    <td className="px-6 py-4">{item.title}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-saffron hover:bg-orange-50 p-2 rounded mr-2"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteExecutiveLeader(item.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              {activeTab === 'stateLeaders' &&
                stateLeaders.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={item.imageUrl}
                        className="w-10 h-10 rounded-full object-cover"
                        alt=""
                      />
                    </td>
                    <td className="px-6 py-4 font-bold text-indiaGreen">
                      {item.name}
                    </td>
                    <td className="px-6 py-4">{item.designation}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-saffron hover:bg-orange-50 p-2 rounded mr-2"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteStateLeader(item.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              {activeTab === 'socialMediaTeam' &&
                socialMediaTeam.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={item.imageUrl}
                        className="w-10 h-10 rounded-full object-cover"
                        alt=""
                      />
                    </td>
                    <td className="px-6 py-4 font-bold text-indiaGreen">
                      {item.name}
                    </td>
                    <td className="px-6 py-4">{item.position}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-saffron hover:bg-orange-50 p-2 rounded mr-2"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteSocialMediaTeamMember(item.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              {activeTab === 'legalTeam' &&
                legalTeam.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={item.imageUrl}
                        className="w-10 h-10 rounded-full object-cover"
                        alt=""
                      />
                    </td>
                    <td className="px-6 py-4 font-bold text-indiaGreen">
                      {item.name}
                    </td>
                    <td className="px-6 py-4">{item.position}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-saffron hover:bg-orange-50 p-2 rounded mr-2"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteLegalTeamMember(item.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              {activeTab === 'news' &&
                news.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={item.imageUrl}
                        className="w-12 h-8 rounded object-cover"
                        alt=""
                      />
                    </td>
                    <td className="px-6 py-4 font-bold text-indiaGreen">
                      {item.title}
                    </td>
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-saffron hover:bg-orange-50 p-2 rounded mr-2"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteNews(item.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              {activeTab === 'activities' &&
                activities.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={item.imageUrl}
                        className="w-12 h-8 rounded object-cover"
                        alt=""
                      />
                    </td>
                    <td className="px-6 py-4 font-bold text-indiaGreen">
                      {item.title}
                    </td>
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-saffron hover:bg-orange-50 p-2 rounded mr-2"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteActivity(item.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              {activeTab === 'videos' &&
                videos.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="w-12 h-8 bg-gray-200 flex items-center justify-center rounded">
                        <Video size={16} />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-indiaGreen">
                      {item.title}
                    </td>
                    <td className="px-6 py-4">{item.videoId}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-saffron hover:bg-orange-50 p-2 rounded mr-2"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteVideo(item.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              {activeTab === 'gallery' &&
                galleryItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={item.thumbnailUrl || item.imageUrl}
                        className="w-12 h-8 rounded object-cover"
                        alt={item.alt}
                      />
                    </td>
                    <td className="px-6 py-4 font-bold text-indiaGreen">
                      {item.alt || 'No alt text'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
                        {item.tag || 'gallery'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-saffron hover:bg-orange-50 p-2 rounded mr-2"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteGalleryItem(item.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderSettings = () => {
    return (
      <div className="p-6 space-y-8">
        {/* Change Password Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-indiaGreen mb-4">
              Change Admin Password
            </h3>
            <form
              onSubmit={handlePasswordChangeSubmit}
              className="space-y-4 max-w-md"
            >
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron outline-none"
                  placeholder="Enter your current password"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron outline-none"
                  placeholder="Enter a strong new password"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron outline-none"
                  placeholder="Confirm your new password"
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm font-bold">{error}</p>
              )}
              {success && (
                <p className="text-indiaGreen text-sm font-bold">{success}</p>
              )}
              <button
                type="submit"
                className="w-full bg-saffron text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>

        {/* Manage Users Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-indiaGreen mb-4">
              Manage Admin Users
            </h3>

            {/* Add New User Form */}
            <form
              onSubmit={handleNewUserSubmit}
              className="space-y-4 max-w-md mb-8 p-4 border rounded-lg bg-gray-50"
            >
              <h4 className="text-lg font-bold text-gray-800">Add New User</h4>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron outline-none"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron outline-none"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={newUserConfirmPassword}
                  onChange={(e) => setNewUserConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron outline-none"
                  placeholder="Confirm password"
                />
              </div>
              {userMgmtError && (
                <p className="text-red-500 text-sm font-bold">
                  {userMgmtError}
                </p>
              )}
              {userMgmtSuccess && (
                <p className="text-indiaGreen text-sm font-bold">
                  {userMgmtSuccess}
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-indiaGreen text-white py-2 rounded-lg font-bold hover:bg-green-700 transition-colors"
              >
                Add User
              </button>
            </form>

            {/* Users List */}
            <h4 className="text-lg font-bold text-gray-800 mb-3">
              Existing Users
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500">
                  <tr>
                    <th className="px-6 py-3">Username</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-bold text-indiaGreen">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded"
                          title={`Delete ${user.username}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-indiaGreen uppercase">
            {formData.id ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}
          </h2>
          <button
            onClick={() => {
              setShowModal(false);
              setFormData({});
              setSelectedLeaderId(null);
            }}
          >
            <X className="text-gray-400 hover:text-red-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'executiveLeaders' && (
            <>
              <input
                required
                placeholder="Full Name"
                value={formData.name || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                required
                placeholder="Title (e.g., National President)"
                value={formData.title || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                value={formData.description || ''}
                className="w-full p-3 border rounded"
                rows={3}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <input
                placeholder="Twitter URL"
                value={formData.twitter || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, twitter: e.target.value })
                }
              />
              <input
                placeholder="Facebook URL"
                value={formData.facebook || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, facebook: e.target.value })
                }
              />
              <input
                placeholder="Instagram URL"
                value={formData.instagram || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, instagram: e.target.value })
                }
              />
              <input
                placeholder="YouTube URL"
                value={formData.youtube || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, youtube: e.target.value })
                }
              />

              <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center">
                <label className="cursor-pointer block">
                  <span className="text-saffron font-bold flex items-center justify-center gap-2">
                    <Upload size={16} /> Upload Photo (R2)
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
                  <p className="text-xs text-indiaGreen mt-2">
                    Image Uploaded!
                  </p>
                )}
              </div>
            </>
          )}

          {activeTab === 'stateLeaders' && (
            <>
              <input
                required
                placeholder="Full Name"
                value={formData.name || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                required
                placeholder="Designation"
                value={formData.designation || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
              />
              <input
                required
                placeholder="State"
                value={formData.state || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              />
              <textarea
                placeholder="Bio"
                value={formData.bio || ''}
                className="w-full p-3 border rounded"
                rows={3}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />

              <h3 className="text-lg font-bold mt-4">Activities</h3>
              <textarea
                placeholder="Enter activities, separated by commas or new lines"
                value={formData.activities || ''}
                className="w-full p-3 border rounded"
                rows={3}
                onChange={(e) =>
                  setFormData({ ...formData, activities: e.target.value })
                }
              />

              <h3 className="text-lg font-bold mt-4">Milestones</h3>
              <textarea
                placeholder="Enter milestones, separated by commas or new lines"
                value={formData.milestones || ''}
                className="w-full p-3 border rounded"
                rows={3}
                onChange={(e) =>
                  setFormData({ ...formData, milestones: e.target.value })
                }
              />

              <input
                placeholder="Twitter URL"
                value={formData.twitter || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, twitter: e.target.value })
                }
              />
              <input
                placeholder="Facebook URL"
                value={formData.facebook || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, facebook: e.target.value })
                }
              />
              <input
                placeholder="Instagram URL"
                value={formData.instagram || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, instagram: e.target.value })
                }
              />
              <input
                placeholder="YouTube URL"
                value={formData.youtube || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, youtube: e.target.value })
                }
              />

              <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center">
                <label className="cursor-pointer block">
                  <span className="text-saffron font-bold flex items-center justify-center gap-2">
                    <Upload size={16} /> Upload Photo (R2)
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
                  <p className="text-xs text-indiaGreen mt-2">
                    Image Uploaded!
                  </p>
                )}
              </div>
            </>
          )}

          {activeTab === 'kpyccTeam' && (
            <>
              <input
                required
                placeholder="Full Name"
                value={formData.name || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                required
                placeholder="Designation"
                value={formData.designation || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
              />
              <input
                required
                placeholder="District"
                value={formData.district || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
              />
              <input
                placeholder="Assembly"
                value={formData.assembly || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, assembly: e.target.value })
                }
              />
              <input
                placeholder="Block"
                value={formData.block || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, block: e.target.value })
                }
              />
              <input
                required
                type="number"
                placeholder="Start Year"
                value={formData.startYear || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, startYear: e.target.value })
                }
              />
              <textarea
                required
                placeholder="Bio"
                value={formData.bio || ''}
                className="w-full p-3 border rounded"
                rows={3}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
              <input
                required
                placeholder="Email"
                type="email"
                value={formData.email || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                required
                placeholder="Phone Number"
                type="tel"
                value={formData.phone || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <input
                placeholder="Twitter URL"
                value={formData.twitter || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, twitter: e.target.value })
                }
              />
              <input
                placeholder="Facebook URL"
                value={formData.facebook || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, facebook: e.target.value })
                }
              />
              <input
                placeholder="Instagram URL"
                value={formData.instagram || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, instagram: e.target.value })
                }
              />
              <textarea
                placeholder="Activities (comma-separated)"
                value={formData.activity || ''}
                className="w-full p-3 border rounded"
                rows={3}
                onChange={(e) =>
                  setFormData({ ...formData, activity: e.target.value })
                }
              />
              <textarea
                placeholder="Milestones (comma-separated)"
                value={formData.mailstone || ''}
                className="w-full p-3 border rounded"
                rows={3}
                onChange={(e) =>
                  setFormData({ ...formData, mailstone: e.target.value })
                }
              />

              <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center">
                <label className="cursor-pointer block">
                  <span className="text-saffron font-bold flex items-center justify-center gap-2">
                    <Upload size={16} /> Upload Photo (R2)
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
                  <p className="text-xs text-indiaGreen mt-2">
                    Image Uploaded!
                  </p>
                )}
              </div>
            </>
          )}

          {activeTab === 'news' && (
            <>
              <input
                required
                placeholder="Headline"
                value={formData.title || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <input
                type="date"
                value={formData.date || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
              <input
                required
                placeholder="News Article URL"
                value={formData.link || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
              />
              <textarea
                required
                placeholder="News Description"
                value={formData.description || ''}
                className="w-full p-3 border rounded"
                rows={3}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center">
                <label className="cursor-pointer block">
                  <span className="text-saffron font-bold flex items-center justify-center gap-2">
                    <Upload size={16} /> Upload News Image (R2)
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
                  <p className="text-xs text-indiaGreen mt-2">
                    Image Uploaded!
                  </p>
                )}
              </div>
            </>
          )}

          {activeTab === 'activities' && (
            <>
              <input
                required
                placeholder="Activity Title"
                value={formData.title || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <input
                required
                placeholder="Type (e.g. Protest, Campaign)"
                value={formData.type || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />
              <input
                type="date"
                value={formData.date || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
              <input
                required
                placeholder="Location"
                value={formData.location || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
              <textarea
                required
                placeholder="Description"
                value={formData.description || ''}
                className="w-full p-3 border rounded"
                rows={3}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center">
                <label className="cursor-pointer block">
                  <span className="text-saffron font-bold flex items-center justify-center gap-2">
                    <Upload size={16} /> Upload Activity Image (R2)
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
                  <p className="text-xs text-indiaGreen mt-2">
                    Image Uploaded!
                  </p>
                )}
              </div>
            </>
          )}

          {activeTab === 'videos' && (
            <>
              <input
                required
                placeholder="Video Title"
                value={formData.title || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <input
                required
                placeholder="YouTube Video ID (e.g. dQw4w9WgXcQ)"
                value={formData.videoId || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, videoId: e.target.value })
                }
              />
            </>
          )}

          {activeTab === 'gallery' && (
            <>
              <input
                placeholder="Alt text for image"
                value={formData.alt || ''}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, alt: e.target.value })
                }
              />
              <select
                value={formData.tag || 'gallery'}
                className="w-full p-3 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, tag: e.target.value })
                }
              >
                <option value="gallery">Standard Gallery</option>
                <option value="hero">Hero Section</option>
                <option value="about">About Section</option>
              </select>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center">
                <label className="cursor-pointer block">
                  <span className="text-saffron font-bold flex items-center justify-center gap-2">
                    <Upload size={16} /> Upload Image (R2)
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
                  <p className="text-xs text-indiaGreen mt-2">
                    Image Uploaded!
                  </p>
                )}
              </div>
            </>
          )}

          {activeTab === 'socialMediaTeam' && (
            <>
              <input
                required
                placeholder="Name"
                value={formData.name || ''}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 border rounded"
              />
              <input
                required
                placeholder="Position"
                value={formData.position || ''}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                className="w-full p-3 border rounded"
              />
              <select
                required
                value={formData.level || ''}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                className="w-full p-3 border rounded"
              >
                <option value="" disabled>
                  Select Level
                </option>
                <option value="District">District</option>
                <option value="Assembly">Assembly</option>
                <option value="Block">Block</option>
              </select>
              <input
                required
                placeholder="Name of Place"
                value={formData.placeName || ''}
                onChange={(e) =>
                  setFormData({ ...formData, placeName: e.target.value })
                }
                className="w-full p-3 border rounded"
              />
              <textarea
                placeholder="Bio"
                value={formData.bio || ''}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="w-full p-3 border rounded"
              />
              <input
                placeholder="Instagram URL"
                value={formData.instagram || ''}
                onChange={(e) =>
                  setFormData({ ...formData, instagram: e.target.value })
                }
                className="w-full p-3 border rounded"
              />
              <input
                placeholder="Twitter URL"
                value={formData.twitter || ''}
                onChange={(e) =>
                  setFormData({ ...formData, twitter: e.target.value })
                }
                className="w-full p-3 border rounded"
              />
              <input
                placeholder="Facebook URL"
                value={formData.facebook || ''}
                onChange={(e) =>
                  setFormData({ ...formData, facebook: e.target.value })
                }
                className="w-full p-3 border rounded"
              />
              <input
                placeholder="YouTube URL"
                value={formData.youtube || ''}
                onChange={(e) =>
                  setFormData({ ...formData, youtube: e.target.value })
                }
                className="w-full p-3 border rounded"
              />
              <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center">
                <label className="cursor-pointer block">
                  <span className="text-saffron font-bold flex items-center justify-center gap-2">
                    <Upload size={16} /> Upload Photo (R2)
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
                  <p className="text-xs text-indiaGreen mt-2">
                    Image Uploaded!
                  </p>
                )}
              </div>
            </>
          )}

          {activeTab === 'legalTeam' && (
            <>
              <input
                required
                placeholder="Name"
                value={formData.name || ''}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 border rounded"
              />
              <input
                required
                placeholder="Position"
                value={formData.position || ''}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                className="w-full p-3 border rounded"
              />
              <textarea
                placeholder="Bio"
                value={formData.bio || ''}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="w-full p-3 border rounded"
              />
              <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center">
                <label className="cursor-pointer block">
                  <span className="text-saffron font-bold flex items-center justify-center gap-2">
                    <Upload size={16} /> Upload Photo (R2)
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
                  <p className="text-xs text-indiaGreen mt-2">
                    Image Uploaded!
                  </p>
                )}
              </div>
            </>
          )}

          <button
            disabled={uploading}
            type="submit"
            className="w-full bg-saffron text-white font-bold py-3 rounded hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {uploading
              ? 'Uploading...'
              : formData.id
              ? 'Save Changes'
              : 'Create New'}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="flex bg-gray-100 min-h-screen font-sans">
      {renderSidebar()}
      <div className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-gray-500">Welcome back, Admin.</p>
          </div>
          {activeTab !== 'settings' && (
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 bg-saffron text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-orange-600 transition-colors"
            >
              <Plus size={20} /> Add New
            </button>
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
