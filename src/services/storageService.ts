import {
  User,
  CareerPath,
  SkillItem,
  Course,
  JobListing,
  JobApplication,
  MockInterviewSession,
  NotificationItem
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_CAREER_PATHS,
  INITIAL_SKILLS,
  INITIAL_COURSES,
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  INITIAL_MOCK_INTERVIEWS,
  INITIAL_NOTIFICATIONS
} from './mockData';

const STORAGE_KEYS = {
  CURRENT_USER: 'karyaai_current_user',
  USERS: 'karyaai_users',
  CAREERS: 'karyaai_careers',
  SKILLS: 'karyaai_skills',
  COURSES: 'karyaai_courses',
  JOBS: 'karyaai_jobs',
  APPLICATIONS: 'karyaai_applications',
  SAVED_JOBS: 'karyaai_saved_jobs',
  INTERVIEWS: 'karyaai_interviews',
  NOTIFICATIONS: 'karyaai_notifications',
  SYSTEM_SETTINGS: 'karyaai_system_settings'
};

function getItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error('Storage read error:', e);
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage write error:', e);
  }
}

export const storageService = {
  // Session
  getCurrentUser(): User | null {
    return getItem<User | null>(STORAGE_KEYS.CURRENT_USER, null);
  },
  setCurrentUser(user: User | null): void {
    setItem(STORAGE_KEYS.CURRENT_USER, user);
  },

  // Users
  getUsers(): User[] {
    return getItem<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  },
  saveUser(updatedUser: User): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index >= 0) {
      users[index] = updatedUser;
    } else {
      users.push(updatedUser);
    }
    setItem(STORAGE_KEYS.USERS, users);

    // If updating current logged in user
    const current = this.getCurrentUser();
    if (current && current.id === updatedUser.id) {
      this.setCurrentUser(updatedUser);
    }
  },
  toggleUserStatus(userId: string): User | null {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.isActive = !user.isActive;
      setItem(STORAGE_KEYS.USERS, users);
      return user;
    }
    return null;
  },

  // Careers
  getCareers(): CareerPath[] {
    return getItem<CareerPath[]>(STORAGE_KEYS.CAREERS, INITIAL_CAREER_PATHS);
  },
  saveCareer(career: CareerPath): void {
    const list = this.getCareers();
    const idx = list.findIndex(c => c.id === career.id);
    if (idx >= 0) {
      list[idx] = career;
    } else {
      list.unshift(career);
    }
    setItem(STORAGE_KEYS.CAREERS, list);
  },
  deleteCareer(id: string): void {
    const list = this.getCareers().filter(c => c.id !== id);
    setItem(STORAGE_KEYS.CAREERS, list);
  },

  // Skills
  getSkills(): SkillItem[] {
    return getItem<SkillItem[]>(STORAGE_KEYS.SKILLS, INITIAL_SKILLS);
  },
  saveSkill(skill: SkillItem): void {
    const list = this.getSkills();
    const idx = list.findIndex(s => s.id === skill.id);
    if (idx >= 0) {
      list[idx] = skill;
    } else {
      list.unshift(skill);
    }
    setItem(STORAGE_KEYS.SKILLS, list);
  },
  deleteSkill(id: string): void {
    const list = this.getSkills().filter(s => s.id !== id);
    setItem(STORAGE_KEYS.SKILLS, list);
  },

  // Courses
  getCourses(): Course[] {
    return getItem<Course[]>(STORAGE_KEYS.COURSES, INITIAL_COURSES);
  },
  saveCourse(course: Course): void {
    const list = this.getCourses();
    const idx = list.findIndex(c => c.id === course.id);
    if (idx >= 0) {
      list[idx] = course;
    } else {
      list.unshift(course);
    }
    setItem(STORAGE_KEYS.COURSES, list);
  },
  updateCourseProgress(id: string, progress: number): void {
    const list = this.getCourses();
    const course = list.find(c => c.id === id);
    if (course) {
      course.progress = Math.min(100, Math.max(0, progress));
      setItem(STORAGE_KEYS.COURSES, list);
    }
  },

  // Jobs
  getJobs(): JobListing[] {
    return getItem<JobListing[]>(STORAGE_KEYS.JOBS, INITIAL_JOBS);
  },
  saveJob(job: JobListing): void {
    const list = this.getJobs();
    const idx = list.findIndex(j => j.id === job.id);
    if (idx >= 0) {
      list[idx] = job;
    } else {
      list.unshift(job);
    }
    setItem(STORAGE_KEYS.JOBS, list);
  },
  deleteJob(id: string): void {
    const list = this.getJobs().filter(j => j.id !== id);
    setItem(STORAGE_KEYS.JOBS, list);
  },

  // Saved Jobs
  getSavedJobIds(): string[] {
    return getItem<string[]>(STORAGE_KEYS.SAVED_JOBS, ['job-01', 'job-02']);
  },
  toggleSaveJob(jobId: string): boolean {
    const saved = this.getSavedJobIds();
    let isNowSaved = false;
    if (saved.includes(jobId)) {
      const filtered = saved.filter(id => id !== jobId);
      setItem(STORAGE_KEYS.SAVED_JOBS, filtered);
      isNowSaved = false;
    } else {
      saved.push(jobId);
      setItem(STORAGE_KEYS.SAVED_JOBS, saved);
      isNowSaved = true;
    }
    return isNowSaved;
  },

  // Applications
  getApplications(): JobApplication[] {
    return getItem<JobApplication[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  },
  addApplication(app: JobApplication): void {
    const list = this.getApplications();
    list.unshift(app);
    setItem(STORAGE_KEYS.APPLICATIONS, list);
  },
  updateApplicationStatus(id: string, status: JobApplication['status'], feedbackNotes?: string): void {
    const list = this.getApplications();
    const app = list.find(a => a.id === id);
    if (app) {
      app.status = status;
      if (feedbackNotes) app.feedbackNotes = feedbackNotes;
      setItem(STORAGE_KEYS.APPLICATIONS, list);
    }
  },

  // Interviews
  getInterviews(): MockInterviewSession[] {
    return getItem<MockInterviewSession[]>(STORAGE_KEYS.INTERVIEWS, INITIAL_MOCK_INTERVIEWS);
  },
  addInterview(interview: MockInterviewSession): void {
    const list = this.getInterviews();
    list.unshift(interview);
    setItem(STORAGE_KEYS.INTERVIEWS, list);
  },

  // Notifications
  getNotifications(): NotificationItem[] {
    return getItem<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  },
  markNotificationRead(id: string): void {
    const list = this.getNotifications();
    const n = list.find(item => item.id === id);
    if (n) {
      n.read = true;
      setItem(STORAGE_KEYS.NOTIFICATIONS, list);
    }
  },
  markAllNotificationsRead(): void {
    const list = this.getNotifications().map(n => ({ ...n, read: true }));
    setItem(STORAGE_KEYS.NOTIFICATIONS, list);
  },
  addNotification(n: NotificationItem): void {
    const list = this.getNotifications();
    list.unshift(n);
    setItem(STORAGE_KEYS.NOTIFICATIONS, list);
  },

  // System Settings
  getSystemSettings(): {
    platformName: string;
    supportEmail: string;
    allowRegistration: boolean;
    maintenanceMode: boolean;
    aiEngine: string;
  } {
    return getItem(STORAGE_KEYS.SYSTEM_SETTINGS, {
      platformName: 'KaryaAI Platform',
      supportEmail: 'support@karyaai.com',
      allowRegistration: true,
      maintenanceMode: false,
      aiEngine: 'KaryaAI Career-Intelligence v2.5',
    });
  },
  saveSystemSettings(settings: any): void {
    setItem(STORAGE_KEYS.SYSTEM_SETTINGS, settings);
  }
};
