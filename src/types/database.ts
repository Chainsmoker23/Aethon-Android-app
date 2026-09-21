export type UserRole = 'superadmin' | 'admin' | 'staff' | 'caregiver' | 'family';

export interface UserProfile {
  id: string;
  role: UserRole;
  full_name: string | null;
  facility_id: string | null;
  created_at: string;
}

export interface Facility {
  id: string;
  name: string;
  plan: string;
  subscription_status: string;
  created_at: string;
}

export interface Resident {
  id: string;
  first_name: string;
  last_name: string;
  room_number: string | null;
  care_stage: string | null;
  facility_id: string;
  created_at: string;
}

export interface VisitNote {
  id: string;
  resident_id: string;
  visit_type: string | null;
  tasks_completed: string | null;
  notes: string | null;
  created_at: string;
  residents?: Pick<Resident, 'first_name' | 'last_name'>;
}

export interface Escalation {
  id: string;
  resident_id: string;
  reason: string;
  is_resolved: boolean;
  outcome: string | null;
  created_at: string;
  residents?: Pick<Resident, 'first_name' | 'last_name'>;
}

export interface WellbeingLog {
  id: string;
  resident_id: string;
  mood: number | null;
  sleep: number | null;
  pain: number | null;
  weight_kg: number | null;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface FamilyVisit {
  id: string;
  resident_id: string;
  visitor_name: string;
  scheduled_at: string;
  status: string;
  created_at: string;
}
