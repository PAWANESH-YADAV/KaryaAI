export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  headline?: string;
  education?: string;
  qualification?: string;
  experience?: string;
  interests: string[];
  skills: string[];
  careerGoals: string;
  preferredIndustries: string[];
  preferredLocations: string[];
  profileCompletion: number;
  careerReadinessScore: number;
  createdAt: string;
  isActive: boolean;
}

export interface CareerPath {
  id: string;
  title: string;
  industry: string;
  description: string;
  level: 'Entry' | 'Mid' | 'Senior' | 'Executive';
  averageSalary: string;
  demandGrowth: string;
  matchScore?: number;
  requiredSkills: string[];
  recommendedCourses: string[];
  topCompanies: string[];
  status: 'Published' | 'Draft' | 'Archived';
  category: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Technical' | 'AI & Data' | 'Cloud & DevOps' | 'Product & Business' | 'Soft Skills';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  mappedCareers: string[];
  demandLevel: 'High' | 'Very High' | 'Critical';
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  category: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  enrolledCount: number;
  isCertified: boolean;
  certificateName?: string;
  progress?: number;
  isSaved?: boolean;
  description: string;
  skillsGained: string[];
  status: 'Published' | 'Draft';
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Full-time' | 'Remote' | 'Hybrid' | 'Contract' | 'Internship';
  experienceLevel: string;
  salaryRange: string;
  skills: string[];
  description: string;
  postedDate: string;
  status: 'Active' | 'Closed' | 'Archived';
  applicantsCount: number;
}

export type ApplicationStatus = 'Applied' | 'Under Review' | 'Interview' | 'Selected' | 'Rejected';

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: string;
  status: ApplicationStatus;
  feedbackNotes?: string;
}

export interface MockInterviewSession {
  id: string;
  role: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  score?: number;
  completedAt?: string;
  questions: {
    question: string;
    sampleAnswer: string;
    category: string;
  }[];
  userFeedback?: {
    technicalScore: number;
    communicationScore: number;
    problemSolvingScore: number;
    strengths: string[];
    improvements: string[];
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'system' | 'job' | 'interview' | 'course';
}
