//Global

declare global {
  namespace Express {
    export interface Request {
      user: any;
    }
  }
}

// type RequireAtLeastOne<T> = {
//   [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
// }[keyof T]

export type authId = string;

export interface login {
  email: string;
  password: string;
}

//User
export type userId = string;

export type userToken = string;

export type userEmail = string;

export interface createUser {
  email: string;
  password: string;
  display_name: string;
}

export interface userQuery {
  id?: string;
  email?: string;
  display_name?: string;
  active?: boolean;
  role?: string;
  profile_complete?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface userUpdate {
  email?: string;
  password?: string;
  display_name?: string;
  description?: string;
  image_url?: string;
  active?: boolean;
  role?: string;
  profile_complete?: boolean;
}

//Scan

export type scanId = string

export interface createScan {
  image_url: string,
  disease_class: string,
  confidence_level: string,
  user_id: string,
}

export interface scanQuery {
  id?: string;
  image_url?: string;
  disease_class?: string;
  confidence_level?: string;
  user_id?: string;
  created_at?: string;
}
