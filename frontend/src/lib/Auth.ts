export interface LoginRequest {
  mail?: string | null;
  password?: string | null;
}

export interface RegisterRequest {
  mail?: string | null;
  password?: string | null;
  name?: string | null;
  dateOfBirth?: string | null; // YYYY-MM-DD
}

export interface AuthResponse {
  accessToken?: string | null;
  email?: string | null;
  expiresIn?: number | null;
}