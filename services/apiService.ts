import { User, Meal, Payment, Complaint, Announcement, CookDashboardData, FullTenant, OccupancyStats, FinancialStats } from '../types';

// --- REAL API CLIENT ---

// Assume the Django backend is running on the same host or configured with a proxy.
const API_BASE_URL = '/api'; // Adjust if your Django API is on a different domain

// Helper function to handle API requests and responses
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('authToken');
  const headers = new Headers(options.headers || {});
  headers.append('Content-Type', 'application/json');

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || JSON.stringify(errorData);
    } catch (e) {
        // Response was not JSON, use the default message
    }
    throw new Error(errorMessage);
  }

  // For DELETE requests or other responses that might not have a body
  if (response.status === 204) {
      return null as T;
  }

  return response.json();
}


// --- API FUNCTIONS ---

interface LoginResponse {
    access: string;
    refresh: string;
    user: User;
}

export const login = async (username: string, password: string): Promise<{user: User, token: string}> => {
    const data = await apiRequest<LoginResponse>('/token/', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });
    // The backend should return the user object along with the tokens
    return { user: data.user, token: data.access };
};

// For Tenant
export const getDashboardData = (userId: string) => {
    // In a real app, the backend would know the user from the token.
    return apiRequest<{ meals: Meal[], payments: Payment[], complaints: Complaint[], announcements: Announcement[] }>('/tenant/dashboard/');
};

// For Admin
export const getAdminData = () => {
    return apiRequest<{ tenants: FullTenant[], occupancy: OccupancyStats, announcements: Announcement[] }>('/admin/dashboard/');
};

// For Cook
export const getCookData = () => {
    return apiRequest<CookDashboardData>('/cook/dashboard/');
};

// For Manager
export const getManagerData = () => {
    return apiRequest<{ complaints: Complaint[] }>('/manager/dashboard/');
};

// For Owner
export const getOwnerData = () => {
    return apiRequest<{ occupancy: OccupancyStats; financials: FinancialStats; complaints: Complaint[]; announcements: Announcement[] }>('/owner/dashboard/');
};

// Placeholder for a function to submit a new complaint
export const submitComplaint = (complaintData: { category: string; description: string }) => {
    return apiRequest<Complaint>('/tenant/complaints/', {
        method: 'POST',
        body: JSON.stringify(complaintData),
    });
};
