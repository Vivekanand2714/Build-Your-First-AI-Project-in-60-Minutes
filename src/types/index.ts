export type AcquisitionChannel = 'whatsapp' | 'club' | 'referral' | 'outreach' | 'direct';

export interface Student {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  yearOfStudy: string;
  referralCode: string;
  referredBy?: string | null; // referral code used
  referralCount: number;
  registeredAt: string; // ISO string
  acquisitionChannel: AcquisitionChannel;
  status: 'confirmed' | 'pending';
  // Builder progress milestones
  selectedProject?: string;
  workshopStarted?: boolean;
  workshopCompleted?: boolean;
}

export interface ReferralEvent {
  id: string;
  referrerCode: string;
  referredStudentName: string;
  referredStudentCollege: string;
  timestamp: string;
}

export interface GrowthMetrics {
  totalRegistrations: number;
  referralRegistrations: number;
  activeReferrers: number;
  referralRate: number; // percentage
  channelBreakdown: Record<AcquisitionChannel, number>;
  collegeBreakdown: Record<string, number>;
}

export interface CampusStats {
  rank: number;
  name: string;
  count: number;
  percent: number;
  neededForNextRank: number;
}

export interface ProjectBlueprint {
  id: string;
  title: string;
  problem: string;
  targetOutcome: string;
  aiComponent: string;
  journey: string[];
  estimatedTime: string;
  difficulty: string;
  tags: string[];
}
