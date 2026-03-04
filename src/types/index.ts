export type UserRole = 'admin' | 'teacher' | 'viewer';

export interface School {
  id: string;
  name: string;
  address?: string;
  logo_url?: string;
  subscription_status: 'active' | 'inactive';
  created_at: string;
}

export interface Profile {
  id: string;
  school_id?: string;
  full_name?: string;
  role: UserRole;
  created_at: string;
  schools?: School;
}

export interface Class {
  id: string;
  school_id: string;
  name: string;
  created_at: string;
  streams?: Stream[];
}

export interface Stream {
  id: string;
  class_id: string;
  school_id: string;
  name: string;
  created_at: string;
}

export interface Subject {
  id: string;
  school_id: string;
  name: string;
  code?: string;
  created_at: string;
}

export interface Student {
  id: string;
  school_id: string;
  class_id?: string;
  stream_id?: string;
  name: string;
  admission_number?: string;
  gender?: 'male' | 'female' | 'other';
  created_at: string;
}

export interface Exam {
  id: string;
  school_id: string;
  name: string;
  term?: string;
  year?: number;
  class_id?: string;
  created_at: string;
}

export interface Mark {
  id: string;
  exam_id: string;
  student_id: string;
  subject_id: string;
  school_id: string;
  score?: number;
  grade?: string;
  created_at: string;
}

export interface ProcessedResult {
  id: string;
  exam_id: string;
  student_id: string;
  school_id: string;
  total_score?: number;
  mean_score?: number;
  grade?: string;
  rank?: number;
  created_at: string;
}
