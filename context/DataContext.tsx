import * as React from 'react';
import {
  Leader,
  ExecutiveLeader,
  NewsItem,
  Activity,
  VideoItem,
  GalleryItem,
  User,
} from '../types';
import {
  apiLeaders,
  apiExecutiveLeaders,
  apiNews,
  apiActivities,
  apiVideos,
  apiGalleryItems,
  apiUsers,
} from '../services/api';

interface DataContextType {
  leaders: Leader[];
  executiveLeaders: ExecutiveLeader[]; // New: Executive Leaders
  news: NewsItem[];
  activities: Activity[];
  videos: VideoItem[];
  galleryItems: GalleryItem[];
  users: User[]; // Added for user management
  loading: boolean;
  refreshData: () => Promise<void>;
  // CRUD Actions
  addLeader: (leader: Leader) => Promise<void>;
  updateLeader: (leader: Leader) => Promise<void>;
  deleteLeader: (id: string) => Promise<void>;
  // New: CRUD Actions for Executive Leaders
  addExecutiveLeader: (leader: ExecutiveLeader) => Promise<void>;
  updateExecutiveLeader: (leader: ExecutiveLeader) => Promise<void>;
  deleteExecutiveLeader: (id: string) => Promise<void>;
  addNews: (news: Omit<NewsItem, 'id'>) => Promise<void>;
  updateNews: (news: NewsItem) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  addActivity: (activity: Activity) => Promise<void>;
  updateActivity: (activity: Activity) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
  addVideo: (video: VideoItem) => Promise<void>;
  updateVideo: (video: VideoItem) => Promise<void>;
  deleteVideo: (id: string) => Promise<void>;
  addGalleryItem: (item: GalleryItem) => Promise<void>;
  updateGalleryItem: (item: GalleryItem) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  addUser: (user: { username: string; password: string }) => Promise<void>; // Added for user management
  deleteUser: (id: string) => Promise<void>; // Added for user management
}

const DataContext = React.createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{
  children: React.ReactNode;
  isAuthenticated: boolean;
}> = ({ children, isAuthenticated }) => {
  const [leaders, setLeaders] = React.useState<Leader[]>([]);
  const [executiveLeaders, setExecutiveLeaders] = React.useState<
    ExecutiveLeader[]
  >([]); // New: Executive Leaders state
  const [news, setNews] = React.useState<NewsItem[]>([]);
  const [activities, setActivities] = React.useState<Activity[]>([]);
  const [videos, setVideos] = React.useState<VideoItem[]>([]);
  const [galleryItems, setGalleryItems] = React.useState<GalleryItem[]>([]);
  const [users, setUsers] = React.useState<User[]>([]); // Added for user management
  const [loading, setLoading] = React.useState(true);

  const refreshData = async () => {
    setLoading(true);
    try {
      const publicDataPromises = [
        apiLeaders.getAll(),
        apiExecutiveLeaders.getAll(),
        apiNews.getAll(),
        apiActivities.getAll(),
        apiVideos.getAll(),
        apiGalleryItems.getAll(),
      ];

      const allPromises = isAuthenticated
        ? [...publicDataPromises, apiUsers.getAll()]
        : publicDataPromises;

      const results = await Promise.all(allPromises);

      const [l, el, n, a, v, g] = results;
      setLeaders(l as Leader[]);
      setExecutiveLeaders(el as ExecutiveLeader[]);
      setNews(n as NewsItem[]);
      setActivities(a as Activity[]);
      setVideos(v as VideoItem[]);
      setGalleryItems(g as GalleryItem[]);

      if (isAuthenticated) {
        const u = results[results.length - 1];
        setUsers(u as User[]);
      } else {
        setUsers([]); // Clear users if not authenticated
      }
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    refreshData();
  }, [isAuthenticated]); // Re-run on auth change

  // Action Wrappers
  const addLeader = async (item: Leader) => {
    await apiLeaders.create(item);
    await refreshData();
  };
  const updateLeader = async (item: Leader) => {
    await apiLeaders.update(item);
    await refreshData();
  };
  const deleteLeader = async (id: string) => {
    await apiLeaders.delete(id);
    await refreshData();
  };

  // New: Action Wrappers for Executive Leaders
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

  const addActivity = async (item: Activity) => {
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

  // User management actions
  const addUser = async (user: { username: string; password: string }) => {
    await apiUsers.create(user);
    await refreshData();
  };

  const deleteUser = async (id: string) => {
    await apiUsers.delete(id);
    await refreshData();
  };

  return (
    <DataContext.Provider
      value={{
        leaders,
        executiveLeaders,
        news,
        activities,
        videos,
        galleryItems,
        users,
        loading,
        refreshData, // Added executiveLeaders
        addLeader,
        updateLeader,
        deleteLeader,
        addExecutiveLeader,
        updateExecutiveLeader,
        deleteExecutiveLeader, // New: Executive Leader CRUD actions
        addNews,
        updateNews,
        deleteNews,
        addActivity,
        updateActivity,
        deleteActivity,
        addVideo,
        updateVideo,
        deleteVideo,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addUser,
        deleteUser, // Added user management actions
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
