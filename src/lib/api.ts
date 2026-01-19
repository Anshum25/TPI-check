// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

/**
 * Get stored JWT token from sessionStorage
 */
export const getAuthToken = (): string | null => {
  return sessionStorage.getItem("admin_token");
};

/**
 * Store JWT token in sessionStorage
 */
export const setAuthToken = (token: string): void => {
  sessionStorage.setItem("admin_token", token);
};

/**
 * Remove JWT token from sessionStorage
 */
export const removeAuthToken = (): void => {
  sessionStorage.removeItem("admin_token");
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

/**
 * API request helper
 */
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorData: any;
    try {
      errorData = await response.json();
    } catch {
      errorData = {
        error: "Unknown error",
        message: response.statusText,
      };
    }
    
    // Handle specific error codes
    if (response.status === 413) {
      throw new Error("Request entity too large. The content is too large to save. Please reduce the size of images or content.");
    }
    if (response.status === 401) {
      throw new Error("Authentication required. Please login again.");
    }
    if (response.status === 404) {
      throw new Error("Resource not found");
    }
    
    throw new Error(errorData.message || errorData.error || "API request failed");
  }

  return response;
};

/**
 * Auth API
 */
export const authAPI = {
  /**
   * Login with password
   */
  login: async (password: string): Promise<{ token: string; user: { role: string } }> => {
    const response = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    if (data.success && data.data.token) {
      setAuthToken(data.data.token);
      return data.data;
    }
    throw new Error(data.message || "Login failed");
  },

  /**
   * Verify token
   */
  verify: async (): Promise<boolean> => {
    try {
      const response = await apiRequest("/auth/verify");
      const data = await response.json();
      return data.success === true;
    } catch {
      return false;
    }
  },

  /**
   * Logout (clear token)
   */
  logout: (): void => {
    removeAuthToken();
  },

  /**
   * Change password (requires auth)
   */
  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    if (!isAuthenticated()) {
      throw new Error("Authentication required");
    }
    const response = await apiRequest("/auth/change-password", {
      method: "POST",
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to change password");
    }
  },
};

/**
 * Content API
 */
export const contentAPI = {
  /**
   * Get content for a page
   */
  get: async (page: string): Promise<any> => {
    const response = await apiRequest(`/${page}`);
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    throw new Error(data.message || "Failed to fetch content");
  },

  /**
   * Update content for a page (requires auth)
   */
  update: async (page: string, content: any): Promise<any> => {
    if (!isAuthenticated()) {
      throw new Error("Authentication required");
    }
    const response = await apiRequest(`/${page}`, {
      method: "PUT",
      body: JSON.stringify(content),
    });
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    throw new Error(data.message || "Failed to update content");
  },

  /**
   * Partial update content for a page (requires auth)
   */
  patch: async (page: string, content: Partial<any>): Promise<any> => {
    if (!isAuthenticated()) {
      throw new Error("Authentication required");
    }
    const response = await apiRequest(`/${page}`, {
      method: "PATCH",
      body: JSON.stringify(content),
    });
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    throw new Error(data.message || "Failed to update content");
  },
};

/**
 * Image API
 */
export const imageAPI = {
  /**
   * Upload image to Cloudinary (requires auth)
   */
  upload: async (imageUrl: string): Promise<{ secureUrl: string; publicId: string }> => {
    if (!isAuthenticated()) {
      throw new Error("Authentication required");
    }
    const response = await apiRequest("/images", {
      method: "POST",
      body: JSON.stringify({ imageUrl }),
    });
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    throw new Error(data.message || "Failed to upload image");
  },

  /**
   * Delete image from Cloudinary (requires auth)
   */
  delete: async (publicId: string): Promise<void> => {
    if (!isAuthenticated()) {
      throw new Error("Authentication required");
    }
    const response = await apiRequest("/images", {
      method: "DELETE",
      body: JSON.stringify({ publicId }),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to delete image");
    }
  },
};

/**
 * Email API (public - no authentication required)
 */
export const emailAPI = {
  /**
   * Send callback request email
   */
  sendCallbackRequest: async (formData: {
    firstName: string;
    lastName?: string;
    workingPerson?: string;
    phone: string;
    area?: string;
    times?: {
      morning?: boolean;
      afternoon?: boolean;
      evening?: boolean;
    };
  }): Promise<void> => {
    const response = await apiRequest("/email/callback", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to send email");
    }
  },
};

