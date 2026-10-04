import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Student, AcquisitionChannel, GrowthMetrics } from '../types';
import { INITIAL_STUDENTS } from '../data/seedData';

interface RegisterInput {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  yearOfStudy: string;
  referralCode?: string;
  acquisitionChannel?: AcquisitionChannel;
}

interface RegisterResult {
  success: boolean;
  student?: Student;
  error?: string;
}

interface GrowthContextType {
  students: Student[];
  currentStudent: Student | null;
  currentStudentId: string | null;
  setCurrentStudentId: (id: string | null) => void;
  registerStudent: (input: RegisterInput) => RegisterResult;
  loginByEmailOrCode: (query: string) => { success: boolean; student?: Student; error?: string };
  logout: () => void;
  simulateReferral: (targetCode?: string) => { success: boolean; message: string; newStudent?: Student };
  resetDemoData: () => void;
  getLeaderboard: () => (Student & { rank: number })[];
  getReferredStudents: (referralCode: string) => Student[];
  metrics: GrowthMetrics;
  getStudentRank: (id: string) => number;
}

const STORAGE_KEY = 'ai60_growth_students_v4';
const CURRENT_USER_KEY = 'ai60_growth_current_user_v4';

const GrowthContext = createContext<GrowthContextType | undefined>(undefined);

// Helper to generate referral code like AI60-VIVEK7
export function generateReferralCode(fullName: string, existingCodes: string[]): string {
  const cleanFirst = fullName.trim().split(' ')[0].replace(/[^a-zA-Z]/g, '').toUpperCase() || 'STUDENT';
  const prefix = `AI60-${cleanFirst.substring(0, 8)}`;
  
  // Try clean suffixes
  for (let i = 1; i <= 99; i++) {
    const candidate = `${prefix}${i}`;
    if (!existingCodes.includes(candidate)) {
      return candidate;
    }
  }
  return `${prefix}${Math.floor(100 + Math.random() * 900)}`;
}

export const GrowthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse students from localStorage', e);
    }
    return INITIAL_STUDENTS;
  });

  const [currentStudentId, setCurrentStudentId] = useState<string | null>(() => {
    try {
      const storedId = localStorage.getItem(CURRENT_USER_KEY);
      if (storedId) return storedId;
    } catch {
      // ignore
    }
    // Return null by default: A normal visitor starts as an unregistered visitor!
    return null;
  });

  // Sync students to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch (e) {
      console.error('Failed to save students to localStorage', e);
    }
  }, [students]);

  // Sync current student ID to localStorage
  useEffect(() => {
    try {
      if (currentStudentId) {
        localStorage.setItem(CURRENT_USER_KEY, currentStudentId);
      } else {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } catch {
      // ignore
    }
  }, [currentStudentId]);

  const currentStudent = useMemo(() => {
    if (!currentStudentId) return null;
    return students.find(s => s.id === currentStudentId) || null;
  }, [students, currentStudentId]);

  const registerStudent = (input: RegisterInput): RegisterResult => {
    const normalizedEmail = input.email.trim().toLowerCase();
    
    // Check if email already registered
    const existing = students.find(s => s.email.toLowerCase() === normalizedEmail);
    if (existing) {
      return {
        success: false,
        error: `A registration with email ${input.email} already exists. You can access your dashboard directly.`
      };
    }

    const trimmedRefCode = input.referralCode?.trim().toUpperCase();
    let referrerStudent: Student | undefined;

    if (trimmedRefCode) {
      referrerStudent = students.find(s => s.referralCode.toUpperCase() === trimmedRefCode);
      if (!referrerStudent) {
        return {
          success: false,
          error: `Referral code "${trimmedRefCode}" was not found in the workshop system. Please verify or leave it blank.`
        };
      }
    }

    // Generate unique referral code for this newly registered student
    const existingCodes = students.map(s => s.referralCode.toUpperCase());
    const newCode = generateReferralCode(input.fullName, existingCodes);

    // Determine channel
    let channel: AcquisitionChannel = input.acquisitionChannel || 'direct';
    if (trimmedRefCode && referrerStudent) {
      channel = 'referral';
    }

    const newStudent: Student = {
      id: `std-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      fullName: input.fullName.trim(),
      email: normalizedEmail,
      phone: input.phone.trim(),
      college: input.college.trim(),
      branch: input.branch.trim(),
      yearOfStudy: input.yearOfStudy.trim(),
      referralCode: newCode,
      referredBy: referrerStudent ? referrerStudent.referralCode : null,
      referralCount: 0,
      registeredAt: new Date().toISOString(),
      acquisitionChannel: channel,
      status: 'confirmed',
    };

    setStudents(prev => {
      // If there is a referrer, increment their referral count
      if (referrerStudent) {
        return prev.map(s => {
          if (s.referralCode.toUpperCase() === trimmedRefCode) {
            return { ...s, referralCount: s.referralCount + 1 };
          }
          return s;
        }).concat(newStudent);
      }
      return [...prev, newStudent];
    });

    // Automatically make this student the active session!
    setCurrentStudentId(newStudent.id);

    return {
      success: true,
      student: newStudent,
    };
  };

  const loginByEmailOrCode = (query: string) => {
    const clean = query.trim().toLowerCase();
    if (!clean) {
      return { success: false, error: 'Please enter your registered email address or referral code.' };
    }

    const match = students.find(s => 
      s.email.toLowerCase() === clean || 
      s.referralCode.toLowerCase() === clean
    );

    if (match) {
      setCurrentStudentId(match.id);
      return { success: true, student: match };
    }

    return {
      success: false,
      error: `No registration found matching "${query}". Please check your spelling or register as a new student.`
    };
  };

  const logout = () => {
    setCurrentStudentId(null);
  };

  const simulateReferral = (targetCode?: string) => {
    const codeToUse = (targetCode || currentStudent?.referralCode)?.toUpperCase();
    if (!codeToUse) {
      return { success: false, message: 'No referral code found to simulate with. Please register or select an active student first.' };
    }

    const referrer = students.find(s => s.referralCode.toUpperCase() === codeToUse);
    if (!referrer) {
      return { success: false, message: `Referrer code ${codeToUse} not found in database.` };
    }

    const mockFirstNames = ['Aakash', 'Kavya', 'Harsh', 'Divya', 'Siddhant', 'Ritu', 'Manish', 'Bhavna', 'Gaurav', 'Ishita'];
    const mockLastNames = ['Gupta', 'Singh', 'Reddy', 'Chopra', 'Saxena', 'Deshmukh', 'Mishra', 'Joshi', 'Kashyap', 'Bose'];
    const mockColleges = [
      referrer.college, // High probability of same college (classmate!)
      'Amrita Vishwa Vidyapeetham – Bengaluru',
      'RV College of Engineering – Bengaluru',
      'BMS College of Engineering – Bengaluru',
      'PES University – Bengaluru',
      'MS Ramaiah Institute of Technology – Bengaluru',
      'NITK Surathkal',
    ];
    const branches = ['Computer Science & Engineering', 'Information Technology', 'Artificial Intelligence & Data Science'];

    const first = mockFirstNames[Math.floor(Math.random() * mockFirstNames.length)];
    const last = mockLastNames[Math.floor(Math.random() * mockLastNames.length)];
    const name = `${first} ${last}`;
    const randNum = Math.floor(100 + Math.random() * 900);
    const email = `${first.toLowerCase()}.${last.toLowerCase()}${randNum}@demo.college.edu`;
    const college = mockColleges[Math.floor(Math.random() * mockColleges.length)];
    const branch = branches[Math.floor(Math.random() * branches.length)];

    const existingCodes = students.map(s => s.referralCode.toUpperCase());
    const newCode = generateReferralCode(name, existingCodes);

    const newStudent: Student = {
      id: `std-sim-${Date.now()}`,
      fullName: name,
      email,
      phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
      college,
      branch,
      yearOfStudy: 'Final Year (4th Year)',
      referralCode: newCode,
      referredBy: codeToUse,
      referralCount: 0,
      registeredAt: new Date().toISOString(),
      acquisitionChannel: 'referral',
      status: 'confirmed',
    };

    setStudents(prev => {
      return prev.map(s => {
        if (s.referralCode.toUpperCase() === codeToUse) {
          return { ...s, referralCount: s.referralCount + 1 };
        }
        return s;
      }).concat(newStudent);
    });

    return {
      success: true,
      message: `🎉 Simulated classmate registration for "${name}" (${college}) using referral code "${codeToUse}"!`,
      newStudent,
    };
  };

  const resetDemoData = () => {
    setStudents(INITIAL_STUDENTS);
    setCurrentStudentId(null); // Reset session
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const getLeaderboard = () => {
    const sorted = [...students].sort((a, b) => {
      if (b.referralCount !== a.referralCount) {
        return b.referralCount - a.referralCount;
      }
      return new Date(a.registeredAt).getTime() - new Date(b.registeredAt).getTime();
    });

    return sorted.map((student, idx) => ({
      ...student,
      rank: idx + 1,
    }));
  };

  const getStudentRank = (id: string): number => {
    const leaderboard = getLeaderboard();
    const entry = leaderboard.find(s => s.id === id);
    return entry ? entry.rank : leaderboard.length + 1;
  };

  const getReferredStudents = (referralCode: string): Student[] => {
    if (!referralCode) return [];
    return students
      .filter(s => s.referredBy?.toUpperCase() === referralCode.toUpperCase())
      .sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime());
  };

  const metrics: GrowthMetrics = useMemo(() => {
    const totalRegistrations = students.length;
    const referralRegistrations = students.filter(s => !!s.referredBy).length;
    const activeReferrers = students.filter(s => s.referralCount > 0).length;
    const referralRate = totalRegistrations > 0 
      ? Math.round((referralRegistrations / totalRegistrations) * 100) 
      : 0;

    const channelBreakdown: Record<AcquisitionChannel, number> = {
      whatsapp: 0,
      club: 0,
      referral: 0,
      outreach: 0,
      direct: 0,
    };

    const collegeBreakdown: Record<string, number> = {};

    students.forEach(s => {
      const ch = s.acquisitionChannel || (s.referredBy ? 'referral' : 'direct');
      channelBreakdown[ch] = (channelBreakdown[ch] || 0) + 1;

      collegeBreakdown[s.college] = (collegeBreakdown[s.college] || 0) + 1;
    });

    return {
      totalRegistrations,
      referralRegistrations,
      activeReferrers,
      referralRate,
      channelBreakdown,
      collegeBreakdown,
    };
  }, [students]);

  return (
    <GrowthContext.Provider
      value={{
        students,
        currentStudent,
        currentStudentId,
        setCurrentStudentId,
        registerStudent,
        loginByEmailOrCode,
        logout,
        simulateReferral,
        resetDemoData,
        getLeaderboard,
        getReferredStudents,
        metrics,
        getStudentRank,
      }}
    >
      {children}
    </GrowthContext.Provider>
  );
};

export const useGrowth = () => {
  const context = useContext(GrowthContext);
  if (!context) {
    throw new Error('useGrowth must be used within a GrowthProvider');
  }
  return context;
};
