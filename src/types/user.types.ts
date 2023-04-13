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
  industrySelection: IndustrySelection[];
  step?: string;
  filmIndustry?: string;
}

export interface IndustrySelection {
  id: number;
  label: string;
}
