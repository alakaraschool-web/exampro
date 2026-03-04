import { supabase } from '../lib/supabase';
import type { Profile, School, Class, Subject, Exam, Mark, ProcessedResult, Stream, Student } from '../types';

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
      .eq('id', userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async createProfile(profile: Partial<Profile> & { id: string }) {
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
  async getSchools() {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getSchool(schoolId: string) {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .eq('id', schoolId)
      .single();
    if (error) throw error;
    return data;
  },

  async createSchool(school: Omit<School, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('schools')
      .insert([school])
      .select()
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

  async createClass(cls: Omit<Class, 'id' | 'created_at' | 'streams'>) {
    const { data, error } = await supabase
      .from('classes')
      .insert([cls])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async createStream(stream: Omit<Stream, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('streams')
      .insert([stream])
      .select()
      .single();
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

  async createSubject(subject: Omit<Subject, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('subjects')
      .insert([subject])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Students
  async getStudents(schoolId: string, classId?: string, streamId?: string) {
    let query = supabase
      .from('students')
      .select('*')
      .eq('school_id', schoolId);

    if (classId) query = query.eq('class_id', classId);
    if (streamId) query = query.eq('stream_id', streamId);

    const { data, error } = await query.order('name');
    if (error) throw error;
    return data;
  },

  async createStudent(student: Omit<Student, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('students')
      .insert([student])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Teachers (from profiles)
  async getTeachers(schoolId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('school_id', schoolId)
      .eq('role', 'teacher');
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

  async createExam(exam: Omit<Exam, 'id' | 'created_at'>) {
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
  async getMarks(examId: string, subjectId?: string, studentIds?: string[]) {
    let query = supabase
      .from('marks')
      .select('*')
      .eq('exam_id', examId);

    if (subjectId) query = query.eq('subject_id', subjectId);
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
      .insert(marks)
      .select();
    if (error) throw error;
    return data;
  },

  // Results
  async getProcessedResults(examId: string, studentId?: string) {
    let query = supabase
      .from('processed_results')
      .select('*, students(*)')
      .eq('exam_id', examId);

    if (studentId) {
      query = query.eq('student_id', studentId);
    }

    const { data, error } = await query.order('rank');
    if (error) throw error;
    return data;
  },

  async saveProcessedResults(results: Omit<ProcessedResult, 'id' | 'created_at'>[]) {
    const { data, error } = await supabase
      .from('processed_results')
      .insert(results)
      .select();
    if (error) throw error;
    return data;
  },
};
