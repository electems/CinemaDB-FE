import { DataNode } from 'antd/es/tree'

export interface UserSubCategory{
  id?: number
  key: string;
  value: DataNode[]
  userId?: string
}

export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  step: string;
  role: 'ADMIN' | 'USER';
  type: string;
  industrySelection: DataNode[];
  userSubCategory: UserSubCategory[]
};
