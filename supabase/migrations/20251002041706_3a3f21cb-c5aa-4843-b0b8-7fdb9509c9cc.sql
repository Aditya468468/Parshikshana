-- Create mentors table
CREATE TABLE public.mentors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  college_id UUID NOT NULL REFERENCES public.college_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  specialization TEXT,
  phone TEXT,
  max_students INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create mentor_assignments table
CREATE TABLE public.mentor_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
  mentor_id UUID NOT NULL REFERENCES public.mentors(id) ON DELETE CASCADE,
  assigned_by UUID NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  UNIQUE(student_id, mentor_id)
);

-- Enable RLS
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_assignments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for mentors table
CREATE POLICY "College admins can manage mentors for their college"
ON public.mentors
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM college_profiles
    WHERE college_profiles.id = mentors.college_id
    AND college_profiles.user_id = auth.uid()
  )
);

CREATE POLICY "Students can view mentors"
ON public.mentors
FOR SELECT
USING (true);

-- RLS Policies for mentor_assignments table
CREATE POLICY "College admins can manage mentor assignments"
ON public.mentor_assignments
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM student_profiles sp
    JOIN college_profiles cp ON sp.college_name = cp.college_name
    WHERE sp.id = mentor_assignments.student_id
    AND cp.user_id = auth.uid()
  )
);

CREATE POLICY "Students can view their mentor assignments"
ON public.mentor_assignments
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM student_profiles
    WHERE student_profiles.id = mentor_assignments.student_id
    AND student_profiles.user_id = auth.uid()
  )
);

CREATE POLICY "Mentors can view their assignments"
ON public.mentor_assignments
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM mentors
    WHERE mentors.id = mentor_assignments.mentor_id
  )
);

-- Add triggers for updated_at
CREATE TRIGGER update_mentors_updated_at
BEFORE UPDATE ON public.mentors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mentor_assignments_updated_at
BEFORE UPDATE ON public.mentor_assignments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create view for mentor workload
CREATE OR REPLACE VIEW public.mentor_workload AS
SELECT 
  m.id,
  m.name,
  m.specialization,
  m.email,
  m.max_students,
  COUNT(ma.id) FILTER (WHERE ma.status = 'active') as assigned_students,
  m.max_students - COUNT(ma.id) FILTER (WHERE ma.status = 'active') as available_slots
FROM mentors m
LEFT JOIN mentor_assignments ma ON m.id = ma.mentor_id AND ma.status = 'active'
GROUP BY m.id, m.name, m.specialization, m.email, m.max_students;