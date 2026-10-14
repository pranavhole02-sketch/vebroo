import AsyncStorage from '@react-native-async-storage/async-storage';
import { Config } from '../constants/Config';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

class ApiClient {
  private baseUrl: string = Config.API_BASE_URL;
  private token: string | null = null;

  async init() {
    this.token = await AsyncStorage.getItem('user_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      AsyncStorage.setItem('user_token', token);
    } else {
      AsyncStorage.removeItem('user_token');
    }
  }

  getToken() {
    return this.token;
  }

  async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {}, params } = options;

    let url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;

    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          queryParams.append(key, String(val));
        }
      });
      const qs = queryParams.toString();
      if (qs) {
        url += (url.includes('?') ? '&' : '?') + qs;
      }
    }

    const authHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (this.token) {
      authHeaders['Authorization'] = `Bearer ${this.token}`;
      authHeaders['token'] = this.token;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: authHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || data.error || `HTTP error ${response.status}`);
      }

      return data as T;
    } catch (error: any) {
      console.warn(`[API ERROR] ${method} ${url}:`, error.message);
      throw error;
    }
  }

  get<T = any>(endpoint: string, params?: Record<string, any>) {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  post<T = any>(endpoint: string, body?: any) {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  put<T = any>(endpoint: string, body?: any) {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  delete<T = any>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
