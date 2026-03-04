-- Schools table
CREATE TABLE IF NOT EXISTS public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT,
  logo_url TEXT,
  subscription_status TEXT NOT NULL DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "schools_select_authenticated" ON public.schools
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "schools_insert_authenticated" ON public.schools
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "schools_update_authenticated" ON public.schools
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "schools_delete_authenticated" ON public.schools
  FOR DELETE TO authenticated USING (true);

-- Profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  school_id UUID REFERENCES public.schools(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('super_admin', 'principal', 'teacher', 'student')),
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_authenticated" ON public.profiles
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles
  FOR DELETE TO authenticated USING (auth.uid() = id);

-- Classes table
CREATE TABLE IF NOT EXISTS public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "classes_select_authenticated" ON public.classes
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "classes_insert_authenticated" ON public.classes
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "classes_update_authenticated" ON public.classes
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "classes_delete_authenticated" ON public.classes
  FOR DELETE TO authenticated USING (true);

-- Streams table
CREATE TABLE IF NOT EXISTS public.streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.streams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "streams_select_authenticated" ON public.streams
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "streams_insert_authenticated" ON public.streams
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "streams_update_authenticated" ON public.streams
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "streams_delete_authenticated" ON public.streams
  FOR DELETE TO authenticated USING (true);

-- Subjects table
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "subjects_select_authenticated" ON public.subjects
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "subjects_insert_authenticated" ON public.subjects
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "subjects_update_authenticated" ON public.subjects
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "subjects_delete_authenticated" ON public.subjects
  FOR DELETE TO authenticated USING (true);

-- Students table (separate from profiles for student-specific data)
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL,
  stream_id UUID REFERENCES public.streams(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  admission_no TEXT,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "students_select_authenticated" ON public.students
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "students_insert_authenticated" ON public.students
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "students_update_authenticated" ON public.students
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "students_delete_authenticated" ON public.students
  FOR DELETE TO authenticated USING (true);

-- Exams table
CREATE TABLE IF NOT EXISTS public.exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  academic_year INTEGER NOT NULL,
  term INTEGER NOT NULL CHECK (term BETWEEN 1 AND 3),
  is_processed BOOLEAN NOT NULL DEFAULT false,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "exams_select_authenticated" ON public.exams
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "exams_insert_authenticated" ON public.exams
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "exams_update_authenticated" ON public.exams
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "exams_delete_authenticated" ON public.exams
  FOR DELETE TO authenticated USING (true);

-- Marks table
CREATE TABLE IF NOT EXISTS public.marks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  score NUMERIC NOT NULL CHECK (score >= 0 AND score <= 100),
  entered_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, exam_id, subject_id)
);

ALTER TABLE public.marks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "marks_select_authenticated" ON public.marks
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "marks_insert_authenticated" ON public.marks
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "marks_update_authenticated" ON public.marks
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "marks_delete_authenticated" ON public.marks
  FOR DELETE TO authenticated USING (true);

-- Processed Results table
CREATE TABLE IF NOT EXISTS public.processed_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  total_marks NUMERIC NOT NULL DEFAULT 0,
  average_marks NUMERIC NOT NULL DEFAULT 0,
  rank_in_class INTEGER,
  rank_in_stream INTEGER,
  grade TEXT,
  remarks TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, exam_id)
);

ALTER TABLE public.processed_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "results_select_authenticated" ON public.processed_results
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "results_insert_authenticated" ON public.processed_results
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "results_update_authenticated" ON public.processed_results
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "results_delete_authenticated" ON public.processed_results
  FOR DELETE TO authenticated USING (true);
