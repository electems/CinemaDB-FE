import { DataNode } from 'antd/es/tree'

export interface UserSubCategory{
  id?: number
  key?: string;
  // also pushing form array here so i changed the datatype from Datanode[] to any
  value: any[]
  userId?: string
  createdBy?:string
  updatedBy?:string
  createdAt?: Date,
  updatedAt?: Date
}

export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  bio: string;
  step: string;
  role: 'ADMIN' | 'USER';
  type: string;
  industrySelection: DataNode[];
  userSubCategory: UserSubCategory[]
  token?: string,
  otp?: string
};
