export type UserRole = 'super_admin' | 'principal' | 'teacher' | 'student';

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
  school_id: string;
  full_name: string;
  admission_no?: string;
  role: UserRole;
  photo_url?: string;
  created_at: string;
}

export interface Class {
  id: string;
  school_id: string;
  name: string;
  created_at: string;
}

export interface Stream {
  id: string;
  class_id: string;
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

export interface Exam {
  id: string;
  school_id: string;
  name: string;
  academic_year: number;
  term: number;
  is_processed: boolean;
  processed_at?: string;
  created_at: string;
}

export interface Mark {
  id: string;
  student_id: string;
  exam_id: string;
  subject_id: string;
  score: number;
  entered_by: string;
  created_at: string;
}

export interface ProcessedResult {
  id: string;
  student_id: string;
  exam_id: string;
  total_marks: number;
  average_marks: number;
  rank_in_class: number;
  rank_in_stream: number;
  grade: string;
  remarks?: string;
  created_at: string;
}
