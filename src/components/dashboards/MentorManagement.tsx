import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Users, UserCheck, Mail, Award, Plus, Edit, Trash2 } from 'lucide-react';

interface Student {
  id: string;
  user_id: string;
  college_name: string;
  course: string;
  semester: number;
  skills: string[];
  profiles: {
    full_name: string;
    email: string;
  };
  mentor_assignments?: {
    id: string;
    mentor_id: string;
    status: string;
    mentors: {
      name: string;
    };
  }[];
}

interface Mentor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  max_students: number;
  assigned_students: number;
  available_slots: number;
}

interface MentorFormData {
  name: string;
  email: string;
  specialization: string;
  phone: string;
  max_students: number;
}

export default function MentorManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [selectedMentor, setSelectedMentor] = useState<string>('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [showAddMentor, setShowAddMentor] = useState(false);
  const [collegeId, setCollegeId] = useState<string>('');
  const [mentorForm, setMentorForm] = useState<MentorFormData>({
    name: '',
    email: '',
    specialization: '',
    phone: '',
    max_students: 10,
  });
  const { toast } = useToast();
  const { user: authUser, profile } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Use AuthContext (supports demo logins)
      const user = authUser;
      if (!user) {
        setLoading(false);
        return;
      }

      // Check if this is a demo user
      if (user.id === '11111111-1111-1111-1111-111111111111') {
        // Use demo data for demo users
        setCollegeId('demo-college-id');
        
        // Set demo students
        setStudents([
          {
            id: 'demo-student-1',
            user_id: 'demo-student-1',
            college_name: 'Demo College',
            course: 'B.Tech Computer Science',
            semester: 6,
            skills: ['Java', 'Python', 'React'],
            profiles: {
              full_name: 'Rahul Kumar',
              email: 'rahul.kumar@democollege.edu'
            }
          },
          {
            id: 'demo-student-2',
            user_id: 'demo-student-2',
            college_name: 'Demo College',
            course: 'B.Tech Information Technology',
            semester: 4,
            skills: ['JavaScript', 'Node.js', 'MongoDB'],
            profiles: {
              full_name: 'Priya Singh',
              email: 'priya.singh@democollege.edu'
            }
          },
          {
            id: 'demo-student-3',
            user_id: 'demo-student-3',
            college_name: 'Demo College',
            course: 'B.Tech Computer Science',
            semester: 5,
            skills: ['C++', 'Data Structures', 'AI/ML'],
            profiles: {
              full_name: 'Amit Sharma',
              email: 'amit.sharma@democollege.edu'
            }
          },
          {
            id: 'demo-student-4',
            user_id: 'demo-student-4',
            college_name: 'Demo College',
            course: 'B.Tech Electronics',
            semester: 3,
            skills: ['IoT', 'Arduino', 'Embedded Systems'],
            profiles: {
              full_name: 'Sneha Patel',
              email: 'sneha.patel@democollege.edu'
            }
          },
          {
            id: 'demo-student-5',
            user_id: 'demo-student-5',
            college_name: 'Demo College',
            course: 'B.Tech Information Technology',
            semester: 6,
            skills: ['Python', 'Django', 'PostgreSQL'],
            profiles: {
              full_name: 'Arjun Reddy',
              email: 'arjun.reddy@democollege.edu'
            }
          },
          {
            id: 'demo-student-6',
            user_id: 'demo-student-6',
            college_name: 'Demo College',
            course: 'B.Tech Computer Science',
            semester: 7,
            skills: ['Flutter', 'Dart', 'Firebase'],
            profiles: {
              full_name: 'Kavya Desai',
              email: 'kavya.desai@democollege.edu'
            }
          },
          {
            id: 'demo-student-7',
            user_id: 'demo-student-7',
            college_name: 'Demo College',
            course: 'B.Tech Mechanical',
            semester: 5,
            skills: ['CAD', 'SolidWorks', 'Automation'],
            profiles: {
              full_name: 'Vikram Mehta',
              email: 'vikram.mehta@democollege.edu'
            }
          },
          {
            id: 'demo-student-8',
            user_id: 'demo-student-8',
            college_name: 'Demo College',
            course: 'B.Tech Computer Science',
            semester: 4,
            skills: ['React Native', 'TypeScript', 'Redux'],
            profiles: {
              full_name: 'Ananya Gupta',
              email: 'ananya.gupta@democollege.edu'
            }
          }
        ]);
        
        // Set demo mentors
        setMentors([
          {
            id: 'demo-mentor-1',
            name: 'Dr. Anjali Verma',
            email: 'anjali.verma@democollege.edu',
            specialization: 'AI & Machine Learning',
            max_students: 15,
            assigned_students: 3,
            available_slots: 12
          },
          {
            id: 'demo-mentor-2',
            name: 'Prof. Rajesh Kumar',
            email: 'rajesh.kumar@democollege.edu',
            specialization: 'Web Development',
            max_students: 12,
            assigned_students: 2,
            available_slots: 10
          },
          {
            id: 'demo-mentor-3',
            name: 'Dr. Meera Patel',
            email: 'meera.patel@democollege.edu',
            specialization: 'Data Science',
            max_students: 10,
            assigned_students: 2,
            available_slots: 8
          },
          {
            id: 'demo-mentor-4',
            name: 'Prof. Suresh Iyer',
            email: 'suresh.iyer@democollege.edu',
            specialization: 'Mobile App Development',
            max_students: 12,
            assigned_students: 1,
            available_slots: 11
          },
          {
            id: 'demo-mentor-5',
            name: 'Dr. Pooja Nair',
            email: 'pooja.nair@democollege.edu',
            specialization: 'Cloud Computing',
            max_students: 14,
            assigned_students: 0,
            available_slots: 14
          },
          {
            id: 'demo-mentor-6',
            name: 'Prof. Karthik Krishnan',
            email: 'karthik.krishnan@democollege.edu',
            specialization: 'Cybersecurity',
            max_students: 10,
            assigned_students: 0,
            available_slots: 10
          },
          {
            id: 'demo-mentor-7',
            name: 'Dr. Ritu Malhotra',
            email: 'ritu.malhotra@democollege.edu',
            specialization: 'IoT & Embedded Systems',
            max_students: 11,
            assigned_students: 1,
            available_slots: 10
          },
          {
            id: 'demo-mentor-8',
            name: 'Prof. Anil Agarwal',
            email: 'anil.agarwal@democollege.edu',
            specialization: 'Backend Development',
            max_students: 13,
            assigned_students: 1,
            available_slots: 12
          }
        ]);
        
        setLoading(false);
        return;
      }

      const { data: collegeProfile } = await supabase
        .from('college_profiles')
        .select('id, college_name')
        .eq('user_id', user.id)
        .single();

      if (collegeProfile) {
        setCollegeId(collegeProfile.id);

        // Fetch students
        const { data: studentsData, error: studentsError } = await supabase
          .from('student_profiles')
          .select(`
            id,
            user_id,
            college_name,
            course,
            semester,
            skills
          `)
          .eq('college_name', collegeProfile.college_name);

        if (studentsError) throw studentsError;

        // Fetch profiles for students
        const studentIds = studentsData?.map(s => s.user_id) || [];
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('user_id, full_name, email')
          .in('user_id', studentIds);

        // Fetch mentor assignments
        const studentProfileIds = studentsData?.map(s => s.id) || [];
        const { data: assignmentsData } = await supabase
          .from('mentor_assignments')
          .select(`
            id,
            student_id,
            mentor_id,
            status,
            mentors(name)
          `)
          .in('student_id', studentProfileIds)
          .eq('status', 'active');

        // Combine data
        const combinedStudents = studentsData?.map(student => {
          const profile = profilesData?.find(p => p.user_id === student.user_id);
          const assignments = assignmentsData?.filter(a => a.student_id === student.id) || [];
          return {
            ...student,
            profiles: profile || { full_name: 'N/A', email: 'N/A' },
            mentor_assignments: assignments
          };
        }) || [];

        setStudents(combinedStudents);

        // Fetch mentors with workload
        const { data: mentorsData, error: mentorsError } = await supabase
          .from('mentor_workload')
          .select('*')
          .eq('id', collegeProfile.id);

        if (mentorsError) {
          // Fallback to regular mentors table if view doesn't work
          const { data: fallbackMentors } = await supabase
            .from('mentors')
            .select('id, name, email, specialization, max_students')
            .eq('college_id', collegeProfile.id);
          
          if (fallbackMentors) {
            setMentors(fallbackMentors.map(m => ({
              ...m,
              assigned_students: 0,
              available_slots: m.max_students
            })));
          }
        } else {
          setMentors(mentorsData || []);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddMentor = async () => {
    if (!collegeId || !mentorForm.name || !mentorForm.email) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Handle demo users
      if (collegeId === 'demo-college-id') {
        const newMentor: Mentor = {
          id: `demo-mentor-${Date.now()}`,
          name: mentorForm.name,
          email: mentorForm.email,
          specialization: mentorForm.specialization,
          max_students: mentorForm.max_students,
          assigned_students: 0,
          available_slots: mentorForm.max_students
        };
        
        setMentors(prev => [...prev, newMentor]);
        
        toast({
          title: 'Success',
          description: 'Mentor added successfully (Demo Mode)',
        });

        setShowAddMentor(false);
        setMentorForm({
          name: '',
          email: '',
          specialization: '',
          phone: '',
          max_students: 10,
        });
        return;
      }

      const { error } = await supabase
        .from('mentors')
        .insert({
          college_id: collegeId,
          name: mentorForm.name,
          email: mentorForm.email,
          specialization: mentorForm.specialization,
          phone: mentorForm.phone,
          max_students: mentorForm.max_students,
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Mentor added successfully',
      });

      setShowAddMentor(false);
      setMentorForm({
        name: '',
        email: '',
        specialization: '',
        phone: '',
        max_students: 10,
      });
      fetchData();
    } catch (error) {
      console.error('Error adding mentor:', error);
      toast({
        title: 'Error',
        description: 'Failed to add mentor',
        variant: 'destructive',
      });
    }
  };

  const handleAssignMentor = async (studentId: string, mentorId: string) => {
    if (!studentId || !mentorId) {
      toast({
        title: 'Error',
        description: 'Please select both a student and a mentor',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsAssigning(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Handle demo users
      if (collegeId === 'demo-college-id') {
        // Update students array with assignment
        setStudents(prev => prev.map(student => {
          if (student.id === studentId) {
            const mentor = mentors.find(m => m.id === mentorId);
            return {
              ...student,
              mentor_assignments: [{
                id: `demo-assignment-${Date.now()}`,
                mentor_id: mentorId,
                status: 'active',
                mentors: {
                  name: mentor?.name || 'Unknown'
                }
              }]
            };
          }
          return student;
        }));

        toast({
          title: 'Success',
          description: 'Mentor assigned successfully (Demo Mode)',
        });

        setSelectedStudent('');
        setSelectedMentor('');
        setIsAssigning(false);
        return;
      }

      // Check if assignment already exists
      const { data: existing } = await supabase
        .from('mentor_assignments')
        .select('id, status')
        .eq('student_id', studentId)
        .eq('status', 'active')
        .maybeSingle();

      if (existing) {
        // Update existing assignment
        const { error } = await supabase
          .from('mentor_assignments')
          .update({ mentor_id: mentorId })
          .eq('id', existing.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Mentor reassigned successfully',
        });
      } else {
        // Create new assignment
        const { error } = await supabase
          .from('mentor_assignments')
          .insert({
            student_id: studentId,
            mentor_id: mentorId,
            assigned_by: user.id,
            status: 'active',
          });

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Mentor assigned successfully',
        });
      }

      setSelectedStudent('');
      setSelectedMentor('');
      fetchData();
    } catch (error) {
      console.error('Error assigning mentor:', error);
      toast({
        title: 'Error',
        description: 'Failed to assign mentor',
        variant: 'destructive',
      });
    } finally {
      setIsAssigning(false);
    }
  };

  const handleRemoveAssignment = async (studentId: string) => {
    try {
      const { error } = await supabase
        .from('mentor_assignments')
        .update({ status: 'inactive' })
        .eq('student_id', studentId)
        .eq('status', 'active');

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Mentor assignment removed',
      });

      fetchData();
    } catch (error) {
      console.error('Error removing assignment:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove assignment',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const getActiveAssignment = (student: Student) => {
    return student.mentor_assignments?.find(a => a.status === 'active');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Mentor Management</h2>
          <p className="text-muted-foreground">Assign and manage mentors for students</p>
        </div>
        <Dialog open={showAddMentor} onOpenChange={setShowAddMentor}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Mentor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Mentor</DialogTitle>
              <DialogDescription>Enter mentor details below</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={mentorForm.name}
                  onChange={(e) => setMentorForm({ ...mentorForm, name: e.target.value })}
                  placeholder="Enter mentor name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={mentorForm.email}
                  onChange={(e) => setMentorForm({ ...mentorForm, email: e.target.value })}
                  placeholder="mentor@example.com"
                />
              </div>
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  value={mentorForm.specialization}
                  onChange={(e) => setMentorForm({ ...mentorForm, specialization: e.target.value })}
                  placeholder="e.g., AI/ML, Web Development"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={mentorForm.phone}
                  onChange={(e) => setMentorForm({ ...mentorForm, phone: e.target.value })}
                  placeholder="+1234567890"
                />
              </div>
              <div>
                <Label htmlFor="max_students">Maximum Students</Label>
                <Input
                  id="max_students"
                  type="number"
                  value={mentorForm.max_students}
                  onChange={(e) => setMentorForm({ ...mentorForm, max_students: parseInt(e.target.value) || 10 })}
                  min={1}
                  max={50}
                />
              </div>
              <Button onClick={handleAddMentor} className="w-full">
                Add Mentor
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{students.length}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mentors.length}</p>
                <p className="text-sm text-muted-foreground">Available Mentors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {students.filter(s => getActiveAssignment(s)).length}
                </p>
                <p className="text-sm text-muted-foreground">Assigned Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mentors List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Available Mentors
          </CardTitle>
          <CardDescription>View mentor workload and availability</CardDescription>
        </CardHeader>
        <CardContent>
          {mentors.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <UserCheck className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No mentors added yet</p>
              <p className="text-sm">Click "Add Mentor" to get started</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mentors.map((mentor) => (
                  <TableRow key={mentor.id}>
                    <TableCell className="font-medium">{mentor.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {mentor.email}
                      </div>
                    </TableCell>
                    <TableCell>{mentor.specialization || 'N/A'}</TableCell>
                    <TableCell>{mentor.assigned_students || 0}</TableCell>
                    <TableCell>
                      {mentor.assigned_students || 0}/{mentor.max_students}
                    </TableCell>
                    <TableCell>
                      {(mentor.available_slots || mentor.max_students) > 0 ? (
                        <Badge variant="default" className="bg-success/10 text-success">
                          Available
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Full</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Students List with Assignment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Students & Mentor Assignments
          </CardTitle>
          <CardDescription>Assign mentors to students</CardDescription>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No students found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Current Mentor</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => {
                  const assignment = getActiveAssignment(student);
                  return (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.profiles?.full_name || 'N/A'}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {student.profiles?.email || 'N/A'}
                      </TableCell>
                      <TableCell>{student.course || 'N/A'}</TableCell>
                      <TableCell>{student.semester || 'N/A'}</TableCell>
                      <TableCell>
                        {assignment ? (
                          <Badge variant="default" className="bg-primary/10 text-primary">
                            {assignment.mentors?.name}
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Not Assigned</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                              onClick={() => setSelectedStudent(student.id)}
                            >
                              <Edit className="w-4 h-4" />
                              {assignment ? 'Change' : 'Assign'}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                {assignment ? 'Reassign' : 'Assign'} Mentor
                              </DialogTitle>
                              <DialogDescription>
                                Select a mentor for {student.profiles?.full_name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Select Mentor</Label>
                                <Select
                                  value={selectedMentor}
                                  onValueChange={setSelectedMentor}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choose a mentor" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mentors.map((mentor) => (
                                      <SelectItem key={mentor.id} value={mentor.id}>
                                        {mentor.name} - {mentor.specialization}
                                        {(mentor.available_slots || 0) === 0 && ' (Full)'}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleAssignMentor(student.id, selectedMentor)}
                                  disabled={!selectedMentor || isAssigning}
                                  className="flex-1"
                                >
                                  {isAssigning ? 'Assigning...' : assignment ? 'Update' : 'Assign'}
                                </Button>
                                {assignment && (
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleRemoveAssignment(student.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
