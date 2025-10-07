export enum UserRole {
  Tenant = 'tenant',
  Admin = 'admin',
  Cook = 'cook',
  Manager = 'manager',
  Owner = 'owner',
}

export interface Tenant {
  id: string;
  name: string;
  room: string;
  pgName: string;
  location: string;
  profileImageUrl: string;
}

export interface User extends Tenant {
  username: string;
  role: UserRole;
}

export enum MealType {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
}

export enum MealDecision {
  Undecided = 'Undecided',
  Eating = 'Eating',
  NotEating = 'Not Eating',
}

export interface Meal {
  id: string;
  type: MealType;
  menu: string;
  decision: MealDecision;
}

export interface Payment {
  id: string;
  month: string;
  amount: number;
  status: 'Paid' | 'Due' | 'Overdue';
  date: string;
}

export enum ComplaintStatus {
  Submitted = 'Submitted',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
}

export interface Complaint {
  id: string;
  category: string;
  description: string;
  status: ComplaintStatus;
  submittedAt: string;
  tenantName?: string;
  room?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

export interface OccupancyStats {
  totalRooms: number;
  occupied: number;
  occupancyRate: string;
}

export interface FinancialStats {
  totalRentDue: number;
  totalRentPaid: number;
  monthlyRevenue: number;
}

export interface CookDashboardData {
  todayMenu: Meal[];
  mealAttendance: Array<{ tenant: Tenant, decision: MealDecision }>;
}

export interface FullTenant extends Tenant {
  rentStatus: Payment['status'];
  lastPaymentDate: string;
}