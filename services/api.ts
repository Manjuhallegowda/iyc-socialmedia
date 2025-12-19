// services/api.ts

/**
 * SERVICE LAYER: Cloudflare Worker
 *
 * These functions connect to the deployed Cloudflare Worker API.
 * You must deploy the worker in the `/worker` directory and set the correct URL below.
 */

import { KpyccTeamMember, NewsItem, Activity, VideoItem, GalleryItem, ExecutiveLeader, User, StateLeader, SocialMediaTeamMember, LegalTeamMember } from '../types';

// --- CONFIGURATION ---

// IMPORTANT: Replace this with your actual deployed worker URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://iyc-portfolio-api.iyc-portfolio.workers.dev';

// A public URL for displaying images, pointing to your R2 bucket.
// You might need to set up a custom domain for this in production.
// For now, this assumes the worker will proxy image requests or that you have a public R2 URL.
const R2_PUBLIC_URL = 
  import.meta.env.VITE_R2_PUBLIC_URL || 'https://pub-4205e061fe1346a58daa8bd774b51f10.r2.dev';

// --- HELPERS ---

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      // Redirect to the login page to force re-authentication.
      if (typeof window !== 'undefined') {
        window.location.href = '/admin';
      }
    }
    const error = await response
      .json()
      .catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(
      error.message || `API request failed with status ${response.status}`
    );
  }
  // For 204 No Content, return a specific success indicator
  if (response.status === 204) {
    return { success: true } as any;
  }
  return response.json();
};

const apiFetch = async <T>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = localStorage.getItem('authToken');

  const headers: Record<string, string> = {
    ...options.headers,
  };

  if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
  return handleResponse<T>(response);
};

// --- R2 IMAGE STORAGE ---

export const uploadImageToR2 = async (file: File): Promise<string> => {
  // 1. Create a FormData object and append the file
  const formData = new FormData();
  formData.append('file', file);

  // 2. Upload the file directly to our worker's /upload endpoint
  const { publicUrl } = await apiFetch<{ publicUrl: string }>('/upload', {
    method: 'POST',
    body: formData,
    // Note: Do NOT set Content-Type header when using FormData with fetch,
    // the browser will automatically set it with the correct boundary.
    headers: {
      // 'Content-Type': 'multipart/form-data' // This is set automatically by the browser
    },
  });

  // 3. Return the full public URL for the uploaded image
  return `${R2_PUBLIC_URL}${publicUrl}`;
};

// --- AUTHENTICATION ---

export const apiLogin = async (username, password) => {
  const response = await apiFetch<{ token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  if (response.token) {
    localStorage.setItem('authToken', response.token);
  }
  return response;
};

export const apiChangePassword = async (currentPassword, newPassword) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Not authenticated');
  }
  // Basic JWT decoding to get the user ID (sub)
  let userId;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    userId = payload.sub;
  } catch (e) {
    throw new Error('Invalid auth token');
  }

  return await apiFetch('/auth/change-password', {
    method: 'POST',
    body: JSON.stringify({ userId, currentPassword, newPassword }),
  });
};

// --- GENERIC CRUD FACTORY ---

type ApiCrud<T> = {
  getAll: () => Promise<T[]>;
  create: (item: Omit<T, 'id'>) => Promise<T>;
  update: (item: T) => Promise<T>;
  delete: (id: string) => Promise<{ success: boolean }>;
};

const createApiCrud = <T extends { id: string }>(
  resource: string
): ApiCrud<T> => ({
  getAll: () => apiFetch<T[]>(`/${resource}`),
  create: (item) =>
    apiFetch<T>(`/${resource}`, { method: 'POST', body: JSON.stringify(item) }),
  update: (item) =>
    apiFetch<T>(`/${resource}/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
    }),
  delete: (id) =>
    apiFetch<{ success: boolean }>(`/${resource}/${id}`, { method: 'DELETE' }),
});

// --- API ENDPOINTS ---



const createApiCrudForUsers = <T extends { id: string }>(
  resource: string
): Omit<ApiCrud<T>, 'update'> & { create: (item: Omit<T, 'id'> & { password: string }) => Promise<T> } => ({
  getAll: () => apiFetch<T[]>(`/${resource}`),
  create: (item) =>
    apiFetch<T>(`/${resource}`, { method: 'POST', body: JSON.stringify(item) }),
  delete: (id) =>
    apiFetch<{ success: boolean }>(`/${resource}/${id}`, { method: 'DELETE' }),
});

export const apiKpyccTeam = createApiCrud<KpyccTeamMember>('kpycc_team');
export const apiExecutiveLeaders = createApiCrud<ExecutiveLeader>('executive_leaders');
export const apiNews = createApiCrud<NewsItem>('news');
export const apiActivities = createApiCrud<Activity>('activities');
export const apiVideos = createApiCrud<VideoItem>('videos');
export const apiGalleryItems = createApiCrud<GalleryItem>('gallery_items');
export const apiUsers = createApiCrudForUsers<User>('users');
export const apiStateLeaders = createApiCrud<StateLeader>('state_leaders');
export const apiSocialMediaTeam = createApiCrud<SocialMediaTeamMember>('social_media_team');
export const apiLegalTeam = createApiCrud<LegalTeamMember>('legal_team');

