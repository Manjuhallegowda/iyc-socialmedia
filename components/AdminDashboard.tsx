
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { uploadImageToR2, apiChangePassword } from '../services/api';
import { Leader, NewsItem, Activity, VideoItem, GalleryItem, User } from '../types';
import { Trash2, Plus, LogOut, Users, Newspaper, Calendar, Video, Upload, X, Edit, Image as GalleryIcon, Settings } from 'lucide-react';

const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { 
    leaders, executiveLeaders, news, activities, videos, galleryItems, users, // Added executiveLeaders
    addLeader, updateLeader, deleteLeader, 
    addExecutiveLeader, updateExecutiveLeader, deleteExecutiveLeader, // Added executive leader CRUD
    addNews, updateNews, deleteNews, 
    addActivity, updateActivity, deleteActivity, 
    addVideo, updateVideo, deleteVideo,
    addGalleryItem, updateGalleryItem, deleteGalleryItem,
    addUser, deleteUser // Added user management actions
  } = useData();
  const [activeTab, setActiveTab] = useState<'leaders' | 'executiveLeaders' | 'news' | 'activities' | 'videos' | 'gallery' | 'settings'>('leaders');
  const [showModal, setShowModal] = useState(false);
  
  // Generic Form State
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);

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
        setError("New passwords do not match.");
        return;
    }
    if (!currentPassword || !newPassword) {
        setError("All fields are required.");
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      // For gallery, we can create a smaller thumbnail, but for now we use the same image
      const imageUrl = await uploadImageToR2(e.target.files[0]);
      setFormData({ 
        ...formData, 
        [fieldName]: imageUrl,
        ...(activeTab === 'gallery' && { thumbnailUrl: imageUrl }) // Set thumbnail for gallery
      });
      setUploading(false);
    }
  };
  
  const handleAddNew = () => {
    setFormData({}); // Clear form data for new entry
    setShowModal(true);
  };
  
  const handleEdit = (item: any) => {
    if (activeTab === 'leaders' && item.social) {
      const { social, ...rest } = item;
      setFormData({ ...rest, ...social });
    } else {
      setFormData(item);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = !!formData.id;

    if (activeTab === 'leaders') {
      const { twitter, facebook, instagram, ...rest } = formData;
      const leaderData: Partial<Leader> = {
        ...rest,
        age: Number(formData.age) || 0,
        startYear: Number(formData.startYear) || 0,
        social: {
          twitter: twitter || '',
          facebook: facebook || '',
          instagram: instagram || '',
        }
      };
      if(isEditing) await updateLeader(leaderData as Leader); else await addLeader(leaderData as Leader);
    } else if (activeTab === 'executiveLeaders') { // New: Handle Executive Leaders
      const { twitter, facebook, instagram, youtube, ...rest } = formData;
      const executiveLeaderData: Partial<ExecutiveLeader> = {
        ...rest,
        socialMedia: {
          twitter: twitter || '',
          facebook: facebook || '',
          instagram: instagram || '',
          youtube: youtube || '',
        }
      };
      if(isEditing) await updateExecutiveLeader(executiveLeaderData as ExecutiveLeader); else await addExecutiveLeader(executiveLeaderData as ExecutiveLeader);
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
      if(isEditing) await updateActivity(formData as Activity); else await addActivity(formData as Activity);
    } else if (activeTab === 'videos') {
      const videoData = { ...formData, date: formData.date || new Date().toISOString().split('T')[0] } as VideoItem;
      if(isEditing) await updateVideo(videoData); else await addVideo(videoData);
    } else if (activeTab === 'gallery') {
      if(isEditing) await updateGalleryItem(formData as GalleryItem); else await addGalleryItem(formData as GalleryItem);
    }
    setShowModal(false);
    setFormData({});
  };
  
  const handleChangePassword = async (e: React.FormEvent) => {
      e.preventDefault();
      // Handle password change logic
  };

  // --- RENDERERS ---

  const renderSidebar = () => (
    <div className="w-64 bg-navyBlue text-white h-screen fixed left-0 top-0 flex flex-col shadow-2xl z-20">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold flex items-center gap-2">
            <span className="bg-skyBlue p-1 rounded">IYC</span> CRM
        </h1>
        <p className="text-xs text-gray-400 mt-1">Cloudflare D1/R2 Admin</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <button onClick={() => setActiveTab('leaders')} className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'leaders' ? 'bg-skyBlue text-white' : 'hover:bg-white/10 text-gray-300'}`}>
          <Users size={18} /> Leaders
        </button>
        <button onClick={() => setActiveTab('executiveLeaders')} className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'executiveLeaders' ? 'bg-skyBlue text-white' : 'hover:bg-white/10 text-gray-300'}`}>
          <Users size={18} /> Executive Leaders
        </button>
        <button onClick={() => setActiveTab('news')} className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'news' ? 'bg-skyBlue text-white' : 'hover:bg-white/10 text-gray-300'}`}>
          <Newspaper size={18} /> News
        </button>
        <button onClick={() => setActiveTab('activities')} className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'activities' ? 'bg-skyBlue text-white' : 'hover:bg-white/10 text-gray-300'}`}>
          <Calendar size={18} /> Campaigns
        </button>
        <button onClick={() => setActiveTab('videos')} className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'videos' ? 'bg-skyBlue text-white' : 'hover:bg-white/10 text-gray-300'}`}>
          <Video size={18} /> Videos
        </button>
        <button onClick={() => setActiveTab('gallery')} className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'gallery' ? 'bg-skyBlue text-white' : 'hover:bg-white/10 text-gray-300'}`}>
          <GalleryIcon size={18} /> Gallery
        </button>
      </nav>
      <div className="p-4 border-t border-white/10">
        <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-skyBlue text-white' : 'hover:bg-white/10 text-gray-300'}`}>
          <Settings size={18} /> Settings
        </button>
        <button onClick={onLogout} className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-600/20 text-red-300 transition-colors">
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
              {activeTab === 'leaders' && leaders.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><img src={item.imageUrl} className="w-10 h-10 rounded-full object-cover" alt="" /></td>
                  <td className="px-6 py-4 font-bold text-navyBlue">{item.name}</td>
                  <td className="px-6 py-4">{item.position}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(item)} className="text-skyBlue hover:bg-sky-50 p-2 rounded mr-2"><Edit size={16} /></button>
                    <button onClick={() => deleteLeader(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {activeTab === 'executiveLeaders' && executiveLeaders.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><img src={item.imageUrl} className="w-10 h-10 rounded-full object-cover" alt="" /></td>
                  <td className="px-6 py-4 font-bold text-navyBlue">{item.name}</td>
                  <td className="px-6 py-4">{item.title}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(item)} className="text-skyBlue hover:bg-sky-50 p-2 rounded mr-2"><Edit size={16} /></button>
                    <button onClick={() => deleteExecutiveLeader(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {activeTab === 'news' && news.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><img src={item.imageUrl} className="w-12 h-8 rounded object-cover" alt="" /></td>
                  <td className="px-6 py-4 font-bold text-navyBlue">{item.title}</td>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(item)} className="text-skyBlue hover:bg-sky-50 p-2 rounded mr-2"><Edit size={16} /></button>
                    <button onClick={() => deleteNews(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {activeTab === 'activities' && activities.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><img src={item.imageUrl} className="w-12 h-8 rounded object-cover" alt="" /></td>
                  <td className="px-6 py-4 font-bold text-navyBlue">{item.title}</td>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(item)} className="text-skyBlue hover:bg-sky-50 p-2 rounded mr-2"><Edit size={16} /></button>
                    <button onClick={() => deleteActivity(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {activeTab === 'videos' && videos.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                   <td className="px-6 py-4"><div className="w-12 h-8 bg-gray-200 flex items-center justify-center rounded"><Video size={16} /></div></td>
                  <td className="px-6 py-4 font-bold text-navyBlue">{item.title}</td>
                  <td className="px-6 py-4">{item.youtubeId}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(item)} className="text-skyBlue hover:bg-sky-50 p-2 rounded mr-2"><Edit size={16} /></button>
                    <button onClick={() => deleteVideo(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {activeTab === 'gallery' && galleryItems.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><img src={item.thumbnailUrl || item.imageUrl} className="w-12 h-8 rounded object-cover" alt={item.alt} /></td>
                  <td className="px-6 py-4 font-bold text-navyBlue">{item.alt || 'No alt text'}</td>
                  <td className="px-6 py-4"><span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">{item.tag || 'gallery'}</span></td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(item)} className="text-skyBlue hover:bg-sky-50 p-2 rounded mr-2"><Edit size={16} /></button>
                    <button onClick={() => deleteGalleryItem(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={16} /></button>
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
                    <h3 className="text-xl font-bold text-navyBlue mb-4">Change Admin Password</h3>
                    <form onSubmit={handlePasswordChangeSubmit} className="space-y-4 max-w-md">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Current Password</label>
                            <input 
                              type="password" 
                              value={currentPassword}
                              onChange={e => setCurrentPassword(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-skyBlue outline-none"
                              placeholder="Enter your current password"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">New Password</label>
                            <input 
                              type="password" 
                              value={newPassword}
                              onChange={e => setNewPassword(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-skyBlue outline-none"
                              placeholder="Enter a strong new password"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Confirm New Password</label>
                            <input 
                              type="password" 
                              value={confirmPassword}
                              onChange={e => setConfirmPassword(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-skyBlue outline-none"
                              placeholder="Confirm your new password"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
                        {success && <p className="text-green-600 text-sm font-bold">{success}</p>}
                        <button 
                          type="submit" 
                          className="w-full bg-navyBlue text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition-colors"
                        >
                          Update Password
                        </button>
                    </form>
                </div>
            </div>

            {/* Manage Users Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                    <h3 className="text-xl font-bold text-navyBlue mb-4">Manage Admin Users</h3>
                    
                    {/* Add New User Form */}
                    <form onSubmit={handleNewUserSubmit} className="space-y-4 max-w-md mb-8 p-4 border rounded-lg bg-gray-50">
                        <h4 className="text-lg font-bold text-gray-800">Add New User</h4>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Username</label>
                            <input 
                              type="text" 
                              value={newUsername}
                              onChange={e => setNewUsername(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-skyBlue outline-none"
                              placeholder="Enter username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                            <input 
                              type="password" 
                              value={newUserPassword}
                              onChange={e => setNewUserPassword(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-skyBlue outline-none"
                              placeholder="Enter password"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Confirm Password</label>
                            <input 
                              type="password" 
                              value={newUserConfirmPassword}
                              onChange={e => setNewUserConfirmPassword(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-skyBlue outline-none"
                              placeholder="Confirm password"
                            />
                        </div>
                        {userMgmtError && <p className="text-red-500 text-sm font-bold">{userMgmtError}</p>}
                        {userMgmtSuccess && <p className="text-green-600 text-sm font-bold">{userMgmtSuccess}</p>}
                        <button 
                          type="submit" 
                          className="w-full bg-skyBlue text-white py-2 rounded-lg font-bold hover:bg-sky-600 transition-colors"
                        >
                          Add User
                        </button>
                    </form>

                    {/* Users List */}
                    <h4 className="text-lg font-bold text-gray-800 mb-3">Existing Users</h4>
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
                                        <td className="px-6 py-4 font-bold text-navyBlue">{user.username}</td>
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
          <h2 className="text-xl font-bold text-navyBlue uppercase">{formData.id ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}</h2>
          <button onClick={() => {setShowModal(false); setFormData({});}}><X className="text-gray-400 hover:text-red-500" /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {activeTab === 'executiveLeaders' && (
            <>
              <input required placeholder="Full Name" value={formData.name || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, name: e.target.value})} />
              <input required placeholder="Title (e.g., National President)" value={formData.title || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, title: e.target.value})} />
              <textarea placeholder="Description" value={formData.description || ''} className="w-full p-3 border rounded" rows={3} onChange={e => setFormData({...formData, description: e.target.value})} />
              <input placeholder="Twitter URL" value={formData.twitter || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, twitter: e.target.value})} />
              <input placeholder="Facebook URL" value={formData.facebook || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, facebook: e.target.value})} />
              <input placeholder="Instagram URL" value={formData.instagram || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, instagram: e.target.value})} />
              <input placeholder="YouTube URL" value={formData.youtube || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, youtube: e.target.value})} />
              
              <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center">
                 <label className="cursor-pointer block">
                    <span className="text-skyBlue font-bold flex items-center justify-center gap-2"><Upload size={16} /> Upload Photo (R2)</span>
                    <input type="file" className="hidden" onChange={e => handleImageUpload(e, 'imageUrl')} />
                 </label>
                 {uploading && <p className="text-xs text-gray-500 mt-2">Uploading...</p>}
                 {formData.imageUrl && !uploading && <p className="text-xs text-green-600 mt-2">Image Uploaded!</p>}
              </div>
            </>
          )}

          {activeTab === 'leaders' && (
            <>
              <input required placeholder="Full Name" value={formData.name || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, name: e.target.value})} />
              <select required value={formData.designation || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, designation: e.target.value})}>
                <option value="" disabled>Select Designation</option>
                <option value="State SM Chair">State SM Chair</option>
                <option value="District SM Coordinator">District SM Coordinator</option>
                <option value="Assembly SM Coordinator">Assembly SM Coordinator</option>
              </select>
              <textarea placeholder="Bio" value={formData.bio || ''} className="w-full p-3 border rounded" rows={3} onChange={e => setFormData({...formData, bio: e.target.value})} />
              <input placeholder="Education" value={formData.education || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, education: e.target.value})} />
              <input placeholder="Email" type="email" value={formData.email || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, email: e.target.value})} />
              <input placeholder="Phone Number" type="tel" value={formData.phone || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, phone: e.target.value})} />
              <input placeholder="Twitter URL" value={formData.twitter || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, twitter: e.target.value})} />
              <input placeholder="Facebook URL" value={formData.facebook || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, facebook: e.target.value})} />
              <input placeholder="Instagram URL" value={formData.instagram || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, instagram: e.target.value})} />
              
              <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center">
                 <label className="cursor-pointer block">
                    <span className="text-skyBlue font-bold flex items-center justify-center gap-2"><Upload size={16} /> Upload Photo (R2)</span>
                    <input type="file" className="hidden" onChange={e => handleImageUpload(e, 'imageUrl')} />
                 </label>
                 {uploading && <p className="text-xs text-gray-500 mt-2">Uploading...</p>}
                 {formData.imageUrl && !uploading && <p className="text-xs text-green-600 mt-2">Image Uploaded!</p>}
              </div>
            </>
          )}

          {activeTab === 'news' && (
            <>
              <input required placeholder="Headline" value={formData.title || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, title: e.target.value})} />
              <input type="date" value={formData.date || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, date: e.target.value})} />
              <input required placeholder="News Article URL" value={formData.link || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, link: e.target.value})} />
              <textarea required placeholder="News Description" value={formData.description || ''} className="w-full p-3 border rounded" rows={3} onChange={e => setFormData({...formData, description: e.target.value})} />
              <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center">
                 <label className="cursor-pointer block">
                    <span className="text-skyBlue font-bold flex items-center justify-center gap-2"><Upload size={16} /> Upload News Image (R2)</span>
                    <input type="file" className="hidden" onChange={e => handleImageUpload(e, 'imageUrl')} />
                 </label>
                 {uploading && <p className="text-xs text-gray-500 mt-2">Uploading...</p>}
                 {formData.imageUrl && !uploading && <p className="text-xs text-green-600 mt-2">Image Uploaded!</p>}
              </div>
            </>
          )}

          {activeTab === 'videos' && (
            <>
               <input required placeholder="Video Title" value={formData.title || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, title: e.target.value})} />
               <input required placeholder="YouTube Video ID (e.g. dQw4w9WgXcQ)" value={formData.videoId || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, videoId: e.target.value})} />
            </>
          )}

          {activeTab === 'activities' && (
             <>
               <input required placeholder="Activity Title" value={formData.title || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, title: e.target.value})} />
               <input required type="date" value={formData.date || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, date: e.target.value})} />
                <select required value={formData.type || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="" disabled>Select Type</option>
                    <option value="Campaign">Campaign</option>
                    <option value="Protest">Protest</option>
                    <option value="Social Media Campaign">Social Media Campaign</option>
                    <option value="Event">Event</option>
                </select>
               <textarea required placeholder="Description" value={formData.description || ''} className="w-full p-3 border rounded" rows={3} onChange={e => setFormData({...formData, description: e.target.value})} />
                <input placeholder="Location" value={formData.location || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, location: e.target.value})} />
                <textarea placeholder="Full Description" value={formData.fullDescription || ''} className="w-full p-3 border rounded" rows={5} onChange={e => setFormData({...formData, fullDescription: e.target.value})} />
               <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center">
                 <label className="cursor-pointer block">
                    <span className="text-skyBlue font-bold flex items-center justify-center gap-2"><Upload size={16} /> Upload Banner (R2)</span>
                    <input type="file" required={!formData.id} className="hidden" onChange={e => handleImageUpload(e, 'imageUrl')} />
                 </label>
                 {uploading && <p className="text-xs text-gray-500 mt-2">Uploading...</p>}
                 {formData.imageUrl && !uploading && <p className="text-xs text-green-600 mt-2">Image Uploaded!</p>}
              </div>
             </>
          )}

          {activeTab === 'gallery' && (
             <>
               <input placeholder="Alt text for image" value={formData.alt || ''} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, alt: e.target.value})} />
               <select value={formData.tag || 'gallery'} className="w-full p-3 border rounded" onChange={e => setFormData({...formData, tag: e.target.value})}>
                 <option value="gallery">Standard Gallery</option>
                 <option value="hero">Hero Section</option>
                 <option value="about">About Section</option>
               </select>
               <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center">
                 <label className="cursor-pointer block">
                    <span className="text-skyBlue font-bold flex items-center justify-center gap-2"><Upload size={16} /> Upload Image (R2)</span>
                    <input type="file" required={!formData.id} className="hidden" onChange={e => handleImageUpload(e, 'imageUrl')} />
                 </label>
                 {uploading && <p className="text-xs text-gray-500 mt-2">Uploading...</p>}
                 {formData.imageUrl && !uploading && <p className="text-xs text-green-600 mt-2">Image Uploaded!</p>}
              </div>
             </>
          )}

          <button disabled={uploading} type="submit" className="w-full bg-navyBlue text-white font-bold py-3 rounded hover:bg-blue-900 transition-colors disabled:opacity-50">
            {uploading ? 'Uploading...' : (formData.id ? 'Save Changes' : 'Create New')}
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
          {activeTab !== 'settings' && <button onClick={handleAddNew} className="flex items-center gap-2 bg-skyBlue text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-sky-600 transition-colors">
            <Plus size={20} /> Add New
          </button>}
        </header>

        {activeTab !== 'settings' && renderTable()}
        {activeTab === 'settings' && renderSettings()}
        {showModal && renderModal()}
      </div>
    </div>
  );
};

export default AdminDashboard;
