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
