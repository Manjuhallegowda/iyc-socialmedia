import * as React from 'react';
import {
  KpyccTeamMember,
  ExecutiveLeader,
  NewsItem,
  VideoItem,
  GalleryItem,
  User,
  StateLeader,
  SocialMediaTeamMember,
  LegalTeamMember,
  Activity,
  DistrictHierarchyData,
} from '../types';
import {
  apiKpyccTeam,
  apiExecutiveLeaders,
  apiNews,
  apiVideos,
  apiGalleryItems,
  apiUsers,
  apiStateLeaders,
  apiSocialMediaTeam,
  apiLegalTeam,
  apiActivities,
} from '../services/api';

interface DataContextType {
  kpyccTeam: KpyccTeamMember[];
  executiveLeaders: ExecutiveLeader[];
  stateLeaders: StateLeader[];
  news: NewsItem[];
  videos: VideoItem[];
  galleryItems: GalleryItem[];
  users: User[];
  socialMediaTeam: SocialMediaTeamMember[];
  legalTeam: LegalTeamMember[];
  activities: Activity[];
  loading: boolean;
  refreshData: () => Promise<void>;
  getDistrictHierarchyData: (district: string) => DistrictHierarchyData | null;
  // CRUD Actions
  addKpyccTeamMember: (member: KpyccTeamMember) => Promise<void>;
  updateKpyccTeamMember: (member: KpyccTeamMember) => Promise<void>;
  deleteKpyccTeamMember: (id: string) => Promise<void>;
  addExecutiveLeader: (leader: ExecutiveLeader) => Promise<void>;
  updateExecutiveLeader: (leader: ExecutiveLeader) => Promise<void>;
  deleteExecutiveLeader: (id: string) => Promise<void>;
  addStateLeader: (leader: StateLeader) => Promise<void>;
  updateStateLeader: (leader: StateLeader) => Promise<void>;
  deleteStateLeader: (id: string) => Promise<void>;
  addNews: (news: Omit<NewsItem, 'id'>) => Promise<void>;
  updateNews: (news: NewsItem) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  addVideo: (video: VideoItem) => Promise<void>;
  updateVideo: (video: VideoItem) => Promise<void>;
  deleteVideo: (id: string) => Promise<void>;
  addGalleryItem: (item: GalleryItem) => Promise<void>;
  updateGalleryItem: (item: GalleryItem) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  addUser: (user: { username: string; password: string }) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  addSocialMediaTeamMember: (
    member: Omit<SocialMediaTeamMember, 'id'>
  ) => Promise<void>;
  updateSocialMediaTeamMember: (member: SocialMediaTeamMember) => Promise<void>;
  deleteSocialMediaTeamMember: (id: string) => Promise<void>;
  addLegalTeamMember: (member: Omit<LegalTeamMember, 'id'>) => Promise<void>;
  updateLegalTeamMember: (member: LegalTeamMember) => Promise<void>;
  deleteLegalTeamMember: (id: string) => Promise<void>;
  addActivity: (activity: Omit<Activity, 'id'>) => Promise<void>;
  updateActivity: (activity: Activity) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
}

const DataContext = React.createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{
  children: React.ReactNode;
  isAuthenticated: boolean;
}> = ({ children, isAuthenticated }) => {
  const [kpyccTeam, setKpyccTeam] = React.useState<KpyccTeamMember[]>([]);
  const [executiveLeaders, setExecutiveLeaders] = React.useState<
    ExecutiveLeader[]
  >([]);
  const [stateLeaders, setStateLeaders] = React.useState<StateLeader[]>([]);
  const [news, setNews] = React.useState<NewsItem[]>([]);
  const [videos, setVideos] = React.useState<VideoItem[]>([]);
  const [galleryItems, setGalleryItems] = React.useState<GalleryItem[]>([]);
  const [users, setUsers] = React.useState<User[]>([]);
  const [socialMediaTeam, setSocialMediaTeam] = React.useState<
    SocialMediaTeamMember[]
  >([]);
  const [legalTeam, setLegalTeam] = React.useState<LegalTeamMember[]>([]);
  const [activities, setActivities] = React.useState<Activity[]>([]);
  const [loading, setLoading] = React.useState(true);

  const refreshData = async () => {
    setLoading(true);
    try {
      const publicDataPromises = [
        apiKpyccTeam.getAll(),
        apiExecutiveLeaders.getAll(),
        apiStateLeaders.getAll(),
        apiNews.getAll(),
        apiVideos.getAll(),
        apiGalleryItems.getAll(),
        apiSocialMediaTeam.getAll(),
        apiLegalTeam.getAll(),
        apiActivities.getAll(),
      ];

      const allPromises = isAuthenticated
        ? [...publicDataPromises, apiUsers.getAll()]
        : publicDataPromises;

      const results = await Promise.all(allPromises);

      const [kpycc, el, sl, n, v, g, smt, lt, ac] = results;
      setKpyccTeam(kpycc as KpyccTeamMember[]);
      setExecutiveLeaders(el as ExecutiveLeader[]);
      setStateLeaders(sl as StateLeader[]);
      setNews(n as NewsItem[]);
      setVideos(v as VideoItem[]);
      setGalleryItems(g as GalleryItem[]);
      setSocialMediaTeam(smt as SocialMediaTeamMember[]);
      setLegalTeam(lt as LegalTeamMember[]);
      setActivities(ac as Activity[]);

      if (isAuthenticated) {
        const u = results[results.length - 1];
        setUsers(u as User[]);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    refreshData();
  }, [isAuthenticated]);

  // Action Wrappers
  const addKpyccTeamMember = async (item: KpyccTeamMember) => {
    await apiKpyccTeam.create(item);
    await refreshData();
  };
  const updateKpyccTeamMember = async (item: KpyccTeamMember) => {
    await apiKpyccTeam.update(item);
    await refreshData();
  };
  const deleteKpyccTeamMember = async (id: string) => {
    await apiKpyccTeam.delete(id);
    await refreshData();
  };

  const addExecutiveLeader = async (item: ExecutiveLeader) => {
    await apiExecutiveLeaders.create(item);
    await refreshData();
  };
  const updateExecutiveLeader = async (item: ExecutiveLeader) => {
    await apiExecutiveLeaders.update(item);
    await refreshData();
  };
  const deleteExecutiveLeader = async (id: string) => {
    await apiExecutiveLeaders.delete(id);
    await refreshData();
  };

  const addStateLeader = async (item: StateLeader) => {
    await apiStateLeaders.create(item);
    await refreshData();
  };
  const updateStateLeader = async (item: StateLeader) => {
    await apiStateLeaders.update(item);
    await refreshData();
  };
  const deleteStateLeader = async (id: string) => {
    await apiStateLeaders.delete(id);
    await refreshData();
  };

  const addNews = async (item: Omit<NewsItem, 'id'>) => {
    await apiNews.create(item);
    await refreshData();
  };
  const updateNews = async (item: NewsItem) => {
    await apiNews.update(item);
    await refreshData();
  };
  const deleteNews = async (id: string) => {
    await apiNews.delete(id);
    await refreshData();
  };

  const addVideo = async (item: VideoItem) => {
    await apiVideos.create(item);
    await refreshData();
  };
  const updateVideo = async (item: VideoItem) => {
    await apiVideos.update(item);
    await refreshData();
  };
  const deleteVideo = async (id: string) => {
    await apiVideos.delete(id);
    await refreshData();
  };

  const addGalleryItem = async (item: GalleryItem) => {
    await apiGalleryItems.create(item);
    await refreshData();
  };
  const updateGalleryItem = async (item: GalleryItem) => {
    await apiGalleryItems.update(item);
    await refreshData();
  };
  const deleteGalleryItem = async (id: string) => {
    await apiGalleryItems.delete(id);
    await refreshData();
  };

  const addUser = async (user: { username: string; password: string }) => {
    await apiUsers.create(user);
    await refreshData();
  };

  const deleteUser = async (id: string) => {
    await apiUsers.delete(id);
    await refreshData();
  };

  const addSocialMediaTeamMember = async (
    member: Omit<SocialMediaTeamMember, 'id'>
  ) => {
    await apiSocialMediaTeam.create(member);
    await refreshData();
  };
  const updateSocialMediaTeamMember = async (member: SocialMediaTeamMember) => {
    await apiSocialMediaTeam.update(member);
    await refreshData();
  };
  const deleteSocialMediaTeamMember = async (id: string) => {
    await apiSocialMediaTeam.delete(id);
    await refreshData();
  };

  const addLegalTeamMember = async (member: Omit<LegalTeamMember, 'id'>) => {
    await apiLegalTeam.create(member);
    await refreshData();
  };
  const updateLegalTeamMember = async (member: LegalTeamMember) => {
    await apiLegalTeam.update(member);
    await refreshData();
  };
  const deleteLegalTeamMember = async (id: string) => {
    await apiLegalTeam.delete(id);
    await refreshData();
  };

  const addActivity = async (item: Omit<Activity, 'id'>) => {
    await apiActivities.create(item);
    await refreshData();
  };
  const updateActivity = async (item: Activity) => {
    await apiActivities.update(item);
    await refreshData();
  };
  const deleteActivity = async (id: string) => {
    await apiActivities.delete(id);
    await refreshData();
  };

  const getDistrictHierarchyData = (
    district: string
  ): DistrictHierarchyData | null => {
    if (!district) return null;

    const districtMembers = kpyccTeam.filter(
      (member) => member.district === district
    );
    const smTeamMembers = socialMediaTeam.filter(
      (member) => member.placeName === district
    );
    const legalTeamMembers = legalTeam.filter(
      (member) =>
        // Assuming legal team members might have district info in their position or bio
        member.bio?.includes(district) ||
        (member.position &&
          member.position.toLowerCase().includes(district.toLowerCase()))
    );

    const president = districtMembers.find(
      (member) =>
        member.designation &&
        member.designation.includes('District') &&
        member.level === 'District'
    );

    const assemblyMembers = districtMembers.filter(
      (member) =>
        member.level === 'Assembly' ||
        (member.designation && member.designation.includes('Assembly'))
    );

    const blockMembers = districtMembers.filter(
      (member) =>
        member.level === 'Block' ||
        (member.designation && member.designation.includes('Block'))
    );

    const counts = {
      district: president ? 1 : 0,
      assembly: assemblyMembers.length,
      block: blockMembers.length,
      smTeam: smTeamMembers.length,
      legalTeam: legalTeamMembers.length,
      totalActive:
        districtMembers.length + smTeamMembers.length + legalTeamMembers.length,
    };

    // Calculate statistics (mock implementation - would need real age/gender data)
    const statistics = {
      maleMembers: Math.floor(counts.totalActive * 0.6), // Mock data
      femaleMembers: Math.floor(counts.totalActive * 0.4), // Mock data
      youngLeaders: Math.floor(counts.totalActive * 0.3), // Mock data
    };

    return {
      district,
      president,
      assemblyMembers,
      blockMembers,
      smTeamMembers,
      legalTeamMembers,
      counts,
      statistics,
    };
  };

  return (
    <DataContext.Provider
      value={{
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
        loading,
        refreshData,
        getDistrictHierarchyData,
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
