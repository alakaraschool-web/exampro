import { supabase } from '../lib/supabase';
import { Profile, School, Class, Subject, Exam, Mark, ProcessedResult, Stream } from '../types';

export const supabaseService = {
  // Profiles
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*, schools(*)')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data;
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
    if (error) throw error;
    return data;
  },

  async createProfile(profile: Omit<Profile, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('profiles')
      .insert([profile])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteProfile(userId: string) {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);
    if (error) throw error;
  },

  // Schools
  async getSchool(schoolId: string) {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .eq('id', schoolId)
      .single();
    if (error) throw error;
    return data;
  },

  // Classes & Streams
  async getClasses(schoolId: string) {
    const { data, error } = await supabase
      .from('classes')
      .select('*, streams(*)')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data;
  },

  // Subjects
  async getSubjects(schoolId: string) {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data;
  },

  // Exams
  async getExams(schoolId: string) {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async createExam(exam: Omit<Exam, 'id' | 'created_at' | 'is_processed'>) {
    const { data, error } = await supabase
      .from('exams')
      .insert([exam])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateExam(examId: string, updates: Partial<Exam>) {
    const { data, error } = await supabase
      .from('exams')
      .update(updates)
      .eq('id', examId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteExam(examId: string) {
    const { error } = await supabase
      .from('exams')
      .delete()
      .eq('id', examId);
    if (error) throw error;
  },

  // Marks
  async getMarks(examId: string, subjectId: string, studentIds?: string[]) {
    let query = supabase
      .from('marks')
      .select('*')
      .eq('exam_id', examId)
      .eq('subject_id', subjectId);
    
    if (studentIds && studentIds.length > 0) {
      query = query.in('student_id', studentIds);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async saveMarks(marks: Omit<Mark, 'id' | 'created_at'>[]) {
    const { data, error } = await supabase
      .from('marks')
      .upsert(marks, { onConflict: 'student_id,exam_id,subject_id' });
    if (error) throw error;
    return data;
  },

  // Students
  async getStudents(schoolId: string, classId?: string, streamId?: string) {
    let query = supabase
      .from('profiles')
      .select('*')
      .eq('school_id', schoolId)
      .eq('role', 'student');
    
    // Note: In a real app, you'd have a student_classes table or similar
    // For this schema, we'll assume we can filter by some metadata or join
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getTeachers(schoolId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('school_id', schoolId)
      .neq('role', 'student');
    if (error) throw error;
    return data;
  },

  // Results
  async getProcessedResults(examId: string, studentId?: string) {
    let query = supabase
      .from('processed_results')
      .select('*, profiles(*)')
      .eq('exam_id', examId);
    
    if (studentId) {
      query = query.eq('student_id', studentId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
};
