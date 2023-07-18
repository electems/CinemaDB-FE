import { DataNode } from 'antd/es/tree'

/* eslint-disable no-use-before-define */
export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  phoneNumber?: string;
  userName?: string;
  role?: string;
  status?: string;
  industrySelection: DataNode[];
  step?: string;
  filmIndustry?: string;
  type?: string;
  userSubCategory?: userSubCategory[]
  planId?: number
}

export interface IndustrySelection {
  id: number;
  label: string;
}

export interface User2 {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  role?: string;
  step?: string;
}
interface userSubCategory{
  id: number
  key: string;
  value: DataNode[]
  userId: number
}

export interface UserProfile {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  phoneNumber?: string;
  userName?: string;
  role?: string;
  status?: string;
  industrySelection: DataNode[];
  step?: string;
  filmIndustry?: string;
  type?: string;
  usersubcategory?: userSubCategory[]
  planId?: number
}
